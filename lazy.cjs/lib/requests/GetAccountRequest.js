const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetAccountRequest {
  constructor(parameters = {}, context) {
    this.authRequired = GetAccountRequest.authRequired
    this
      .setContext(context)
      .setAlias(parameters.alias)
      .setTimeout(parameters.timeout)
  }

  get endpoint() {
    return `/funding-sources/v2/persons/${this.context.qiwi.phoneNumber.slice(1)}/accounts`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAlias(alias) {
    this.alias = alias
    return this
  }

  setTimeout(duration) {
    this.timeout = duration
    return this
  }

  toParams() {
    const params = {}
    if (this.alias) {
      params.alias = this.alias
    }
    if (Helper.exists(this.timeout)) {
      params.timeout = this.timeout
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        const [account] = response.result.accounts.map(account => types.Account.fromParams(account, this.context))
        if (!account || account.alias !== this.alias) {
          response.setOk(false)
          const error = new errors.AccountNotFoundError(this.alias).setResponse(response)
          this.context.qiwi.emit(constants.EventType.ERROR, error)
          if (!this.context.qiwi.settings.ignoreErrors) throw error
        } else {
          response.setResult(account)
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
GetAccountRequest.authRequired = true
GetAccountRequest.from = (parameters, context) => new GetAccountRequest(parameters, context)

module.exports = GetAccountRequest
