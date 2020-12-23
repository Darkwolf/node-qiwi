const { Transaction } = require('../types')
const { TransactionNotFoundError, UnknownError } = require('../errors')
const { EventType, PaymentType } = require('../constants')

class GetTransactionRequest {
  constructor(parameters = {}, context) {
    this.authRequired = GetTransactionRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
      .setType(parameters.type)
  }

  get endpoint() {
    return `/payment-history/v2/transactions/${this.id}`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  toParams() {
    const params = {}
    if (this.type) {
      let type
      switch (this.type) {
        case PaymentType.INCOMING: {
          type = 'IN'
          break
        }
        case PaymentType.OUTGOING: {
          type = 'OUT'
          break
        }
        default: {
          type = this.type.toUpperCase()
        }
      }
      params.type = type
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Transaction.fromParams(response.result, this.context))
        this.context.qiwi.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 'payment.history.not.found': {
            error = new TransactionNotFoundError(this.id).setResponse(response)
            break
          }
          default: {
            error = new UnknownError(response.message).setResponse(response)
          }
        }
        this.context.qiwi.emit(EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetTransactionRequest.authRequired = true
GetTransactionRequest.from = (parameters, context) => new GetTransactionRequest(parameters, context)

module.exports = GetTransactionRequest
