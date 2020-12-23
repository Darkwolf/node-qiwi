const { WebhookNotFoundError, UnknownError } = require('../errors')
const { EventType, PaymentType } = require('../constants')

class GetNewWebhookSecretKeyRequest {
  constructor(parameters = {}, context) {
    this.method = GetNewWebhookSecretKeyRequest.method
    this.authRequired = GetNewWebhookSecretKeyRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
  }

  get endpoint() {
    return `/payment-notifier/v1/hooks/${this.id}/newkey`
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
GetNewWebhookSecretKeyRequest.method = 'POST'
GetNewWebhookSecretKeyRequest.authRequired = true
GetNewWebhookSecretKeyRequest.from = (parameters, context) => new GetNewWebhookSecretKeyRequest(parameters, context)

module.exports = GetNewWebhookSecretKeyRequest
