import { TransactionNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType, PaymentType } from '../constants/index.mjs'

export default class SendTransactionChequeToEmailRequest {
  static method = 'POST'
  static authRequired = true

  static from(parameters, context) {
    return new SendTransactionChequeToEmailRequest(parameters, context)
  }

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
