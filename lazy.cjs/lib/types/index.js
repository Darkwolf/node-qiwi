class Types {}
Object.defineProperty(Types, 'Response', {
  get: () => {
    if (!Types._Response) {
      Types._Response = require('./Response')
    }
    return Types._Response
  }
})
Object.defineProperty(Types, 'Profile', {
  get: () => {
    if (!Types._Profile) {
      Types._Profile = require('./Profile')
    }
    return Types._Profile
  }
})
Object.defineProperty(Types, 'AuthInfo', {
  get: () => {
    if (!Types._AuthInfo) {
      Types._AuthInfo = require('./AuthInfo')
    }
    return Types._AuthInfo
  }
})
Object.defineProperty(Types, 'ContractInfo', {
  get: () => {
    if (!Types._ContractInfo) {
      Types._ContractInfo = require('./ContractInfo')
    }
    return Types._ContractInfo
  }
})
Object.defineProperty(Types, 'UserInfo', {
  get: () => {
    if (!Types._UserInfo) {
      Types._UserInfo = require('./UserInfo')
    }
    return Types._UserInfo
  }
})
Object.defineProperty(Types, 'PassInfo', {
  get: () => {
    if (!Types._PassInfo) {
      Types._PassInfo = require('./PassInfo')
    }
    return Types._PassInfo
  }
})
Object.defineProperty(Types, 'PinInfo', {
  get: () => {
    if (!Types._PinInfo) {
      Types._PinInfo = require('./PinInfo')
    }
    return Types._PinInfo
  }
})
Object.defineProperty(Types, 'MobilePinInfo', {
  get: () => {
    if (!Types._MobilePinInfo) {
      Types._MobilePinInfo = require('./MobilePinInfo')
    }
    return Types._MobilePinInfo
  }
})
Object.defineProperty(Types, 'EmailSettings', {
  get: () => {
    if (!Types._EmailSettings) {
      Types._EmailSettings = require('./EmailSettings')
    }
    return Types._EmailSettings
  }
})
Object.defineProperty(Types, 'NicknameInfo', {
  get: () => {
    if (!Types._NicknameInfo) {
      Types._NicknameInfo = require('./NicknameInfo')
    }
    return Types._NicknameInfo
  }
})
Object.defineProperty(Types, 'IdentificationInfo', {
  get: () => {
    if (!Types._IdentificationInfo) {
      Types._IdentificationInfo = require('./IdentificationInfo')
    }
    return Types._IdentificationInfo
  }
})
Object.defineProperty(Types, 'Price', {
  get: () => {
    if (!Types._Price) {
      Types._Price = require('./Price')
    }
    return Types._Price
  }
})
Object.defineProperty(Types, 'SmsNotification', {
  get: () => {
    if (!Types._SmsNotification) {
      Types._SmsNotification = require('./SmsNotification')
    }
    return Types._SmsNotification
  }
})
Object.defineProperty(Types, 'PriorityPackage', {
  get: () => {
    if (!Types._PriorityPackage) {
      Types._PriorityPackage = require('./PriorityPackage')
    }
    return Types._PriorityPackage
  }
})
Object.defineProperty(Types, 'Identification', {
  get: () => {
    if (!Types._Identification) {
      Types._Identification = require('./Identification')
    }
    return Types._Identification
  }
})
Object.defineProperty(Types, 'WalletLimit', {
  get: () => {
    if (!Types._WalletLimit) {
      Types._WalletLimit = require('./WalletLimit')
    }
    return Types._WalletLimit
  }
})
Object.defineProperty(Types, 'WalletRestriction', {
  get: () => {
    if (!Types._WalletRestriction) {
      Types._WalletRestriction = require('./WalletRestriction')
    }
    return Types._WalletRestriction
  }
})
Object.defineProperty(Types, 'Payments', {
  get: () => {
    if (!Types._Payments) {
      Types._Payments = require('./Payments')
    }
    return Types._Payments
  }
})
Object.defineProperty(Types, 'Transaction', {
  get: () => {
    if (!Types._Transaction) {
      Types._Transaction = require('./Transaction')
    }
    return Types._Transaction
  }
})
Object.defineProperty(Types, 'Provider', {
  get: () => {
    if (!Types._Provider) {
      Types._Provider = require('./Provider')
    }
    return Types._Provider
  }
})
Object.defineProperty(Types, 'PaymentView', {
  get: () => {
    if (!Types._PaymentView) {
      Types._PaymentView = require('./PaymentView')
    }
    return Types._PaymentView
  }
})
Object.defineProperty(Types, 'CurrencyAmount', {
  get: () => {
    if (!Types._CurrencyAmount) {
      Types._CurrencyAmount = require('./CurrencyAmount')
    }
    return Types._CurrencyAmount
  }
})
Object.defineProperty(Types, 'PaymentsStats', {
  get: () => {
    if (!Types._PaymentsStats) {
      Types._PaymentsStats = require('./PaymentsStats')
    }
    return Types._PaymentsStats
  }
})
Object.defineProperty(Types, 'Account', {
  get: () => {
    if (!Types._Account) {
      Types._Account = require('./Account')
    }
    return Types._Account
  }
})
Object.defineProperty(Types, 'AccountOffer', {
  get: () => {
    if (!Types._AccountOffer) {
      Types._AccountOffer = require('./AccountOffer')
    }
    return Types._AccountOffer
  }
})
Object.defineProperty(Types, 'PaymentMethod', {
  get: () => {
    if (!Types._PaymentMethod) {
      Types._PaymentMethod = require('./PaymentMethod')
    }
    return Types._PaymentMethod
  }
})
Object.defineProperty(Types, 'PaymentCommissionRates', {
  get: () => {
    if (!Types._PaymentCommissionRates) {
      Types._PaymentCommissionRates = require('./PaymentCommissionRates')
    }
    return Types._PaymentCommissionRates
  }
})
Object.defineProperty(Types, 'PaymentDetails', {
  get: () => {
    if (!Types._PaymentDetails) {
      Types._PaymentDetails = require('./PaymentDetails')
    }
    return Types._PaymentDetails
  }
})
Object.defineProperty(Types, 'PaymentDetailsInternationalCardTransfer', {
  get: () => {
    if (!Types._PaymentDetailsInternationalCardTransfer) {
      Types._PaymentDetailsInternationalCardTransfer = require('./PaymentDetailsInternationalCardTransfer')
    }
    return Types._PaymentDetailsInternationalCardTransfer
  }
})
Object.defineProperty(Types, 'PaymentDetailsBankTransfer', {
  get: () => {
    if (!Types._PaymentDetailsBankTransfer) {
      Types._PaymentDetailsBankTransfer = require('./PaymentDetailsBankTransfer')
    }
    return Types._PaymentDetailsBankTransfer
  }
})
Object.defineProperty(Types, 'PaymentDetailsBankDetailsTransfer', {
  get: () => {
    if (!Types._PaymentDetailsBankDetailsTransfer) {
      Types._PaymentDetailsBankDetailsTransfer = require('./PaymentDetailsBankDetailsTransfer')
    }
    return Types._PaymentDetailsBankDetailsTransfer
  }
})
Object.defineProperty(Types, 'PaymentRequest', {
  get: () => {
    if (!Types._PaymentRequest) {
      Types._PaymentRequest = require('./PaymentRequest')
    }
    return Types._PaymentRequest
  }
})
Object.defineProperty(Types, 'CrossRate', {
  get: () => {
    if (!Types._CrossRate) {
      Types._CrossRate = require('./CrossRate')
    }
    return Types._CrossRate
  }
})
Object.defineProperty(Types, 'WebhookInfo', {
  get: () => {
    if (!Types._WebhookInfo) {
      Types._WebhookInfo = require('./WebhookInfo')
    }
    return Types._WebhookInfo
  }
})
Object.defineProperty(Types, 'Update', {
  get: () => {
    if (!Types._Update) {
      Types._Update = require('./Update')
    }
    return Types._Update
  }
})
Object.defineProperty(Types, 'Payment', {
  get: () => {
    if (!Types._Payment) {
      Types._Payment = require('./Payment')
    }
    return Types._Payment
  }
})

module.exports = Types
