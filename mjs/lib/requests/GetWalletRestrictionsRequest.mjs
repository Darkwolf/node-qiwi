import { WalletRestriction } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetWalletRestrictionsRequest {
  static authRequired = true

  static from(context) {
    return new GetWalletRestrictionsRequest(context)
  }

  constructor(context) {
    this.authRequired = GetWalletRestrictionsRequest.authRequired
    this.setContext(context)
  }

  get endpoint() {
    return `/person-profile/v1/persons/${this.context.qiwi.phoneNumber.slice(1)}/status/restrictions`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.map(restriction => WalletRestriction.fromParams(restriction, this.context)))
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
