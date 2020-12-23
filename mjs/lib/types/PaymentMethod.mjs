import Helper from '@darkwolf/helper.mjs'
import { PaymentMethodType } from '../constants/index.mjs'

export default class PaymentMethod {
  static fromParams(params = {}) {
    const data = {
      type: params.type,
      accountId: params.accountId
    }
    if (data.type === 'Account') {
      data.type = PaymentMethodType.ACCOUNT
      if (data.accountId) {
        data.accountId = parseInt(data.accountId)
      }
    }
    return new PaymentMethod(data)
  }

  static from(type, options) {
    return new PaymentMethod(type, options)
  }

  constructor(type, options = {}) {
    this
      .setType(type)
      .setAccountId(options.accountId)
  }

  setType(type) {
    this.type = type
    return this
  }

  setAccountId(id) {
    this.accountId = id
    return this
  }

  toParams() {
    const params = {}
    if (this.type) {
      switch (this.type) {
        case PaymentMethodType.ACCOUNT: {
          params.type = 'Account'
          break
        }
        default: {
          params.type = this.type
        }
      }
    }
    if (this.accountId) {
      params.accountId = `${this.accountId}`
    }
    return params
  }
}
