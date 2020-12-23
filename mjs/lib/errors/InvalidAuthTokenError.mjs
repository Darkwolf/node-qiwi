import UnauthorizedError from './UnauthorizedError.mjs'

export default class InvalidAuthTokenError extends UnauthorizedError {
  static name = 'InvalidAuthTokenError'
  static code = 'invalid-auth-token'

  constructor(token) {
    super(`Invalid auth token: '${token}'.`, InvalidAuthTokenError.code)
    this.setName(InvalidAuthTokenError.name)
  }
}
