const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const Price = require('./Price')

class PriorityPackage {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setPrice(data.price)
      .setExpirationDate(data.expirationDate)
      .setAutoRenew(data.autoRenew)
      .setEnabled(data.enabled)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setPrice(price) {
    this.price = price ? (
      price instanceof Price ? price : new Price(price)
    ) : undefined
    return this
  }

  setExpirationDate(date) {
    this.expirationDate = date
    return this
  }

  setAutoRenew(boolean) {
    this.autoRenew = boolean
    return this
  }

  setEnabled(boolean) {
    this.enabled = boolean
    return this
  }

  toJSON() {
    const data = {}
    if (this.price) {
      data.price = this.price.toJSON()
    }
    if (this.expirationDate) {
      data.expirationDate = this.expirationDate
    }
    if (Helper.exists(this.autoRenew)) {
      data.autoRenew = this.autoRenew
    }
    if (Helper.exists(this.enabled)) {
      data.enabled = this.enabled
    }
    return data
  }
}
PriorityPackage.fromParams = (params = {}, context) => {
  const data = {
    price: params.price,
    expirationDate: params.endDate,
    autoRenew: params.autoRenewalActive,
    enabled: params.enabled
  }
  if (data.price) {
    data.price = Price.fromParams(data.price)
  }
  if (data.expirationDate) {
    data.expirationDate = new UnixTimestamp(data.expirationDate).seconds
  }
  return new PriorityPackage(data, context)
}
PriorityPackage.from = (data, context) => new PriorityPackage(data, context)

module.exports = PriorityPackage
