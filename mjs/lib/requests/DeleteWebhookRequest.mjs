import { WebhookNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class DeleteWebhookRequest {
  static method = 'DELETE'
  static authRequired = true

  static from(parameters, context) {
    return new DeleteWebhookRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = DeleteWebhookRequest.method
    this.authRequired = DeleteWebhookRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
  }

  get endpoint() {
    return `/payment-notifier/v1/hooks/${this.id}`
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
        response.setResult(true)
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
