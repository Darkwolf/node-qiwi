import Helper from '@darkwolf/helper.mjs'
import QIWI from '../index.mjs'

export default class CrossRate {
  static fromParams(params = {}) {
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

  static from(data) {
    return new CrossRate(data)
  }

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
