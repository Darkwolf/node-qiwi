import Helper from '@darkwolf/helper.mjs'
import { WalletRestrictionType } from '../constants/index.mjs'

export default class WalletRestriction {
  static fromParams(params = {}, context) {
    const data = {
      type: params.restrictionCode,
      description: params.restrictionDescription
    }
    if (data.type) {
      data.type = data.type.toLowerCase()
    }
    return new WalletRestriction(data, context)
  }

  static from(data, context) {
    return new WalletRestriction(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setType(data.type)
      .setDescription(data.description)
  }

  get isOutgoingPayments() {
    return this.type === WalletOperationType.OUTGOING_PAYMENTS
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
