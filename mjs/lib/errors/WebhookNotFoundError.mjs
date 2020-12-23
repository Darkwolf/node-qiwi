import NotFoundError from './NotFoundError.mjs'

export default class WebhookNotFoundError extends NotFoundError {
  static name = 'WebhookNotFoundError'
  static code = 'webhook-not-found'

  constructor(id) {
    super(`Webhook not found${id ? `: '${id}'` : ''}.`, WebhookNotFoundError.code)
    this.setName(WebhookNotFoundError.name)
  }
}
