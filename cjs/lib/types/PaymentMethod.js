const Helper = require('@darkwolf/helper.cjs')
const { PaymentMethodType } = require('../constants')

class PaymentMethod {
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
PaymentMethod.fromParams = (params = {}) => {
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
PaymentMethod.from = (type, options) => new PaymentMethod(type, options)

module.exports = PaymentMethod
