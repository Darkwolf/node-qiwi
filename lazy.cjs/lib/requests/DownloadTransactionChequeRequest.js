const errors = require('../errors')
const constants = require('../constants')

class DownloadTransactionChequeRequest {
  constructor(parameters = {}, context) {
    this.authRequired = DownloadTransactionChequeRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
      .setType(parameters.type)
      .setMimeType(parameters.mimeType)
  }

  get endpoint() {
    return `/payment-history/v1/transactions/${this.id}/cheque/file`
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

  setMimeType(type) {
    this.mimeType = type
    return this
  }

  toParams() {
    const params = {}
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
      params.type = type
    }
    if (this.mimeType) {
      let mimeType
      switch (this.mimeType) {
        case constants.TransactionChequeMimeType.JPEG: {
          mimeType = 'JPEG'
          break
        }
        case constants.TransactionChequeMimeType.PDF: {
          mimeType = 'PDF'
          break
        }
      }
      params.format = mimeType
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
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
DownloadTransactionChequeRequest.authRequired = true
DownloadTransactionChequeRequest.from = (parameters, context) => new DownloadTransactionChequeRequest(parameters, context)

module.exports = DownloadTransactionChequeRequest
