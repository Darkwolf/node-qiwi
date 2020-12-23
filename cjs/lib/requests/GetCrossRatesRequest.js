const { CrossRate } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

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
        response.setResult(response.result.result.map(rate => CrossRate.fromParams(rate)))
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
GetCrossRatesRequest.endpoint = '/sinap/crossRates'
GetCrossRatesRequest.from = context => new GetCrossRatesRequest(context)

module.exports = GetCrossRatesRequest
