const errors = require('./')

class AccountNotFoundError extends errors.NotFoundError {
  constructor(alias) {
    super(`Account not found: '${alias}'.`, AccountNotFoundError.code)
    this.setName(AccountNotFoundError.name)
  }
}
AccountNotFoundError.name = 'AccountNotFoundError'
AccountNotFoundError.code = 'account-not-found'

module.exports = AccountNotFoundError
