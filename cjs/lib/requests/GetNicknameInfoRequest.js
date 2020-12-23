const { NicknameInfo } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetNicknameInfoRequest {
  constructor(context) {
    this.authRequired = GetNicknameInfoRequest.authRequired
    this.setContext(context)
  }

  get endpoint() {
    return `/qw-nicknames/v1/persons/${this.context.qiwi.phoneNumber.slice(1)}/nickname`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(NicknameInfo.fromParams(response.result, this.context))
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
GetNicknameInfoRequest.authRequired = true
GetNicknameInfoRequest.from = context => new GetNicknameInfoRequest(context)

module.exports = GetNicknameInfoRequest
