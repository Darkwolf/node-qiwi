import { Profile } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetMeRequest {
  static endpoint = '/person-profile/v1/profile/current'
  static authRequired = true

  static from(parameters, context) {
    return new GetMeRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.endpoint = GetMeRequest.endpoint
    this.authRequired = GetMeRequest.authRequired
    this
      .setContext(context)
      .setDisableAuthInfo(parameters.disableAuthInfo)
      .setDisableContractInfo(parameters.disableContractInfo)
      .setDisableUserInfo(parameters.disableUserInfo)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setDisableAuthInfo(boolean) {
    this.disableAuthInfo = boolean
    return this
  }

  setDisableContractInfo(boolean) {
    this.disableContractInfo = boolean
    return this
  }

  setDisableUserInfo(boolean) {
    this.disableUserInfo = boolean
    return this
  }

  toParams() {
    const params = {}
    if (this.disableAuthInfo) {
      params.authInfoEnabled = false
    }
    if (this.disableContractInfo) {
      params.contractInfoEnabled = false
    }
    if (this.disableUserInfo) {
      params.userInfoEnabled = false
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Profile.fromParams(response.result, this.context))
        this.context.qiwi.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
