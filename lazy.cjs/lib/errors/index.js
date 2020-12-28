class Errors {}
Object.defineProperty(Errors, 'Error', {
  get: () => {
    if (!Errors._Error) {
      Errors._Error = require('./Error')
    }
    return Errors._Error
  }
})
Object.defineProperty(Errors, 'BadRequestError', {
  get: () => {
    if (!Errors._BadRequestError) {
      Errors._BadRequestError = require('./BadRequestError')
    }
    return Errors._BadRequestError
  }
})
Object.defineProperty(Errors, 'UnauthorizedError', {
  get: () => {
    if (!Errors._UnauthorizedError) {
      Errors._UnauthorizedError = require('./UnauthorizedError')
    }
    return Errors._UnauthorizedError
  }
})
Object.defineProperty(Errors, 'InvalidAuthTokenError', {
  get: () => {
    if (!Errors._InvalidAuthTokenError) {
      Errors._InvalidAuthTokenError = require('./InvalidAuthTokenError')
    }
    return Errors._InvalidAuthTokenError
  }
})
Object.defineProperty(Errors, 'ForbiddenError', {
  get: () => {
    if (!Errors._ForbiddenError) {
      Errors._ForbiddenError = require('./ForbiddenError')
    }
    return Errors._ForbiddenError
  }
})
Object.defineProperty(Errors, 'NotFoundError', {
  get: () => {
    if (!Errors._NotFoundError) {
      Errors._NotFoundError = require('./NotFoundError')
    }
    return Errors._NotFoundError
  }
})
Object.defineProperty(Errors, 'AccountNotFoundError', {
  get: () => {
    if (!Errors._AccountNotFoundError) {
      Errors._AccountNotFoundError = require('./AccountNotFoundError')
    }
    return Errors._AccountNotFoundError
  }
})
Object.defineProperty(Errors, 'TransactionNotFoundError', {
  get: () => {
    if (!Errors._TransactionNotFoundError) {
      Errors._TransactionNotFoundError = require('./TransactionNotFoundError')
    }
    return Errors._TransactionNotFoundError
  }
})
Object.defineProperty(Errors, 'WebhookNotFoundError', {
  get: () => {
    if (!Errors._WebhookNotFoundError) {
      Errors._WebhookNotFoundError = require('./WebhookNotFoundError')
    }
    return Errors._WebhookNotFoundError
  }
})
Object.defineProperty(Errors, 'WebhookAlreadyExistsError', {
  get: () => {
    if (!Errors._WebhookAlreadyExistsError) {
      Errors._WebhookAlreadyExistsError = require('./WebhookAlreadyExistsError')
    }
    return Errors._WebhookAlreadyExistsError
  }
})
Object.defineProperty(Errors, 'NotEnoughBalanceError', {
  get: () => {
    if (!Errors._NotEnoughBalanceError) {
      Errors._NotEnoughBalanceError = require('./NotEnoughBalanceError')
    }
    return Errors._NotEnoughBalanceError
  }
})
Object.defineProperty(Errors, 'UnknownError', {
  get: () => {
    if (!Errors._UnknownError) {
      Errors._UnknownError = require('./UnknownError')
    }
    return Errors._UnknownError
  }
})

module.exports = Errors
