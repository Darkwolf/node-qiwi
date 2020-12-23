import { Account } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class CreateAccountRequest {
  static method = 'POST'
  static authRequired = true

  static from(parameters, context) {
    return new CreateAccountRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = CreateAccountRequest.method
    this.authRequired = CreateAccountRequest.authRequired
    this
      .setContext(context)
      .setAlias(parameters.alias)
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

  toParams() {
    const params = {}
    if (this.alias) {
      params.alias = this.alias
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Account.fromParams({
          alias: this.alias
        }, this.context))
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
