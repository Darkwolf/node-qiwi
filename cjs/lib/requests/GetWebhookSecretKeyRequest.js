const { WebhookNotFoundError, UnknownError } = require('../errors')
const { EventType, PaymentType } = require('../constants')

class GetWebhookSecretKeyRequest {
  constructor(parameters = {}, context) {
    this.authRequired = GetWebhookSecretKeyRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
  }

  get endpoint() {
    return `/payment-notifier/v1/hooks/${this.id}/key`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.key)
        this.context.qiwi.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 'hook.not.found': {
            error = new WebhookNotFoundError(this.id).setResponse(response)
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
GetWebhookSecretKeyRequest.authRequired = true
GetWebhookSecretKeyRequest.from = (parameters, context) => new GetWebhookSecretKeyRequest(parameters, context)

module.exports = GetWebhookSecretKeyRequest
