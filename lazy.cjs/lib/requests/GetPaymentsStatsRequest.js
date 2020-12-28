const { UnixTimestamp } = require('@darkwolf/time.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetPaymentsStatsRequest {
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
        case constants.PaymentType.INCOMING: {
          type = 'IN'
          break
        }
        case constants.PaymentType.OUTGOING: {
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
        response.setResult(types.PaymentsStats.fromParams(response.result, this.context))
        this.context.qiwi.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new errors.UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(constants.EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetPaymentsStatsRequest.authRequired = true
GetPaymentsStatsRequest.from = (parameters, context) => new GetPaymentsStatsRequest(parameters, context)

module.exports = GetPaymentsStatsRequest
