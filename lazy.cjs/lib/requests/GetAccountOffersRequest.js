const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetAccountOffersRequest {
  constructor(context) {
    this.authRequired = GetAccountOffersRequest.authRequired
    this.setContext(context)
  }

  get endpoint() {
    return `/funding-sources/v2/persons/${this.context.qiwi.phoneNumber.slice(1)}/accounts/offer`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.map(offer => types.AccountOffer.fromParams(offer, this.context)))
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
GetAccountOffersRequest.authRequired = true
GetAccountOffersRequest.from = context => new GetAccountOffersRequest(context)

module.exports = GetAccountOffersRequest
