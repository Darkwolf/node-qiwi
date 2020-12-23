import Helper from '@darkwolf/helper.mjs'
import { UnixTimestamp } from '@darkwolf/time.mjs'
import { Payments } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType, PaymentType } from '../constants/index.mjs'

export default class GetPaymentsRequest {
  static authRequired = true

  static from(parameters, context) {
    return new GetPaymentsRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.authRequired = GetPaymentsRequest.authRequired
    this
      .setContext(context)
      .setType(parameters.type)
      .setSources(parameters.sources)
      .setStartDate(parameters.startDate)
      .setEndDate(parameters.endDate)
      .setNextTransactionId(parameters.nextTransactionId)
      .setNextTransactionDate(parameters.nextTransactionDate)
      .setLimit(parameters.limit)
  }

  get endpoint() {
    return `/payment-history/v2/persons/${this.context.qiwi.phoneNumber.slice(1)}/payments`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setSources(sources) {
    this.sources = sources
    return this
  }

  setStartDate(date) {
    this.startDate = date
    return this
  }

  setEndDate(date) {
    this.endDate = date
    return this
  }

  setNextTransactionId(id) {
    this.nextTransactionId = id
    return this
  }

  setNextTransactionDate(date) {
    this.nextTransactionDate = date
    return this
  }

  setLimit(limit) {
    this.limit = limit
    return this
  }

  toParams() {
    const params = {}
    if (this.type) {
      let type
      switch (this.type) {
        case PaymentType.INCOMING: {
          type = 'IN'
          break
        }
        case PaymentType.OUTGOING: {
          type = 'OUT'
          break
        }
        default: {
          type = this.type.toUpperCase()
        }
      }
      params.operation = type
    }
    if (this.sources) {
      this.sources.forEach((source, index) => {
        params[`sources[${index}]`] = source.toUpperCase()
      })
    }
    if (this.startDate) {
      params.startDate = new UnixTimestamp(this.startDate)
        .toString()
        .replace('Z', '+00:00')
    }
    if (this.endDate) {
      params.endDate = new UnixTimestamp(this.endDate)
        .toString()
        .replace('Z', '+00:00')
    }
    if (this.nextTransactionId) {
      params.nextTxnId = this.nextTransactionId
    }
    if (this.nextTransactionDate) {
      params.nextTxnDate = new UnixTimestamp(this.endDate)
        .subtract('3 hours')
        .toString()
        .replace('Z', '+03:00')
    }
    if (Helper.exists(this.limit)) {
      params.rows = this.limit
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Payments.fromParams(response.result, this.context))
        this.context.qiwi.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
