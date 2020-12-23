const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class MarkAccountDefaultRequest {
  constructor(parameters = {}, context) {
    this.method = MarkAccountDefaultRequest.method
    this.authRequired = MarkAccountDefaultRequest.authRequired
    this
      .setContext(context)
      .setAlias(parameters.alias)
  }

  get endpoint() {
    return `/funding-sources/v2/persons/${this.context.qiwi.phoneNumber.slice(1)}/accounts/${this.alias}`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAlias(alias) {
    this.alias = alias
    return this
  }

  toParams() {
    return {
      defaultAccount: true
    }
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(true)
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
MarkAccountDefaultRequest.method = 'PATCH'
MarkAccountDefaultRequest.authRequired = true
MarkAccountDefaultRequest.from = (parameters, context) => new MarkAccountDefaultRequest(parameters, context)

module.exports = MarkAccountDefaultRequest
