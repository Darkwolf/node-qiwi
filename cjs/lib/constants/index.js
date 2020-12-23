const EventType = require('./EventType')
const CountryCode = require('./CountryCode')
const CurrencyCode = require('./CurrencyCode')
const IdentificationType = require('./IdentificationType')
const WalletOperationType = require('./WalletOperationType')
const WalletRestrictionType = require('./WalletRestrictionType')
const PaymentType = require('./PaymentType')
const PaymentStatus = require('./PaymentStatus')
const PaymentSource = require('./PaymentSource')
const TransactionChequeMimeType = require('./TransactionChequeMimeType')
const AccountType = require('./AccountType')
const ProviderId = require('./ProviderId')
const PaymentMethodType = require('./PaymentMethodType')

class Constants {}
Constants.EventType = EventType
Constants.CountryCode = CountryCode
Constants.CurrencyCode = CurrencyCode
Constants.IdentificationType = IdentificationType
Constants.WalletOperationType = WalletOperationType
Constants.WalletRestrictionType = WalletRestrictionType
Constants.PaymentType = PaymentType
Constants.PaymentStatus = PaymentStatus
Constants.PaymentSource = PaymentSource
Constants.TransactionChequeMimeType = TransactionChequeMimeType
Constants.AccountType = AccountType
Constants.ProviderId = ProviderId
Constants.PaymentMethodType = PaymentMethodType

module.exports = Constants
