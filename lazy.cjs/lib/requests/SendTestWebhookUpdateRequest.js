const errors = require('../errors')
const constants = require('../constants')

class SendTestWebhookUpdateRequest {
  constructor(context) {
    this.endpoint = SendTestWebhookUpdateRequest.endpoint
    this.authRequired = SendTestWebhookUpdateRequest.authRequired
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
        response.setResult(true)
        this.context.qiwi.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 'hook.not.found': {
            error = new errors.WebhookNotFoundError().setResponse(response)
            break
          }
          default: {
            error = new errors.UnknownError(response.message).setResponse(response)
          }
        }
        this.context.qiwi.emit(constants.EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
SendTestWebhookUpdateRequest.endpoint = '/payment-notifier/v1/hooks/test'
SendTestWebhookUpdateRequest.authRequired = true
SendTestWebhookUpdateRequest.from = context => new SendTestWebhookUpdateRequest(context)

module.exports = SendTestWebhookUpdateRequest
