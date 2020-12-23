const NotFoundError = require('./NotFoundError')

class WebhookNotFoundError extends NotFoundError {
  constructor(id) {
    super(`Webhook not found${id ? `: '${id}'` : ''}.`, WebhookNotFoundError.code)
    this.setName(WebhookNotFoundError.name)
  }
}
WebhookNotFoundError.name = 'WebhookNotFoundError'
WebhookNotFoundError.code = 'webhook-not-found'

module.exports = WebhookNotFoundError
