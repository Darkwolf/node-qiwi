const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class DetectCardProviderRequest {
  constructor(parameters = {}, context) {
    this.method = DetectCardProviderRequest.method
    this.endpoint = DetectCardProviderRequest.endpoint
    this
      .setContext(context)
      .setCardNumber(parameters.cardNumber)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setCardNumber(cardNumber) {
    this.cardNumber = cardNumber
    return this
  }

  toParams() {
    const params = {}
    if (this.cardNumber) {
      params.cardNumber = this.cardNumber
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        if (response.result.code._name === 'ERROR') {
          response
            .setOk(false)
            .setMessage(response.result.message)
          const error = new UnknownError(response.message).setResponse(response)
          this.context.qiwi.emit(EventType.ERROR, error)
          if (!this.context.qiwi.settings.ignoreErrors) throw error
        } else {
          response.setResult(parseInt(response.result.message))
          this.context.qiwi.emit(EventType.RESPONSE, response)
          return response.result
        }
      } else {
        const error = new UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
DetectCardProviderRequest.method = 'POST'
DetectCardProviderRequest.endpoint = '/card/detect.action'
DetectCardProviderRequest.from = (parameters, context) => new DetectCardProviderRequest(parameters, context)

module.exports = DetectCardProviderRequest
