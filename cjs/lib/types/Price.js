const Helper = require('@darkwolf/helper.cjs')

let _QIWI
const QIWI = () => {
  if (!_QIWI) {
    _QIWI = require('../')
  }
  return _QIWI
}

class Price {
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
Price.fromParams = (params = {}) => {
  const data = {
    currency: params.currency,
    amount: params.amount
  }
  if (data.currency) {
    data.currency = QIWI().getCurrencyByCode(data.currency)
  }
  return new Price(data)
}
Price.from = data => new Price(data)

module.exports = Price
