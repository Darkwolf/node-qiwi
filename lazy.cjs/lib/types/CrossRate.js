const Helper = require('@darkwolf/helper.cjs')
const QIWI = require('../')

class CrossRate {
  constructor(data = {}) {
    this
      .setFrom(data.from)
      .setTo(data.to)
      .setRate(data.rate)
  }

  setFrom(currency) {
    this.from = currency
    return this
  }

  setTo(currency) {
    this.to = currency
    return this
  }

  setRate(rate) {
    this.rate = rate
    return this
  }

  toJSON() {
    const data = {}
    if (this.from) {
      data.from = this.from
    }
    if (this.to) {
      data.to = this.to
    }
    if (Helper.exists(this.rate)) {
      data.rate = this.rate
    }
    return data
  }
}
CrossRate.fromParams = (params = {}) => {
  const data = {
    from: params.from,
    to: params.to,
    rate: params.rate
  }
  if (data.from) {
    data.from = QIWI.getCurrencyByCode(data.from)
  }
  if (data.to) {
    data.to = QIWI.getCurrencyByCode(data.to)
  }
  return new CrossRate(data)
}
CrossRate.from = data => new CrossRate(data)

module.exports = CrossRate
