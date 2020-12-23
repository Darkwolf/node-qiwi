const Helper = require('@darkwolf/helper.cjs')
const { PaymentMethod, PaymentCommissionRates } = require('../types')
const { UnknownError } = require('../errors')
const { EventType, CurrencyCode, PaymentMethodType } = require('../constants')

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
          currency: `${CurrencyCode[this.currency] || this.currency}`
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
          const error = new UnknownError(response.result.message).setResponse(response)
          this.context.qiwi.emit(EventType.ERROR, error)
          if (!this.context.qiwi.settings.ignoreErrors) throw error
        }
        response.setResult(PaymentCommissionRates.fromParams(response.result, this.context))
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
GetPaymentCommissionRatesRequest.method = 'POST'
GetPaymentCommissionRatesRequest.authRequired = true
GetPaymentCommissionRatesRequest.from = (parameters, context) => new GetPaymentCommissionRatesRequest(parameters, context)

module.exports = GetPaymentCommissionRatesRequest
