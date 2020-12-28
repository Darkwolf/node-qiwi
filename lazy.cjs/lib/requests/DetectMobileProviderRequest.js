const errors = require('../errors')
const constants = require('../constants')

class DetectMobileProviderRequest {
  constructor(parameters = {}, context) {
    this.method = DetectMobileProviderRequest.method
    this.endpoint = DetectMobileProviderRequest.endpoint
    this
      .setContext(context)
      .setPhoneNumber(parameters.phoneNumber)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
    return this
  }

  toParams() {
    const params = {}
    if (this.phoneNumber) {
      params.phone = this.phoneNumber.startsWith('+') ? this.phoneNumber.slice(1) : this.phoneNumber
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
          const error = new errors.UnknownError(response.message).setResponse(response)
          this.context.qiwi.emit(constants.EventType.ERROR, error)
          if (!this.context.qiwi.settings.ignoreErrors) throw error
        } else {
          response.setResult(parseInt(response.result.message))
          this.context.qiwi.emit(constants.EventType.RESPONSE, response)
          return response.result
        }
      } else {
        const error = new errors.UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(constants.EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
DetectMobileProviderRequest.method = 'POST'
DetectMobileProviderRequest.endpoint = '/mobile/detect.action'
DetectMobileProviderRequest.from = (parameters, context) => new DetectMobileProviderRequest(parameters, context)

module.exports = DetectMobileProviderRequest
