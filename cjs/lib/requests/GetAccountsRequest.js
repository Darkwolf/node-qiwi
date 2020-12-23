const Helper = require('@darkwolf/helper.cjs')
const { Account } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetAccountsRequest {
  constructor(parameters = {}, context) {
    this.authRequired = GetAccountsRequest.authRequired
    this
      .setContext(context)
      .setAliases(parameters.aliases)
      .setTimeout(parameters.timeout)
  }

  get endpoint() {
    return `/funding-sources/v2/persons/${this.context.qiwi.phoneNumber.slice(1)}/accounts`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAliases(aliases) {
    this.aliases = aliases
    return this
  }

  setTimeout(duration) {
    this.timeout = duration
    return this
  }

  toParams() {
    const params = {}
    if (this.aliases) {
      params.alias = this.aliases.join(',')
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
        response.setResult(response.result.accounts.map(account => Account.fromParams(account, this.context)))
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
GetAccountsRequest.authRequired = true
GetAccountsRequest.from = (parameters, context) => new GetAccountsRequest(parameters, context)

module.exports = GetAccountsRequest
