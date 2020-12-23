const { WebhookInfo } = require('../types')
const { WebhookAlreadyExistsError, UnknownError } = require('../errors')
const { EventType, PaymentType } = require('../constants')

class SetWebhookRequest {
  constructor(parameters = {}, context) {
    this.method = SetWebhookRequest.method
    this.endpoint = SetWebhookRequest.endpoint
    this.authRequired = SetWebhookRequest.authRequired
    this
      .setContext(context)
      .setUrl(parameters.url)
      .setPaymentType(parameters.paymentType)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setPaymentType(type) {
    this.paymentType = type
    return this
  }

  toParams() {
    const params = {
      hookType: 1,
      txnType: '2'
    }
    if (this.url) {
      params.param = this.url
    }
    if (this.paymentType) {
      let type
      switch (this.paymentType) {
        case PaymentType.INCOMING: {
          type = '0'
          break
        }
        case PaymentType.OUTGOING: {
          type = '1'
          break
        }
      }
      params.txnType = type
    }
    return params
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
          case 'hook.already.exists': {
            error = new WebhookAlreadyExistsError().setResponse(response)
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
SetWebhookRequest.method = 'PUT'
SetWebhookRequest.endpoint = '/payment-notifier/v1/hooks'
SetWebhookRequest.authRequired = true
SetWebhookRequest.from = (parameters, context) => new SetWebhookRequest(parameters, context)

module.exports = SetWebhookRequest
