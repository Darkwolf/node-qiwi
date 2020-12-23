import Error from './Error.mjs'

export default class WebhookAlreadyExistsError extends Error {
  static name = 'WebhookAlreadyExistsError'
  static code = 'webhook-already-exists'

  constructor() {
    super('Webhook already exists.', WebhookAlreadyExistsError.code)
    this.setName(WebhookAlreadyExistsError.name)
  }
}
