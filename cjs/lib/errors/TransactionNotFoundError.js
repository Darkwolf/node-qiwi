const NotFoundError = require('./NotFoundError')

class TransactionNotFoundError extends NotFoundError {
  constructor(id) {
    super(`Transaction not found: '${id}'.`, TransactionNotFoundError.code)
    this.setName(TransactionNotFoundError.name)
  }
}
TransactionNotFoundError.name = 'TransactionNotFoundError'
TransactionNotFoundError.code = 'transaction-not-found'

module.exports = TransactionNotFoundError
