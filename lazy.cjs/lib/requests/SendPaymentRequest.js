const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class SendPaymentRequest {
  constructor(parameters = {}, context) {
    this.method = SendPaymentRequest.method
    this.authRequired = SendPaymentRequest.authRequired
    this
      .setContext(context)
      .setOperationId(parameters.operationId)
      .setProviderId(parameters.providerId)
      .setPaymentMethod(parameters.paymentMethod)
      .setAccount(parameters.account)
      .setDetails(parameters.details)
      .setCurrency(parameters.currency)
      .setAmount(parameters.amount)
      .setComment(parameters.comment)
  }

  get endpoint() {
    return `/sinap/api/v2/terms/${this.providerId}/payments`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setOperationId(id) {
    this.operationId = id || Helper.now()
    return this
  }

  setProviderId(id) {
    this.providerId = id
    return this
  }

  setPaymentMethod(paymentMethod) {
    this.paymentMethod = paymentMethod ? (
      paymentMethod instanceof types.PaymentMethod ? paymentMethod : new types.PaymentMethod(paymentMethod.type, paymentMethod)
    ) : new types.PaymentMethod(constants.PaymentMethodType.ACCOUNT, {
      accountId: constants.CurrencyCode.RUB
    })
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
    this.currency = currency || 'RUB'
    return this
  }

  setAmount(amount) {
    this.amount = amount
    return this
  }

  setComment(comment) {
    this.comment = comment
    return this
  }

  toParams() {
    const params = {}
    if (this.operationId) {
      params.id = `${this.operationId}`
    }
    if (this.paymentMethod) {
      params.paymentMethod = this.paymentMethod.toParams()
    }
    if (this.account) {
      params.fields = {
        account: `${this.account}`
      }
    }
    if (this.details) {
      params.fields = {
        ...params.fields,
        ...this.details.toParams()
      }
    }
    if (this.currency) {
      params.sum = {
        ...params.sum,
        currency: `${constants.CurrencyCode[this.currency] || this.currency}`
      }
    }
    if (Helper.exists(this.amount)) {
      params.sum = {
        ...params.sum,
        amount: this.amount
      }
    }
    if (Helper.exists(this.comment)) {
      params.comment = this.comment
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        if (!response.result.id) {
          response
            .setOk(false)
            .setErrorCode(response.result.code)
            .setMessage(response.result.message)
          let error
          switch (response.result.code) {
            case 'QWPRC-220': {
              error = new errors.NotEnoughBalanceError().setResponse(response)
              break
            }
            default: {
              error = new errors.UnknownError(response.result.message).setResponse(response)
            }
          }
          this.context.qiwi.emit(constants.EventType.ERROR, error)
          if (!this.context.qiwi.settings.ignoreErrors) throw error
        } else {
          response.setResult(types.PaymentRequest.fromParams(response.result, this.context))
          this.context.qiwi.emit(constants.EventType.RESPONSE, response)
          return response.result
        }
      } else {
        const error = new errors.UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(constants.EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
SendPaymentRequest.method = 'POST'
SendPaymentRequest.authRequired = true
SendPaymentRequest.from = (parameters, context) => new SendPaymentRequest(parameters, context)

module.exports = SendPaymentRequest
