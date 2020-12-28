const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetPaymentCommissionRatesRequest {
  constructor(parameters = {}, context) {
    this.method = GetPaymentCommissionRatesRequest.method
    this.authRequired = GetPaymentCommissionRatesRequest.authRequired
    this
      .setContext(context)
      .setProviderId(parameters.providerId)
      .setPaymentMethod(parameters.paymentMethod)
      .setAccount(parameters.account)
      .setCurrency(parameters.currency)
      .setAmount(parameters.amount)
  }

  get endpoint() {
    return `/sinap/providers/${this.providerId}/onlineCommission`
  }

  setContext(context = {}) {
    this.context = context
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

  setCurrency(currency) {
    this.currency = currency || 'RUB'
    return this
  }

  setAmount(amount) {
    this.amount = amount
    return this
  }

  toParams() {
    const params = {}
    if (this.paymentMethod) {
      params.paymentMethod = this.paymentMethod.toParams()
    }
    if (this.account) {
      params.account = this.account
    }
    if (this.currency) {
      params.purchaseTotals = {
        ...params.purchaseTotals,
        total: {
          ...(params.purchaseTotals && params.purchaseTotals.total),
          currency: `${constants.CurrencyCode[this.currency] || this.currency}`
        }
      }
    }
    if (Helper.exists(this.amount)) {
      params.purchaseTotals = {
        ...params.purchaseTotals,
        total: {
          ...(params.purchaseTotals && params.purchaseTotals.total),
          amount: this.amount
        }
      }
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        if (!response.result.providerId) {
          response
            .setOk(false)
            .setErrorCode(response.result.code)
            .setMessage(response.result.message)
          const error = new errors.UnknownError(response.result.message).setResponse(response)
          this.context.qiwi.emit(constants.EventType.ERROR, error)
          if (!this.context.qiwi.settings.ignoreErrors) throw error
        } else {
          response.setResult(types.PaymentCommissionRates.fromParams(response.result, this.context))
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
GetPaymentCommissionRatesRequest.method = 'POST'
GetPaymentCommissionRatesRequest.authRequired = true
GetPaymentCommissionRatesRequest.from = (parameters, context) => new GetPaymentCommissionRatesRequest(parameters, context)

module.exports = GetPaymentCommissionRatesRequest
