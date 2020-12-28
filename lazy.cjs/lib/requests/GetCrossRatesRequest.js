const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetCrossRatesRequest {
  constructor(context) {
    this.endpoint = GetCrossRatesRequest.endpoint
    this.setContext(context)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.result.map(rate => types.CrossRate.fromParams(rate)))
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
GetCrossRatesRequest.endpoint = '/sinap/crossRates'
GetCrossRatesRequest.from = context => new GetCrossRatesRequest(context)

module.exports = GetCrossRatesRequest
