const { WalletLimit } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetWalletLimitsRequest {
  constructor(parameters = {}, context) {
    this.authRequired = GetWalletLimitsRequest.authRequired
    this
      .setContext(context)
      .setTypes(parameters.types)
  }

  get endpoint() {
    return `/qw-limits/v1/persons/${this.context.qiwi.phoneNumber.slice(1)}/actual-limits`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTypes(types) {
    this.types = types
    return this
  }

  toParams() {
    const params = {}
    if (this.types) {
      this.types.forEach((type, index) => {
        params[`types[${index}]`] = type.toUpperCase()
      })
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Object.entries(response.result.limits).map(([countryCode, limits]) =>
          limits.map(limit => WalletLimit.fromParams({
            ...limit,
            countryCode
          }, this.context))
        ).flat())
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
GetWalletLimitsRequest.authRequired = true
GetWalletLimitsRequest.from = (parameters, context) => new GetWalletLimitsRequest(parameters, context)

module.exports = GetWalletLimitsRequest
