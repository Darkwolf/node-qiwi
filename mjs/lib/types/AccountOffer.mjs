import QIWI from '../index.mjs'

export default class AccountOffer {
  static fromParams(params = {}, context) {
    const data = {
      alias: params.alias,
      currency: params.currency
    }
    if (data.currency) {
      data.currency = QIWI.getCurrencyByCode(data.currency)
    } else if (data.alias) {
      const currency = data.alias.split('_').slice(-1)[0]
      data.currency = currency.toUpperCase()
    }
    return new AccountOffer(data, context)
  }

  static from(data, context) {
    return new AccountOffer(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setAlias(data.alias)
      .setCurrency(data.currency)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAlias(alias) {
    this.alias = alias
    return this
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  createAccount() {
    return this.context.qiwi.createAccount(this.alias)
  }

  toJSON() {
    const data = {}
    if (this.alias) {
      data.alias = this.alias
    }
    if (this.currency) {
      data.currency = this.currency
    }
    return data
  }
}
