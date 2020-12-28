const errors = require('../errors')
const constants = require('../constants')

class SendTransactionChequeToEmailRequest {
  constructor(parameters = {}, context) {
    this.method = SendTransactionChequeToEmailRequest.method
    this.authRequired = SendTransactionChequeToEmailRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
      .setType(parameters.type)
      .setEmail(parameters.email)
  }

  get endpoint() {
    const params = new URLSearchParams()
    if (this.type) {
      let type
      switch (this.type) {
        case constants.PaymentType.INCOMING: {
          type = 'IN'
          break
        }
        case constants.PaymentType.OUTGOING: {
          type = 'OUT'
          break
        }
        default: {
          type = this.type.toUpperCase()
        }
      }
      params.append('type', type)
    }
    const encodedParams = `${params}`
    return `/payment-history/v1/transactions/${this.id}/cheque/send${encodedParams ? `?${encodedParams}` : ''}`
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

  setEmail(email) {
    this.email = email
    return this
  }

  toParams() {
    const params = {}
    if (this.email) {
      params.email = this.email
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(true)
        this.context.qiwi.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 'payment.history.not.found': {
            error = new errors.TransactionNotFoundError(this.id).setResponse(response)
            break
          }
          default: {
            error = new errors.UnknownError(response.message).setResponse(response)
          }
        }
        this.context.qiwi.emit(constants.EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
SendTransactionChequeToEmailRequest.method = 'POST'
SendTransactionChequeToEmailRequest.authRequired = true
SendTransactionChequeToEmailRequest.from = (parameters, context) => new SendTransactionChequeToEmailRequest(parameters, context)

module.exports = SendTransactionChequeToEmailRequest
