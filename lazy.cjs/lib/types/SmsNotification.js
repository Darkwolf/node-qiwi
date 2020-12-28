const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const types = require('./')

class SmsNotification {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setPrice(data.price)
      .setExpirationDate(data.expirationDate)
      .setActive(data.active)
      .setEnabled(data.enabled)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setPrice(price) {
    this.price = price ? (
      price instanceof types.Price ? price : new types.Price(price)
    ) : undefined
    return this
  }

  setExpirationDate(date) {
    this.expirationDate = date
    return this
  }

  setActive(boolean) {
    this.active = boolean
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
    if (Helper.exists(this.active)) {
      data.active = this.active
    }
    if (Helper.exists(this.enabled)) {
      data.enabled = this.enabled
    }
    return data
  }
}
SmsNotification.fromParams = (params = {}, context) => {
  const data = {
    price: params.price,
    expirationDate: params.endDate,
    active: params.active,
    enabled: params.enabled,
  }
  if (data.price) {
    data.price = types.Price.fromParams(data.price)
  }
  if (data.expirationDate) {
    data.expirationDate = new UnixTimestamp(data.expirationDate).seconds
  }
  return new SmsNotification(data, context)
}
SmsNotification.from = (data, context) => new SmsNotification(data, context)

module.exports = SmsNotification
