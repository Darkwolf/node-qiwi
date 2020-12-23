const { AccountOffer } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

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
        response.setResult(response.result.map(offer => AccountOffer.fromParams(offer, this.context)))
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
GetAccountOffersRequest.authRequired = true
GetAccountOffersRequest.from = context => new GetAccountOffersRequest(context)

module.exports = GetAccountOffersRequest
