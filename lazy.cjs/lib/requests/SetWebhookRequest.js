const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

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
        case constants.PaymentType.INCOMING: {
          type = '0'
          break
        }
        case constants.PaymentType.OUTGOING: {
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
        response.setResult(types.WebhookInfo.fromParams(response.result, this.context))
        this.context.qiwi.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 'hook.already.exists': {
            error = new errors.WebhookAlreadyExistsError().setResponse(response)
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
SetWebhookRequest.method = 'PUT'
SetWebhookRequest.endpoint = '/payment-notifier/v1/hooks'
SetWebhookRequest.authRequired = true
SetWebhookRequest.from = (parameters, context) => new SetWebhookRequest(parameters, context)

module.exports = SetWebhookRequest
