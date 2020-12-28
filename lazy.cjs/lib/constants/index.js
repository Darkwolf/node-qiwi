class Constants {}
Object.defineProperty(Constants, 'EventType', {
  get: () => {
    if (!Constants._EventType) {
      Constants._EventType = require('./EventType')
    }
    return Constants._EventType
  }
})
Object.defineProperty(Constants, 'CountryCode', {
  get: () => {
    if (!Constants._CountryCode) {
      Constants._CountryCode = require('./CountryCode')
    }
    return Constants._CountryCode
  }
})
Object.defineProperty(Constants, 'CurrencyCode', {
  get: () => {
    if (!Constants._CurrencyCode) {
      Constants._CurrencyCode = require('./CurrencyCode')
    }
    return Constants._CurrencyCode
  }
})
Object.defineProperty(Constants, 'IdentificationType', {
  get: () => {
    if (!Constants._IdentificationType) {
      Constants._IdentificationType = require('./IdentificationType')
    }
    return Constants._IdentificationType
  }
})
Object.defineProperty(Constants, 'WalletOperationType', {
  get: () => {
    if (!Constants._WalletOperationType) {
      Constants._WalletOperationType = require('./WalletOperationType')
    }
    return Constants._WalletOperationType
  }
})
Object.defineProperty(Constants, 'WalletRestrictionType', {
  get: () => {
    if (!Constants._WalletRestrictionType) {
      Constants._WalletRestrictionType = require('./WalletRestrictionType')
    }
    return Constants._WalletRestrictionType
  }
})
Object.defineProperty(Constants, 'PaymentType', {
  get: () => {
    if (!Constants._PaymentType) {
      Constants._PaymentType = require('./PaymentType')
    }
    return Constants._PaymentType
  }
})
Object.defineProperty(Constants, 'PaymentStatus', {
  get: () => {
    if (!Constants._PaymentStatus) {
      Constants._PaymentStatus = require('./PaymentStatus')
    }
    return Constants._PaymentStatus
  }
})
Object.defineProperty(Constants, 'PaymentSource', {
  get: () => {
    if (!Constants._PaymentSource) {
      Constants._PaymentSource = require('./PaymentSource')
    }
    return Constants._PaymentSource
  }
})
Object.defineProperty(Constants, 'TransactionChequeMimeType', {
  get: () => {
    if (!Constants._TransactionChequeMimeType) {
      Constants._TransactionChequeMimeType = require('./TransactionChequeMimeType')
    }
    return Constants._TransactionChequeMimeType
  }
})
Object.defineProperty(Constants, 'AccountType', {
  get: () => {
    if (!Constants._AccountType) {
      Constants._AccountType = require('./AccountType')
    }
    return Constants._AccountType
  }
})
Object.defineProperty(Constants, 'ProviderId', {
  get: () => {
    if (!Constants._ProviderId) {
      Constants._ProviderId = require('./ProviderId')
    }
    return Constants._ProviderId
  }
})
Object.defineProperty(Constants, 'PaymentMethodType', {
  get: () => {
    if (!Constants._PaymentMethodType) {
      Constants._PaymentMethodType = require('./PaymentMethodType')
    }
    return Constants._PaymentMethodType
  }
})

module.exports = Constants
