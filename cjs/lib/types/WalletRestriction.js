const Helper = require('@darkwolf/helper.cjs')
const { WalletRestrictionType } = require('../constants')

class WalletRestriction {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setType(data.type)
      .setDescription(data.description)
  }

  get isOutgoingPayments() {
    return this.type === WalletRestrictionType.OUTGOING_PAYMENTS
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  toJSON() {
    const data = {}
    if (this.type) {
      data.type = this.type
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    return data
  }
}
WalletRestriction.fromParams = (params = {}, context) => {
  const data = {
    type: params.restrictionCode,
    description: params.restrictionDescription
  }
  if (data.type) {
    data.type = data.type.toLowerCase()
  }
  return new WalletRestriction(data, context)
}
WalletRestriction.from = (data, context) => new WalletRestriction(data, context)

module.exports = WalletRestriction
