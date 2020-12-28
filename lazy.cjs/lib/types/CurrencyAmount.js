const Helper = require('@darkwolf/helper.cjs')
const QIWI = require('../')

class CurrencyAmount {
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
CurrencyAmount.fromParams = (params = {}) => {
  const data = {
    currency: params.currency,
    amount: params.amount
  }
  if (Helper.isNumber(data.currency)) {
    data.currency = QIWI.getCurrencyByCode(data.currency)
  }
  return new CurrencyAmount(data)
}
CurrencyAmount.from = data => new CurrencyAmount(data)

module.exports = CurrencyAmount
