import NotFoundError from './NotFoundError.mjs'

export default class TransactionNotFoundError extends NotFoundError {
  static name = 'TransactionNotFoundError'
  static code = 'transaction-not-found'

  constructor(id) {
    super(`Transaction not found: '${id}'.`, TransactionNotFoundError.code)
    this.setName(TransactionNotFoundError.name)
  }
}
