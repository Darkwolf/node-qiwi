import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class DetectMobileProviderRequest {
  static method = 'POST'
  static endpoint = '/mobile/detect.action'

  static from(parameters, context) {
    return new DetectMobileProviderRequest(parameters, context)
  }

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
