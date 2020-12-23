const Helper = require('@darkwolf/helper.cjs')

let _QIWI
const QIWI = () => {
  if (!_QIWI) {
    _QIWI = require('../')
  }
  return _QIWI
}

class PaymentCommissionRates {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setProviderId(data.providerId)
      .setCurrency(data.currency)
      .setAmount(data.amount)
      .setCommissionCurrency(data.commissionCurrency)
      .setCommissionAmount(data.commissionAmount)
      .setFundingSourceCommissionCurrency(data.fundingSourceCommissionCurrency)
      .setFundingSourceCommissionAmount(data.fundingSourceCommissionAmount)
      .setTotalCurrency(data.totalCurrency)
      .setTotalAmount(data.totalAmount)
      .setRate(data.rate)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setProviderId(id) {
    this.providerId = id
    return this
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setAmount(amount) {
    this.amount = amount
    return this
  }

  setCommissionCurrency(currency) {
    this.commissionCurrency = currency
    return this
  }

  setCommissionAmount(amount) {
    this.commissionAmount = amount
    return this
  }

  setFundingSourceCommissionCurrency(currency) {
    this.fundingSourceCommissionCurrency = currency
    return this
  }

  setFundingSourceCommissionAmount(amount) {
    this.fundingSourceCommissionAmount = amount
    return this
  }

  setTotalCurrency(currency) {
    this.totalCurrency = currency
    return this
  }

  setTotalAmount(amount) {
    this.totalAmount = amount
    return this
  }

  setRate(rate) {
    this.rate = rate
    return this
  }

  toJSON() {
    const data = {}
    if (this.providerId) {
      data.providerId = this.providerId
    }
    if (this.currency) {
      data.currency = this.currency
    }
    if (Helper.exists(this.amount)) {
      data.amount = this.amount
    }
    if (this.commissionCurrency) {
      data.commissionCurrency = this.commissionCurrency
    }
    if (Helper.exists(this.commissionAmount)) {
      data.commissionAmount = this.commissionAmount
    }
    if (this.fundingSourceCommissionCurrency) {
      data.fundingSourceCommissionCurrency = this.fundingSourceCommissionCurrency
    }
    if (Helper.exists(this.fundingSourceCommissionAmount)) {
      data.fundingSourceCommissionAmount = this.fundingSourceCommissionAmount
    }
    if (Helper.exists(this.rate)) {
      data.rate = this.rate
    }
    return data
  }
}
PaymentCommissionRates.fromParams = (params = {}, context) => {
  const data = {
    providerId: params.providerId,
    rate: params.withdrawToEnrollmentRate
  }
  if (params.enrollmentSum) {
    data.currency = params.enrollmentSum.currency
    data.amount = params.enrollmentSum.amount
  }
  if (params.qwCommission) {
    data.commissionCurrency = params.qwCommission.currency
    data.commissionAmount = params.qwCommission.amount
  }
  if (params.fundingSourceCommission) {
    data.fundingSourceCommissionCurrency = params.fundingSourceCommission.currency
    data.fundingSourceCommissionAmount = params.fundingSourceCommission.amount
  }
  if (params.withdrawSum) {
    data.totalCurrency = params.withdrawSum.currency
    data.totalAmount = params.withdrawSum.amount
  }
  if (data.currency) {
    data.currency = QIWI().getCurrencyByCode(data.currency)
  }
  if (data.commissionCurrency) {
    data.commissionCurrency = QIWI().getCurrencyByCode(data.commissionCurrency)
  }
  if (data.fundingSourceCommissionCurrency) {
    data.fundingSourceCommissionCurrency = QIWI().getCurrencyByCode(data.fundingSourceCommissionCurrency)
  }
  if (data.totalCurrency) {
    data.totalCurrency = QIWI().getCurrencyByCode(data.totalCurrency)
  }
  return new PaymentCommissionRates(data, context)
}
PaymentCommissionRates.from = (data, context) => new PaymentCommissionRates(data, context)

module.exports = PaymentCommissionRates
