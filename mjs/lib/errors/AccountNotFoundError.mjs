import NotFoundError from './NotFoundError.mjs'

export default class AccountNotFoundError extends NotFoundError {
  static name = 'AccountNotFoundError'
  static code = 'account-not-found'

  constructor(alias) {
    super(`Account not found: '${alias}'.`, AccountNotFoundError.code)
    this.setName(AccountNotFoundError.name)
  }
}
