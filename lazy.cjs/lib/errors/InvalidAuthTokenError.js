const errors = require('./')

class InvalidAuthTokenError extends errors.UnauthorizedError {
  constructor(token) {
    super(`Invalid auth token: '${token}'.`, InvalidAuthTokenError.code)
    this.setName(InvalidAuthTokenError.name)
  }
}
InvalidAuthTokenError.name = 'InvalidAuthTokenError'
InvalidAuthTokenError.code = 'invalid-auth-token'

module.exports = InvalidAuthTokenError
