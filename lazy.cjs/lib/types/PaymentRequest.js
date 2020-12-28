const Helper = require('@darkwolf/helper.cjs')
const QIWI = require('../')
const constants = require('../constants')

class PaymentRequest {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setOperationId(data.operationId)
      .setProviderId(data.providerId)
      .setSource(data.source)
      .setAccount(data.account)
      .setDetails(data.details)
      .setCurrency(data.currency)
      .setAmount(data.amount)
      .setTransactionId(data.transactionId)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setOperationId(id) {
    this.operationId = id
    return this
  }

  setProviderId(id) {
    this.providerId = id
    return this
  }

  setSource(source) {
    this.source = source
    return this
  }

  setAccount(account) {
    this.account = account
    return this
  }

  setDetails(details) {
    let paymentDetails
    if (details) {
      if (details instanceof types.PaymentDetails) {
        paymentDetails = details
      } else {
        switch (this.providerId) {
          case constants.ProviderId.VISA_INTERNATIONAL:
          case constants.ProviderId.MASTERCARD_INTERNATIONAL: {
            paymentDetails = new types.PaymentDetailsInternationalCardTransfer(details)
            break
          }
          case constants.ProviderId.HOMECREDIT:
          case constants.ProviderId.ALFA:
          case constants.ProviderId.OTP:
          case constants.ProviderId.RSHB:
          case constants.ProviderId.RSB:
          case constants.ProviderId.VTB:
          case constants.ProviderId.UNICREDIT:
          case constants.ProviderId.PSB:
          case constants.ProviderId.QIWI:
          case constants.ProviderId.SBER:
          case constants.ProviderId.RENCREDIT:
          case constants.ProviderId.MKB:
          case constants.ProviderId.RAIFFEISEN: {
            paymentDetails = new types.PaymentDetailsBankTransfer(details)
            break
          }
          case constants.ProviderId.BANK_DETAILS: {
            paymentDetails = new types.PaymentDetailsBankDetailsTransfer(details)
            break
          }
          default: {
            paymentDetails = new types.PaymentDetails(details)
          }
        }
      }
    }
    this.details = paymentDetails
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

  setTransactionId(id) {
    this.transactionId = id
    return this
  }

  getTransaction() {
    return this.context.qiwi.getTransaction(this.transactionId)
  }

  toJSON() {
    const data = {}
    if (this.operationId) {
      data.operationId = this.operationId
    }
    if (this.providerId) {
      data.providerId = this.providerId
    }
    if (this.source) {
      data.source = this.source
    }
    if (this.account) {
      data.account = this.account
    }
    if (this.details) {
      data.details = this.details.toJSON()
    }
    if (this.currency) {
      data.currency = this.currency
    }
    if (Helper.exists(this.amount)) {
      data.amount = this.amount
    }
    if (this.transactionId) {
      data.transactionId = this.transactionId
    }
    return data
  }
}
PaymentRequest.fromParams = (params = {}, context) => {
  const data = {
    operationId: params.id,
    providerId: params.terms,
    source: params.source,
    details: params.fields
  }
  if (params.sum) {
    data.currency = params.sum.currency
    data.amount = params.sum.amount
  }
  if (params.transaction) {
    data.transactionId = params.transaction.id
  }
  if (data.operationId) {
    data.operationId = parseInt(data.operationId)
  }
  if (data.providerId) {
    data.providerId = parseInt(data.providerId)
  }
  if (data.details) {
    data.account = data.details.account
    let details
    switch (data.providerId) {
      case constants.ProviderId.VISA_INTERNATIONAL:
      case constants.ProviderId.MASTERCARD_INTERNATIONAL: {
        details = types.PaymentDetailsInternationalCardTransfer.fromParams(data.details)
        break
      }
      case constants.ProviderId.HOMECREDIT:
      case constants.ProviderId.ALFA:
      case constants.ProviderId.OTP:
      case constants.ProviderId.RSHB:
      case constants.ProviderId.RSB:
      case constants.ProviderId.VTB:
      case constants.ProviderId.PSB:
      case constants.ProviderId.SBER:
      case constants.ProviderId.RENCREDIT:
      case constants.ProviderId.MKB: {
        details = types.PaymentDetailsBankTransfer.fromParams(data.details)
        break
      }
      case constants.ProviderId.BANK_DETAILS: {
        details = types.PaymentDetailsBankDetailsTransfer.fromParams(data.details)
        break
      }
      default: {
        details = types.PaymentDetails.fromParams(data.details)
      }
    }
    data.details = details
  }
  if (data.currency) {
    data.currency = QIWI.getCurrencyByCode(data.currency)
  }
  if (data.transactionId) {
    data.transactionId = parseInt(data.transactionId)
  }
  return new PaymentRequest(data, context)
}
PaymentRequest.from = (data, context) => new PaymentRequest(data, context)

module.exports = PaymentRequest
