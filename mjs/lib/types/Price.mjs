import Helper from '@darkwolf/helper.mjs'
import QIWI from '../index.mjs'

export default class Price {
  static fromParams(params = {}) {
    const data = {
      currency: params.currency,
      amount: params.amount
    }
    if (data.currency) {
      data.currency = QIWI.getCurrencyByCode(data.currency)
    }
    return new Price(data)
  }

  static from(data) {
    return new Price(data)
  }

  constructor(data = {}) {
    this
      .setCurrency(data.currency)
      .setAmount(data.amount)
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setAmount(amount) {
    this.amount = amount
    return this
  }

  toJSON() {
    const data = {}
    if (this.currency) {
      data.currency = this.currency
    }
    if (Helper.exists(this.amount)) {
      data.amount = this.amount
    }
    return data
  }
}
