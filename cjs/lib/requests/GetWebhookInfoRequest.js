const { WebhookInfo } = require('../types')
const { WebhookNotFoundError, UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetWebhookInfoRequest {
  constructor(context) {
    this.endpoint = GetWebhookInfoRequest.endpoint
    this.authRequired = GetWebhookInfoRequest.authRequired
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
        response.setResult(WebhookInfo.fromParams(response.result, this.context))
        this.context.qiwi.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 'hook.not.found': {
            error = new WebhookNotFoundError().setResponse(response)
            break
          }
          default: {
            error = new UnknownError(response.message).setResponse(response)
          }
        }
        this.context.qiwi.emit(EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetWebhookInfoRequest.endpoint = '/payment-notifier/v1/hooks/active'
GetWebhookInfoRequest.authRequired = true
GetWebhookInfoRequest.from = context => new GetWebhookInfoRequest(context)

module.exports = GetWebhookInfoRequest
