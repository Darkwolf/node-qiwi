import { UnixTimestamp } from '@darkwolf/time.mjs'
import { PaymentsStats } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType, PaymentType } from '../constants/index.mjs'

export default class GetPaymentsStatsRequest {
  static authRequired = true

  static from(parameters, context) {
    return new GetPaymentsStatsRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.authRequired = GetPaymentsStatsRequest.authRequired
    this
      .setContext(context)
      .setType(parameters.type)
      .setSources(parameters.sources)
      .setStartDate(parameters.startDate)
      .setEndDate(parameters.endDate)
  }

  get endpoint() {
    return `/payment-history/v2/persons/${this.context.qiwi.phoneNumber.slice(1)}/payments/total`
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
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(PaymentsStats.fromParams(response.result, this.context))
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
