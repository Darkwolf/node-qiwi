const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetWalletRestrictionsRequest {
  constructor(context) {
    this.authRequired = GetWalletRestrictionsRequest.authRequired
    this.setContext(context)
  }

  get endpoint() {
    return `/person-profile/v1/persons/${this.context.qiwi.phoneNumber.slice(1)}/status/restrictions`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.map(restriction => types.WalletRestriction.fromParams(restriction, this.context)))
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
GetWalletRestrictionsRequest.authRequired = true
GetWalletRestrictionsRequest.from = context => new GetWalletRestrictionsRequest(context)

module.exports = GetWalletRestrictionsRequest
