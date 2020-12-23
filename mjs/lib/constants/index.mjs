import EventType from './EventType.mjs'
import CountryCode from './CountryCode.mjs'
import CurrencyCode from './CurrencyCode.mjs'
import IdentificationType from './IdentificationType.mjs'
import WalletOperationType from './WalletOperationType.mjs'
import WalletRestrictionType from './WalletRestrictionType.mjs'
import PaymentType from './PaymentType.mjs'
import PaymentStatus from './PaymentStatus.mjs'
import PaymentSource from './PaymentSource.mjs'
import TransactionChequeMimeType from './TransactionChequeMimeType.mjs'
import AccountType from './AccountType.mjs'
import ProviderId from './ProviderId.mjs'
import PaymentMethodType from './PaymentMethodType.mjs'

export {
  EventType,
  CountryCode,
  CurrencyCode,
  IdentificationType,
  WalletOperationType,
  WalletRestrictionType,
  PaymentType,
  PaymentStatus,
  PaymentSource,
  TransactionChequeMimeType,
  AccountType,
  ProviderId,
  PaymentMethodType
}

export default class Constants {
  static EventType = EventType
  static CountryCode = CountryCode
  static CurrencyCode = CurrencyCode
  static IdentificationType = IdentificationType
  static WalletOperationType = WalletOperationType
  static WalletRestrictionType = WalletRestrictionType
  static PaymentType = PaymentType
  static PaymentStatus = PaymentStatus
  static PaymentSource = PaymentSource
  static TransactionChequeMimeType = TransactionChequeMimeType
  static AccountType = AccountType
  static ProviderId = ProviderId
  static PaymentMethodType = PaymentMethodType
}
