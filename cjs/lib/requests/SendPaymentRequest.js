const Helper = require('@darkwolf/helper.cjs')
const {
  PaymentMethod,
  PaymentDetails,
  PaymentDetailsInternationalCardTransfer,
  PaymentDetailsBankTransfer,
  PaymentDetailsBankDetailsTransfer,
  PaymentRequest
} = require('../types')
const { NotEnoughBalanceError, UnknownError } = require('../errors')
const { EventType, ProviderId, CurrencyCode, PaymentMethodType } = require('../constants')

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
      paymentMethod instanceof PaymentMethod ? paymentMethod : new PaymentMethod(paymentMethod.type, paymentMethod)
    ) : new PaymentMethod(PaymentMethodType.ACCOUNT, {
      accountId: CurrencyCode.RUB
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
      if (details instanceof PaymentDetails) {
        paymentDetails = details
      } else {
        switch (this.providerId) {
          case ProviderId.VISA_INTERNATIONAL:
          case ProviderId.MASTERCARD_INTERNATIONAL: {
            paymentDetails = new PaymentDetailsInternationalCardTransfer(details)
            break
          }
          case ProviderId.HOMECREDIT:
          case ProviderId.ALFA:
          case ProviderId.OTP:
          case ProviderId.RSHB:
          case ProviderId.RSB:
          case ProviderId.VTB:
          case ProviderId.UNICREDIT:
          case ProviderId.PSB:
          case ProviderId.QIWI:
          case ProviderId.SBER:
          case ProviderId.RENCREDIT:
          case ProviderId.MKB:
          case ProviderId.RAIFFEISEN: {
            paymentDetails = new PaymentDetailsBankTransfer(details)
            break
          }
          case ProviderId.BANK_DETAILS: {
            paymentDetails = new PaymentDetailsBankDetailsTransfer(details)
            break
          }
          default: {
            paymentDetails = new PaymentDetails(details)
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
        currency: `${CurrencyCode[this.currency] || this.currency}`
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
              error = new NotEnoughBalanceError().setResponse(response)
              break
            }
            default: {
              error = new UnknownError(response.result.message).setResponse(response)
            }
          }
          this.context.qiwi.emit(EventType.ERROR, error)
          if (!this.context.qiwi.settings.ignoreErrors) throw error
        }
        response.setResult(PaymentRequest.fromParams(response.result, this.context))
        this.context.qiwi.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(EventType.ERROR, error)
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
