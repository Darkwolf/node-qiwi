const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const QIWI = require('../')
const constants = require('../constants')

class Payment {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setTransactionId(data.transactionId)
      .setUserId(data.userId)
      .setType(data.type)
      .setProviderId(data.providerId)
      .setStatus(data.status)
      .setErrorCode(data.errorCode)
      .setAccount(data.account)
      .setCurrency(data.currency)
      .setAmount(data.amount)
      .setCommissionCurrency(data.commissionCurrency)
      .setCommissionAmount(data.commissionAmount)
      .setTotalCurrency(data.totalCurrency)
      .setTotalAmount(data.totalAmount)
      .setComment(data.comment)
      .setDate(data.date)
  }

  get isIncoming() {
    return this.type === constants.PaymentType.INCOMING
  }

  get isOutgoing() {
    return this.type === constants.PaymentType.OUTGOING
  }

  get isPending() {
    return this.status === constants.PaymentStatus.PENDING
  }

  get isSuccess() {
    return this.status === constants.PaymentStatus.SUCCESS
  }

  get isError() {
    return this.status === constants.PaymentStatus.ERROR
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTransactionId(id) {
    this.transactionId = id
    return this
  }

  setUserId(id) {
    this.userId = id
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setProviderId(id) {
    this.providerId = id
    return this
  }

  setStatus(status) {
    this.status = status
    return this
  }

  setErrorCode(code) {
    this.errorCode = code
    return this
  }

  setAccount(account) {
    this.account = account
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

  setTotalCurrency(currency) {
    this.totalCurrency = currency
    return this
  }

  setTotalAmount(amount) {
    this.totalAmount = amount
    return this
  }

  setComment(comment) {
    this.comment = comment
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  getTransaction() {
    return this.context.qiwi.getTransaction(this.transactionId, this.type)
  }

  downloadTransactionCheque(mimeType) {
    return this.context.qiwi.downloadTransactionCheque(this.transactionId, this.type, mimeType)
  }

  sendTransactionChequeToEmail(email) {
    return this.context.qiwi.sendTransactionChequeToEmail(this.transactionId, this.type, email)
  }

  toJSON() {
    const data = {}
    if (this.transactionId) {
      data.transactionId = this.transactionId
    }
    if (this.userId) {
      data.userId = this.userId
    }
    if (this.type) {
      data.type = this.type
    }
    if (this.providerId) {
      data.providerId = this.providerId
    }
    if (this.status) {
      data.status = this.status
    }
    if (this.errorCode) {
      data.errorCode = this.errorCode
    }
    if (this.account) {
      data.account = this.account
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
    if (this.totalCurrency) {
      data.totalCurrency = this.totalCurrency
    }
    if (Helper.exists(this.totalAmount)) {
      data.totalAmount = this.totalAmount
    }
    if (Helper.exists(this.comment)) {
      data.comment = this.comment
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
Payment.fromParams = (params = {}, context) => {
  const data = {
    transactionId: params.txnId,
    userId: params.personId,
    type: params.type,
    providerId: params.provider,
    status: params.status,
    errorCode: params.errorCode,
    account: params.account,
    comment: params.comment,
    date: params.date
  }
  if (params.sum) {
    data.currency = params.sum.currency
    data.amount = params.sum.amount
  }
  if (params.commission) {
    data.commissionCurrency = params.commission.currency
    data.commissionAmount = params.commission.amount
  }
  if (params.total) {
    data.totalCurrency = params.total.currency
    data.totalAmount = params.total.amount
  }
  if (data.transactionId) {
    data.transactionId = parseInt(data.transactionId)
  }
  if (data.type) {
    let type
    switch (data.type) {
      case 'IN': {
        type = constants.PaymentType.INCOMING
        break
      }
      case 'OUT': {
        type = constants.PaymentType.OUTGOING
        break
      }
      default: {
        type = data.type.toLowerCase()
      }
    }
    data.type = type
  }
  if (data.status) {
    let status
    switch (data.status) {
      case 'WAITING': {
        status = constants.PaymentStatus.PENDING
        break
      }
      default: {
        status = data.status.toLowerCase()
      }
    }
    data.status = status
  }
  if (data.currency) {
    data.currency = QIWI.getCurrencyByCode(data.currency)
  }
  if (data.commissionCurrency) {
    data.commissionCurrency = QIWI.getCurrencyByCode(data.commissionCurrency)
  }
  if (data.totalCurrency) {
    data.totalCurrency = QIWI.getCurrencyByCode(data.totalCurrency)
  }
  if (data.date) {
    data.date = new UnixTimestamp(data.date).seconds
  }
  return new Payment(data, context)
}
Payment.from = (data, context) => new Payment(data, context)

module.exports = Payment
