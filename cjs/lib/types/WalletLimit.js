const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const { WalletOperationType } = require('../constants')

class WalletLimit {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setType(data.type)
      .setCountryCode(data.countryCode)
      .setCurrency(data.currency)
      .setMaxAmount(data.maxAmount)
      .setSpentAmount(data.spentAmount)
      .setAvailableAmount(data.availableAmount)
      .setStartDate(data.startDate)
      .setEndDate(data.endDate)
  }

  get isRefill() {
    return this.type === WalletOperationType.REFILL
  }

  get isTurnover() {
    return this.type === WalletOperationType.TURNOVER
  }

  get isPaymentsP2P() {
    return this.type === WalletOperationType.PAYMENTS_P2P
  }

  get isPaymentsProviderInternationals() {
    return this.type === WalletOperationType.PAYMENTS_PROVIDER_INTERNATIONALS
  }

  get isPaymentsProviderPayout() {
    return this.type === WalletOperationType.PAYMENTS_PROVIDER_PAYOUT
  }

  get isWithdrawCash() {
    return this.type === WalletOperationType.WITHDRAW_CASH
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setCountryCode(code) {
    this.countryCode = code
    return this
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setMaxAmount(amount) {
    this.maxAmount = amount
    return this
  }

  setSpentAmount(amount) {
    this.spentAmount = amount
    return this
  }

  setAvailableAmount(amount) {
    this.availableAmount = amount
    return this
  }

  setStartDate(date) {
    this.startDate = date
    return this
  }

  setEndDate(date) {
    this.endDate = date
    return this
  }

  toJSON() {
    const data = {}
    if (this.type) {
      data.type = this.type
    }
    if (this.countryCode) {
      data.countryCode = this.countryCode
    }
    if (this.currency) {
      data.currency = this.currency
    }
    if (Helper.exists(this.maxAmount)) {
      data.maxAmount = this.maxAmount
    }
    if (Helper.exists(this.spentAmount)) {
      data.spentAmount = this.spentAmount
    }
    if (Helper.exists(this.availableAmount)) {
      data.availableAmount = this.availableAmount
    }
    if (this.startDate) {
      data.startDate = this.startDate
    }
    if (this.endDate) {
      data.endDate = this.endDate
    }
    return data
  }
}
WalletLimit.fromParams = (params = {}, context) => {
  const data = {
    type: params.type,
    countryCode: params.countryCode,
    currency: params.currency,
    maxAmount: params.max,
    spentAmount: params.spent,
    availableAmount: params.rest
  }
  if (params.interval) {
    data.startDate = params.interval.dateFrom
    data.endDate = params.interval.dateTill
  }
  if (data.type) {
    data.type = data.type.toLowerCase()
  }
  if (data.startDate) {
    data.startDate = new UnixTimestamp(data.startDate).seconds
  }
  if (data.endDate) {
    data.endDate = new UnixTimestamp(data.endDate).seconds
  }
  return new WalletLimit(data, context)
}
WalletLimit.from = (data, context) => new WalletLimit(data, context)

module.exports = WalletLimit
