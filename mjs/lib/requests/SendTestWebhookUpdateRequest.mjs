import { WebhookNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SendTestWebhookUpdateRequest {
  static endpoint = '/payment-notifier/v1/hooks/test'
  static authRequired = true

  static from(context) {
    return new SendTestWebhookUpdateRequest(context)
  }

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
