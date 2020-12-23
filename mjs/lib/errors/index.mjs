import Error from './Error.mjs'
import BadRequestError from './BadRequestError.mjs'
import UnauthorizedError from './UnauthorizedError.mjs'
import InvalidAuthTokenError from './InvalidAuthTokenError.mjs'
import ForbiddenError from './ForbiddenError.mjs'
import NotFoundError from './NotFoundError.mjs'
import AccountNotFoundError from './AccountNotFoundError.mjs'
import TransactionNotFoundError from './TransactionNotFoundError.mjs'
import WebhookNotFoundError from './WebhookNotFoundError.mjs'
import WebhookAlreadyExistsError from './WebhookAlreadyExistsError.mjs'
import NotEnoughBalanceError from './NotEnoughBalanceError.mjs'
import UnknownError from './UnknownError.mjs'

export {
  Error,
  BadRequestError,
  UnauthorizedError,
  InvalidAuthTokenError,
  ForbiddenError,
  NotFoundError,
  AccountNotFoundError,
  TransactionNotFoundError,
  WebhookNotFoundError,
  WebhookAlreadyExistsError,
  NotEnoughBalanceError,
  UnknownError
}

export default class Errors {
  static Error = Error
  static BadRequestError = BadRequestError
  static UnauthorizedError = UnauthorizedError
  static InvalidAuthTokenError = InvalidAuthTokenError
  static ForbiddenError = ForbiddenError
  static NotFoundError = NotFoundError
  static AccountNotFoundError = AccountNotFoundError
  static TransactionNotFoundError = TransactionNotFoundError
  static WebhookNotFoundError = WebhookNotFoundError
  static WebhookAlreadyExistsError = WebhookAlreadyExistsError
  static NotEnoughBalanceError = NotEnoughBalanceError
  static UnknownError = UnknownError
}
