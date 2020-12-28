const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetMeRequest {
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
        response.setResult(types.Profile.fromParams(response.result, this.context))
        this.context.qiwi.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new errors.UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(constants.EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetMeRequest.endpoint = '/person-profile/v1/profile/current'
GetMeRequest.authRequired = true
GetMeRequest.from = (parameters, context) => new GetMeRequest(parameters, context)

module.exports = GetMeRequest
