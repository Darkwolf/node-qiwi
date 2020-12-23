const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const { PaymentType, PaymentStatus } = require('../constants')
const Provider = require('./Provider')
const PaymentView = require('./PaymentView')

let _QIWI
const QIWI = () => {
  if (!_QIWI) {
    _QIWI = require('../')
  }
  return _QIWI
}

class Transaction {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setUserId(data.userId)
      .setType(data.type)
      .setSource(data.source)
      .setProvider(data.provider)
      .setStatus(data.status)
      .setStatusText(data.statusText)
      .setErrorCode(data.errorCode)
      .setErrorMessage(data.errorMessage)
      .setOperationId(data.operationId)
      .setAccount(data.account)
      .setCurrency(data.currency)
      .setAmount(data.amount)
      .setCurrencyRate(data.currencyRate)
      .setCommissionCurrency(data.commissionCurrency)
      .setCommissionAmount(data.commissionAmount)
      .setTotalCurrency(data.totalCurrency)
      .setTotalAmount(data.totalAmount)
      .setComment(data.comment)
      .setChequeReady(data.chequeReady)
      .setBankDocumentAvailable(data.bankDocumentAvailable)
      .setBankDocumentReady(data.bankDocumentReady)
      .setCanBeRegular(data.canBeRegular)
      .setCanBeFavorite(data.canBeFavorite)
      .setCanBeRepeated(data.canBeRepeated)
      .setChatAvailable(data.chatAvailable)
      .setGreetingCardAttached(data.greetingCardAttached)
      .setView(data.view)
      .setDate(data.date)
  }

  get isIncoming() {
    return this.type === PaymentType.INCOMING
  }

  get isOutgoing() {
    return this.type === PaymentType.OUTGOING
  }

  get isPending() {
    return this.status === PaymentStatus.PENDING
  }

  get isSuccess() {
    return this.status === PaymentStatus.SUCCESS
  }

  get isError() {
    return this.status === PaymentStatus.ERROR
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
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

  setSource(provider) {
    this.source = provider ? (
      provider instanceof Provider ? provider : new Provider(provider, this.context)
    ) : undefined
    return this
  }

  setProvider(provider) {
    this.provider = provider ? (
      provider instanceof Provider ? provider : new Provider(provider, this.context)
    ) : undefined
    return this
  }

  setStatus(status) {
    this.status = status
    return this
  }

  setStatusText(text) {
    this.statusText = text
    return this
  }

  setErrorCode(code) {
    this.errorCode = code
    return this
  }

  setErrorMessage(message) {
    this.errorMessage = message
    return this
  }

  setOperationId(id) {
    this.operationId = id
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

  setCurrencyRate(rate) {
    this.currencyRate = rate
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

  setChequeReady(boolean) {
    this.chequeReady = boolean
    return this
  }

  setBankDocumentAvailable(boolean) {
    this.bankDocumentAvailable = boolean
    return this
  }

  setBankDocumentReady(boolean) {
    this.bankDocumentReady = boolean
    return this
  }

  setCanBeRegular(boolean) {
    this.canBeRegular = boolean
    return this
  }

  setCanBeFavorite(boolean) {
    this.canBeFavorite = boolean
    return this
  }

  setCanBeRepeated(boolean) {
    this.canBeRepeated = boolean
    return this
  }

  setChatAvailable(boolean) {
    this.chatAvailable = boolean
    return this
  }

  setGreetingCardAttached(boolean) {
    this.greetingCardAttached = boolean
    return this
  }

  setView(view) {
    this.view = view ? (
      view instanceof PaymentView ? view : new PaymentView(view)
    ) : undefined
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  get() {
    return this.context.qiwi.getTransaction(this.id, this.type)
  }

  downloadCheque(mimeType) {
    return this.context.qiwi.downloadTransactionCheque(this.id, this.type, mimeType)
  }

  sendChequeToEmail(email) {
    return this.context.qiwi.sendTransactionChequeToEmail(this.id, this.type, email)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.userId) {
      data.userId = this.userId
    }
    if (this.type) {
      data.type = this.type
    }
    if (this.source) {
      data.source = this.source.toJSON()
    }
    if (this.provider) {
      data.provider = this.provider.toJSON()
    }
    if (this.status) {
      data.status = this.status
    }
    if (Helper.exists(this.statusText)) {
      data.statusText = this.statusText
    }
    if (this.errorCode) {
      data.errorCode = this.errorCode
    }
    if (Helper.exists(this.errorMessage)) {
      data.errorMessage = this.errorMessage
    }
    if (this.operationId) {
      data.operationId = this.operationId
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
    if (Helper.exists(this.currencyRate)) {
      data.currencyRate = this.currencyRate
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
    if (Helper.exists(this.chequeReady)) {
      data.chequeReady = this.chequeReady
    }
    if (Helper.exists(this.bankDocumentAvailable)) {
      data.bankDocumentAvailable = this.bankDocumentAvailable
    }
    if (Helper.exists(this.bankDocumentReady)) {
      data.bankDocumentReady = this.bankDocumentReady
    }
    if (Helper.exists(this.canBeRegular)) {
      data.canBeRegular = this.canBeRegular
    }
    if (Helper.exists(this.canBeFavorite)) {
      data.canBeFavorite = this.canBeFavorite
    }
    if (Helper.exists(this.canBeRepeated)) {
      data.canBeRepeated = this.canBeRepeated
    }
    if (Helper.exists(this.chatAvailable)) {
      data.chatAvailable = this.chatAvailable
    }
    if (Helper.exists(this.greetingCardAttached)) {
      data.greetingCardAttached = this.greetingCardAttached
    }
    if (this.view) {
      data.view = this.view.toJSON()
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
Transaction.fromParams = (params = {}, context) => {
  const data = {
    id: params.txnId,
    userId: params.personId,
    type: params.type,
    source: params.source,
    provider: params.provider,
    status: params.status,
    statusText: params.statusText,
    errorCode: params.errorCode,
    errorMessage: params.error,
    operationId: params.trmTxnId,
    account: params.account,
    currencyRate: params.currencyRate,
    comment: params.comment,
    view: params.view,
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
  if (params.features) {
    data.chequeReady = params.features.chequeReady
    data.bankDocumentAvailable = params.features.bankDocumentAvailable
    data.bankDocumentReady = params.features.bankDocumentReady
    data.canBeRegular = params.features.regularPaymentEnabled
    data.canBeFavorite = params.features.favoritePaymentEnabled
    data.canBeRepeated = params.features.repeatPaymentEnabled
    data.chatAvailable = params.features.chatAvailable
    data.greetingCardAttached = params.features.greetingCardAttached
  }
  if (data.type) {
    let type
    switch (data.type) {
      case 'IN': {
        type = PaymentType.INCOMING
        break
      }
      case 'OUT': {
        type = PaymentType.OUTGOING
        break
      }
      default: {
        type = data.type.toLowerCase()
      }
    }
    data.type = type
  }
  if (data.source) {
    data.source = Provider.fromParams(data.source, context)
  }
  if (data.provider) {
    data.provider = Provider.fromParams(data.provider, context)
  }
  if (data.status) {
    let status
    switch (data.status) {
      case 'WAITING': {
        status = PaymentStatus.PENDING
        break
      }
      default: {
        status = data.status.toLowerCase()
      }
    }
    data.status = status
  }
  if (data.operationId) {
    data.operationId = parseInt(data.operationId)
  }
  if (data.currency) {
    data.currency = QIWI().getCurrencyByCode(data.currency)
  }
  if (data.commissionCurrency) {
    data.commissionCurrency = QIWI().getCurrencyByCode(data.commissionCurrency)
  }
  if (data.totalCurrency) {
    data.totalCurrency = QIWI().getCurrencyByCode(data.totalCurrency)
  }
  if (data.view) {
    data.view = PaymentView.fromParams(data.view)
  }
  if (data.date) {
    data.date = new UnixTimestamp(data.date).seconds
  }
  return new Transaction(data, context)
}
Transaction.from = (data, context) => new Transaction(data, context)

module.exports = Transaction
