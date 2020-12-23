const { Identification } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetIdentificationInfoRequest {
  constructor(context) {
    this.authRequired = GetIdentificationInfoRequest.authRequired
    this.setContext(context)
  }

  get endpoint() {
    return `/identification/v1/persons/${this.context.qiwi.phoneNumber.slice(1)}/identification`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Identification.fromParams(response.result, this.context))
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
GetIdentificationInfoRequest.authRequired = true
GetIdentificationInfoRequest.from = context => new GetIdentificationInfoRequest(context)

module.exports = GetIdentificationInfoRequest
