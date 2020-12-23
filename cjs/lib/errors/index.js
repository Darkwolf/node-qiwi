const Error = require('./Error')
const BadRequestError = require('./BadRequestError')
const UnauthorizedError = require('./UnauthorizedError')
const InvalidAuthTokenError = require('./InvalidAuthTokenError')
const ForbiddenError = require('./ForbiddenError')
const NotFoundError = require('./NotFoundError')
const AccountNotFoundError = require('./AccountNotFoundError')
const TransactionNotFoundError = require('./TransactionNotFoundError')
const WebhookNotFoundError = require('./WebhookNotFoundError')
const WebhookAlreadyExistsError = require('./WebhookAlreadyExistsError')
const NotEnoughBalanceError = require('./NotEnoughBalanceError')
const UnknownError = require('./UnknownError')

class Errors {}
Errors.Error = Error
Errors.BadRequestError = BadRequestError
Errors.UnauthorizedError = UnauthorizedError
Errors.InvalidAuthTokenError = InvalidAuthTokenError
Errors.ForbiddenError = ForbiddenError
Errors.NotFoundError = NotFoundError
Errors.AccountNotFoundError = AccountNotFoundError
Errors.TransactionNotFoundError = TransactionNotFoundError
Errors.WebhookNotFoundError = WebhookNotFoundError
Errors.WebhookAlreadyExistsError = WebhookAlreadyExistsError
Errors.NotEnoughBalanceError = NotEnoughBalanceError
Errors.UnknownError = UnknownError

module.exports = Errors
