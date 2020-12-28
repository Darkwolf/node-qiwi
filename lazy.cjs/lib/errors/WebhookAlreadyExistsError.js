const errors = require('./')

class WebhookAlreadyExistsError extends errors.Error {
  constructor() {
    super('Webhook already exists.', WebhookAlreadyExistsError.code)
    this.setName(WebhookAlreadyExistsError.name)
  }
}
WebhookAlreadyExistsError.name = 'WebhookAlreadyExistsError'
WebhookAlreadyExistsError.code = 'webhook-already-exists'

module.exports = WebhookAlreadyExistsError
