import crypto from 'crypto'
import EventEmitter from 'events'
import fetch from 'node-fetch'
import Helper from '@darkwolf/helper.mjs'
import types, {
  Response,
  Profile,
  AuthInfo,
  ContractInfo,
  UserInfo,
  PassInfo,
  PinInfo,
  MobilePinInfo,
  EmailSettings,
  NicknameInfo,
  IdentificationInfo,
  Price,
  SmsNotification,
  PriorityPackage,
  Identification,
  WalletLimit,
  WalletRestriction,
  Payments,
  Transaction,
  Provider,
  PaymentView,
  CurrencyAmount,
  PaymentsStats,
  Account,
  AccountOffer,
  PaymentMethod,
  PaymentCommissionRates,
  PaymentDetails,
  PaymentDetailsInternationalCardTransfer,
  PaymentDetailsBankTransfer,
  PaymentDetailsBankDetailsTransfer,
  PaymentRequest,
  CrossRate,
  WebhookInfo,
  Update,
  Payment
} from './types/index.mjs'
import requests, {
  GetMeRequest,
  VerifyIdentificationRequest,
  GetIdentificationInfoRequest,
  GetWalletLimitsRequest,
  GetWalletRestrictionsRequest,
  GetPaymentsRequest,
  GetPaymentsStatsRequest,
  GetTransactionRequest,
  DownloadTransactionChequeRequest,
  SendTransactionChequeToEmailRequest,
  GetAccountsRequest,
  GetAccountRequest,
  CreateAccountRequest,
  GetAccountOffersRequest,
  MarkAccountDefaultRequest,
  GetNicknameInfoRequest,
  GetPaymentCommissionRatesRequest,
  SendPaymentRequest,
  GetCrossRatesRequest,
  DetectMobileProviderRequest,
  DetectCardProviderRequest,
  SearchProviderRequest,
  SetWebhookRequest,
  GetWebhookInfoRequest,
  DeleteWebhookRequest,
  GetWebhookSecretKeyRequest,
  GetNewWebhookSecretKeyRequest,
  SendTestWebhookUpdateRequest
} from './requests/index.mjs'
import errors, {
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
} from './errors/index.mjs'
import constants, {
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
} from './constants/index.mjs'

export {
  types,
  Response,
  Profile,
  AuthInfo,
  ContractInfo,
  UserInfo,
  PassInfo,
  PinInfo,
  MobilePinInfo,
  EmailSettings,
  NicknameInfo,
  IdentificationInfo,
  Price,
  SmsNotification,
  PriorityPackage,
  Identification,
  WalletLimit,
  WalletRestriction,
  Payments,
  Transaction,
  Provider,
  PaymentView,
  CurrencyAmount,
  PaymentsStats,
  Account,
  AccountOffer,
  PaymentMethod,
  PaymentCommissionRates,
  PaymentDetails,
  PaymentDetailsInternationalCardTransfer,
  PaymentDetailsBankTransfer,
  PaymentDetailsBankDetailsTransfer,
  PaymentRequest,
  CrossRate,
  WebhookInfo,
  Update,
  Payment,
  requests,
  GetMeRequest,
  VerifyIdentificationRequest,
  GetIdentificationInfoRequest,
  GetWalletLimitsRequest,
  GetWalletRestrictionsRequest,
  GetPaymentsRequest,
  GetPaymentsStatsRequest,
  GetTransactionRequest,
  DownloadTransactionChequeRequest,
  SendTransactionChequeToEmailRequest,
  GetAccountsRequest,
  GetAccountRequest,
  CreateAccountRequest,
  GetAccountOffersRequest,
  MarkAccountDefaultRequest,
  GetNicknameInfoRequest,
  GetPaymentCommissionRatesRequest,
  SendPaymentRequest,
  GetCrossRatesRequest,
  DetectMobileProviderRequest,
  DetectCardProviderRequest,
  SearchProviderRequest,
  SetWebhookRequest,
  GetWebhookInfoRequest,
  DeleteWebhookRequest,
  GetWebhookSecretKeyRequest,
  GetNewWebhookSecretKeyRequest,
  SendTestWebhookUpdateRequest,
  errors,
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
  UnknownError,
  constants,
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

export default class QIWI extends EventEmitter {
  static URL = 'https://qiwi.com'
  static API_URL = 'https://edge.qiwi.com'
  static WEBHOOK_SUBNETS = [
    '79.142.16.0/20',
    '195.189.100.0/22',
    '91.232.230.0/23',
    '91.213.51.0/24'
  ]
  static settings = {
    ignoreErrors: false
  }
  static types = types
  static Response = Response
  static Profile = Profile
  static AuthInfo = AuthInfo
  static ContractInfo = ContractInfo
  static UserInfo = UserInfo
  static PassInfo = PassInfo
  static PinInfo = PinInfo
  static MobilePinInfo = MobilePinInfo
  static EmailSettings = EmailSettings
  static NicknameInfo = NicknameInfo
  static IdentificationInfo = IdentificationInfo
  static Price = Price
  static SmsNotification = SmsNotification
  static PriorityPackage = PriorityPackage
  static Identification = Identification
  static WalletLimit = WalletLimit
  static WalletRestriction = WalletRestriction
  static Payments = Payments
  static Transaction = Transaction
  static Provider = Provider
  static PaymentView = PaymentView
  static CurrencyAmount = CurrencyAmount
  static PaymentsStats = PaymentsStats
  static Account = Account
  static AccountOffer = AccountOffer
  static PaymentMethod = PaymentMethod
  static PaymentCommissionRates = PaymentCommissionRates
  static PaymentDetails = PaymentDetails
  static PaymentDetailsInternationalCardTransfer = PaymentDetailsInternationalCardTransfer
  static PaymentDetailsBankTransfer = PaymentDetailsBankTransfer
  static PaymentDetailsBankDetailsTransfer = PaymentDetailsBankDetailsTransfer
  static PaymentRequest = PaymentRequest
  static CrossRate = CrossRate
  static WebhookInfo = WebhookInfo
  static Update = Update
  static Payment = Payment
  static requests = requests
  static GetMeRequest = GetMeRequest
  static VerifyIdentificationRequest = VerifyIdentificationRequest
  static GetIdentificationInfoRequest = GetIdentificationInfoRequest
  static GetWalletLimitsRequest = GetWalletLimitsRequest
  static GetWalletRestrictionsRequest = GetWalletRestrictionsRequest
  static GetPaymentsRequest = GetPaymentsRequest
  static GetPaymentsStatsRequest = GetPaymentsStatsRequest
  static GetTransactionRequest = GetTransactionRequest
  static DownloadTransactionChequeRequest = DownloadTransactionChequeRequest
  static SendTransactionChequeToEmailRequest = SendTransactionChequeToEmailRequest
  static GetAccountsRequest = GetAccountsRequest
  static GetAccountRequest = GetAccountRequest
  static CreateAccountRequest = CreateAccountRequest
  static GetAccountOffersRequest = GetAccountOffersRequest
  static MarkAccountDefaultRequest = MarkAccountDefaultRequest
  static GetNicknameInfoRequest = GetNicknameInfoRequest
  static GetPaymentCommissionRatesRequest = GetPaymentCommissionRatesRequest
  static SendPaymentRequest = SendPaymentRequest
  static GetCrossRatesRequest = GetCrossRatesRequest
  static DetectMobileProviderRequest = DetectMobileProviderRequest
  static DetectCardProviderRequest = DetectCardProviderRequest
  static SearchProviderRequest = SearchProviderRequest
  static SetWebhookRequest = SetWebhookRequest
  static GetWebhookInfoRequest = GetWebhookInfoRequest
  static DeleteWebhookRequest = DeleteWebhookRequest
  static GetWebhookSecretKeyRequest = GetWebhookSecretKeyRequest
  static GetNewWebhookSecretKeyRequest = GetNewWebhookSecretKeyRequest
  static SendTestWebhookUpdateRequest = SendTestWebhookUpdateRequest
  static errors = errors
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
  static constants = constants
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

  static getCurrencyByCode(code) {
    const currency = Object.entries(CurrencyCode).find(([key, value]) => value === code || parseInt(value) === code)
    return currency ? currency[0] : null
  }

  static getProviderTypeById(id) {
    const provider = Object.entries(ProviderId).find(([key, value]) => value === id || parseInt(value) === id)
    return provider ? provider[0] : null
  }

  static getPaymentFormUrl(providerId, options = {}) {
    const params = new URLSearchParams()
    const blockedFields = []
    if (options.disableEditAccount) {
      blockedFields.push('account')
    }
    if (options.disableEditAmount) {
      blockedFields.push('sum')
    }
    if (options.disableEditComment) {
      blockedFields.push('comment')
    }
    if (options.accountType) {
      params.append(`extra[${encodeURIComponent(`'accountType'`)}]`, options.accountType)
    }
    if (options.account) {
      params.append(`extra[${encodeURIComponent(`'account'`)}]`, options.account)
    }
    if (options.currency) {
      params.append('currency', CurrencyCode[options.currency] || options.currency)
    }
    if (Helper.exists(options.amount)) {
      const [integer, fraction] = `${options.amount}`.split('.')
      params.append('amountInteger', parseInt(integer) || 0)
      params.append('amountFraction', fraction ? parseInt(fraction.slice(0, 2)) : 0)
    }
    if (Helper.exists(options.comment)) {
      params.append(`extra[${encodeURIComponent(`'comment'`)}]`, `${options.comment}`)
    }
    if (blockedFields.length) {
      blockedFields.forEach((field, index) => {
        params.append(`blocked[${index}]`, field)
      })
    }
    const encodedParams = `${params}`
    return `${QIWI.URL}/payment/form/${providerId}${encodedParams ? `?${encodedParams}` : ''}`
  }

  static getQIWIWalletPaymentFormUrl(phoneNumber, options = {}) {
    return QIWI.getPaymentFormUrl(ProviderId.QIWI_WALLET, {
      disableEditAccount: options.disableEditPhoneNumber,
      ...options,
      account: phoneNumber
    })
  }

  static getQIWIWalletByNicknamePaymentFormUrl(nickname, options = {}) {
    return QIWI.getPaymentFormUrl(ProviderId.QIWI_WALLET_NICKNAME, {
      disableEditAccount: options.disableEditNickname,
      ...options,
      account: nickname.toUpperCase()
    })
  }

  static verifyWebhookUpdateSignature(params, secretKey) {
    const fields = params.payment.signFields.split(',').map(path => Helper.get(params.payment, path)).join('|')
    const signature = crypto.createHmac('sha256', Buffer.from(secretKey, 'base64')).update(fields).digest('hex')
    return signature === params.hash
  }

  static from(token, options) {
    return new QIWI(token, options)
  }

  constructor(token, options = {}) {
    super()
    this
      .setToken(token)
      .setPhoneNumber(options.phoneNumber)
      .setSettings(options.settings)
  }

  setToken(token) {
    this.token = token
    return this
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
    return this
  }

  setSettings(settings) {
    this.settings = {
      ...QIWI.settings,
      ...settings
    }
    return this
  }

  setIgnoreErrors(boolean) {
    this.settings.ignoreErrors = boolean
    return this
  }

  setAgent(agent) {
    this.settings.agent = agent
    return this
  }

  async request(request) {
    this.emit(EventType.REQUEST, request)
    try {
      const url = (
        request instanceof DetectMobileProviderRequest ||
        request instanceof DetectCardProviderRequest ||
        request instanceof SearchProviderRequest
      ) ? QIWI.URL : QIWI.API_URL
      const method = request.method || 'GET'
      let body
      let encodedParams
      if (request.toParams) {
        const params = request.toParams()
        if (method === 'GET' || (
          request instanceof DetectMobileProviderRequest ||
          request instanceof DetectCardProviderRequest ||
          request instanceof SearchProviderRequest ||
          request instanceof SetWebhookRequest
        )) {
          encodedParams = Object.entries(params).reduce((params, [key, value]) => {
            if (Helper.exists(value)) {
              params.append(key, value)
            }
            return params
          }, new URLSearchParams())
        } else {
          body = JSON.stringify(params)
        }
      }
      const res = await fetch(`${url}${request.endpoint}${encodedParams ? `?${encodedParams}` : ''}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(request.authRequired && {
            Authorization: `Bearer ${this.token}`
          })
        },
        body,
        agent: this.settings.agent
      })
      let response = new Response({
        ok: false
      }, {
        qiwi: this,
        request,
        response: res
      })
      if (res.status === 401) {
        throw new InvalidAuthTokenError(this.token).setResponse(response)
      }
      if (request instanceof DownloadTransactionChequeRequest && res.status === 200) {
        try {
          res.data = await res.blob()
          response
            .setOk(true)
            .setResult(res.data)
        } catch (e) {}
      } else if ((
        request instanceof SendTransactionChequeToEmailRequest ||
        request instanceof MarkAccountDefaultRequest
      ) && [200, 202, 204].includes(res.status)) {
        response.setOk(true)
      } else {
        try {
          res.data = await res.json()
          if (res.data.errorCode && res.data.traceId) {
            response
              .setErrorCode(res.data.errorCode)
              .setMessage(res.data.description)
          } else {
            response
              .setOk(true)
              .setResult(res.data)
          }
        } catch (e) {}
      }
      return response
    } catch (e) {
      this.emit(EventType.ERROR, e)
      if (!this.settings.ignoreErrors) throw e
      return null
    }
  }

  getMe(options) {
    return new GetMeRequest(options, {
      qiwi: this
    }).send()
  }

  async getAuthInfo() {
    const profile = await this.getMe({
      disableContractInfo: true,
      disableUserInfo: true
    })
    return profile.authInfo
  }

  async getContractInfo() {
    const profile = await this.getMe({
      disableAuthInfo: true,
      disableUserInfo: true
    })
    return profile.contractInfo
  }

  async getUserInfo() {
    const profile = await this.getMe({
      disableAuthInfo: true,
      disableContractInfo: true
    })
    return profile.userInfo
  }

  async getPhoneNumber() {
    const authInfo = await this.getAuthInfo()
    return `+${authInfo.userId}`
  }

  verifyIdentification(options) {
    return new VerifyIdentificationRequest(options, {
      qiwi: this
    }).send()
  }

  getIdentificationInfo() {
    return new GetIdentificationInfoRequest({
      qiwi: this
    }).send()
  }

  getWalletLimits(types) {
    return new GetWalletLimitsRequest({
      types
    }, {
      qiwi: this
    }).send()
  }

  getWalletRestrictions() {
    return new GetWalletRestrictionsRequest({
      qiwi: this
    }).send()
  }

  getPayments(options) {
    return new GetPaymentsRequest(options, {
      qiwi: this
    }).send()
  }

  getPaymentsStats(options) {
    return new GetPaymentsStatsRequest(options, {
      qiwi: this
    }).send()
  }

  getTransaction(id, type) {
    return new GetTransactionRequest({
      id,
      type
    }, {
      qiwi: this
    }).send()
  }

  downloadTransactionCheque(id, type, mimeType) {
    return new DownloadTransactionChequeRequest({
      id,
      type,
      mimeType
    }, {
      qiwi: this
    }).send()
  }

  sendTransactionChequeToEmail(id, type, email) {
    return new SendTransactionChequeToEmailRequest({
      id,
      type,
      email
    }, {
      qiwi: this
    }).send()
  }

  getAccounts(options) {
    return new GetAccountsRequest(options, {
      qiwi: this
    }).send()
  }

  getAccount(alias, options) {
    return new GetAccountRequest({
      ...options,
      alias
    }, {
      qiwi: this
    }).send()
  }

  createAccount(alias) {
    return new CreateAccountRequest({
      alias
    }, {
      qiwi: this
    }).send()
  }

  getAccountOffers() {
    return new GetAccountOffersRequest({
      qiwi: this
    }).send()
  }

  markAccountDefault(alias) {
    return new MarkAccountDefaultRequest({
      alias
    }, {
      qiwi: this
    }).send()
  }

  getNicknameInfo() {
    return new GetNicknameInfoRequest({
      qiwi: this
    }).send()
  }

  async getNickname() {
    const nicknameInfo = await this.getNicknameInfo()
    return nicknameInfo.nickname
  }

  getPaymentCommissionRates(providerId, amount, options) {
    return new GetPaymentCommissionRatesRequest({
      ...options,
      providerId,
      amount
    }, {
      qiwi: this
    }).send()
  }

  sendPayment(providerId, account, amount, options) {
    return new SendPaymentRequest({
      ...options,
      providerId,
      account,
      amount
    }, {
      qiwi: this
    }).send()
  }

  transferToQIWIWallet(phoneNumber, amount, options) {
    return this.sendPayment(ProviderId.QIWI_WALLET, phoneNumber, amount, options)
  }

  transferToQIWIWalletByNickname(nickname, amount, options) {
    return this.sendPayment(ProviderId.QIWI_WALLET_NICKNAME, nickname.toUpperCase(), amount, options)
  }

  transferBetweenCurrencyAccounts(fromCurrency, currency, amount, options) {
    return this.sendPayment(ProviderId.QIWI_WALLET_CONVERSION, this.phoneNumber, amount, {
      ...options,
      paymentMethod: new PaymentMethod(PaymentMethodType.ACCOUNT, {
        accountId: CurrencyCode[fromCurrency]
      }),
      currency
    })
  }

  transferToMTS(phoneNumber, amount, options) {
    return this.sendPayment(ProviderId.MTS, phoneNumber, amount, options)
  }

  transferToBeeline(phoneNumber, amount, options) {
    return this.sendPayment(ProviderId.BEELINE, phoneNumber, amount, options)
  }

  transferToMegafon(phoneNumber, amount, options) {
    return this.sendPayment(ProviderId.MEGAFON, phoneNumber, amount, options)
  }

  transferToMotiv(phoneNumber, amount, options) {
    return this.sendPayment(ProviderId.MOTIV, phoneNumber, amount, options)
  }

  transferToTele2(phoneNumber, amount, options) {
    return this.sendPayment(ProviderId.TELE2, phoneNumber, amount, options)
  }

  transferToYota(phoneNumber, amount, options) {
    return this.sendPayment(ProviderId.YOTA, phoneNumber, amount, options)
  }

  transferToTinkoffMobile(phoneNumber, amount, options) {
    return this.sendPayment(ProviderId.TINKOFF_MOBILE, phoneNumber, amount, options)
  }

  transferToVisaInternational(cardNumber, amount, details, options) {
    return this.sendPayment(ProviderId.VISA_INTERNATIONAL, cardNumber, amount, {
      ...options,
      details
    })
  }

  transferToVisaRussia(cardNumber, amount, options) {
    return this.sendPayment(ProviderId.VISA_RUSSIA, cardNumber, amount, options)
  }

  transferToMasterCardInternational(cardNumber, amount, details, options) {
    return this.sendPayment(ProviderId.MASTERCARD_INTERNATIONAL, cardNumber, amount, {
      ...options,
      details
    })
  }

  transferToMasterCardRussia(cardNumber, amount, options) {
    return this.sendPayment(ProviderId.MASTERCARD_RUSSIA, cardNumber, amount, options)
  }

  transferToQVC(cardNumber, amount, options) {
    return this.sendPayment(ProviderId.QVC, cardNumber, amount, options)
  }

  transferToHomeCredit(accountNumber, agreementNumber, amount, details, options) {
    return this.sendPayment(ProviderId.HOMECREDIT, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 6,
        agreementNumber
      }
    })
  }

  transferToAlfaCard(cardNumber, expirationDate, amount, details, options) {
    return this.sendPayment(ProviderId.ALFA, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 1,
        expirationDate
      }
    })
  }

  transferToAlfaAccount(accountNumber, amount, details, options) {
    return this.sendPayment(ProviderId.ALFA, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToOTPCard(cardNumber, amount, details, options) {
    return this.sendPayment(ProviderId.OTP, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 1
      }
    })
  }

  transferToOTPAccount(accountNumber, amount, details, options) {
    return this.sendPayment(ProviderId.OTP, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToRSHBCard(cardNumber, amount, details, options) {
    return this.sendPayment(ProviderId.RSHB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 5
      }
    })
  }

  transferToRSHBAccount(bic, accountNumber, amount, details = {}, options) {
    return this.sendPayment(ProviderId.RSHB, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2,
        bic,
        urgent: details.urgent === true
      }
    })
  }

  transferToRSBCard(cardNumber, amount, details, options) {
    return this.sendPayment(ProviderId.RSB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 1
      }
    })
  }

  transferToRSBAccount(accountNumber, amount, details, options) {
    return this.sendPayment(ProviderId.RSB, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToVTBCard(cardNumber, amount, details, options) {
    return this.sendPayment(ProviderId.VTB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 5
      }
    })
  }

  transferToVTBAccount(bic, accountNumber, amount, details = {}, options) {
    return this.sendPayment(ProviderId.VTB, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2,
        bic,
        urgent: details.urgent === true
      }
    })
  }

  transferToUniCredit(accountNumber, amount, details, options) {
    return this.sendPayment(ProviderId.UNICREDIT, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToPSBCard(cardNumber, expirationDate, amount, details, options) {
    return this.sendPayment(ProviderId.PSB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 7,
        expirationDate
      }
    })
  }

  transferToPSBAccount(accountNumber, amount, details, options) {
    return this.sendPayment(ProviderId.PSB, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 9
      }
    })
  }

  transferToQIWI(accountNumber, amount, details, options) {
    return this.sendPayment(ProviderId.QIWI, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToSberCard(cardNumber, amount, details, options) {
    return this.sendPayment(ProviderId.SBER, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 5
      }
    })
  }

  transferToSberAccount(bic, accountNumber, details = {}, options) {
    return this.sendPayment(ProviderId.SBER, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2,
        bic,
        urgent: details.urgent === true
      }
    })
  }

  transferToRenCreditCard(cardNumber, amount, details, options) {
    return this.sendPayment(ProviderId.RENCREDIT, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 1
      }
    })
  }

  transferToRenCreditAccount(accountNumber, amount, details, options) {
    return this.sendPayment(ProviderId.RENCREDIT, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToMKBCard(cardNumber, amount, details, options) {
    return this.sendPayment(ProviderId.MKB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 5
      }
    })
  }

  transferToMKBAccount(accountNumber, amount, details = {}, options) {
    return this.sendPayment(ProviderId.MKB, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2,
        urgent: details.urgent === true
      }
    })
  }

  transferToRaiffeisen(bic, accountNumber, amount, details, options) {
    return this.sendPayment(ProviderId.RAIFFEISEN, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2,
        bic
      }
    })
  }

  transferToBankDetails(accountNumber, amount, details = {}, options) {
    return this.sendPayment(ProviderId.BANK_DETAILS, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        commercial: true,
        urgent: details.urgent === true
      }
    })
  }

  getCrossRates() {
    return new GetCrossRatesRequest({
      qiwi: this
    }).send()
  }

  detectMobileProvider(phoneNumber) {
    return new DetectMobileProviderRequest({
      phoneNumber
    }, {
      qiwi: this
    }).send()
  }

  detectCardProvider(cardNumber) {
    return new DetectCardProviderRequest({
      cardNumber
    }, {
      qiwi: this
    }).send()
  }

  searchProvider(query) {
    return new SearchProviderRequest({
      query
    }, {
      qiwi: this
    }).send()
  }

  setWebhook(url, options) {
    return new SetWebhookRequest({
      ...options,
      url
    }, {
      qiwi: this
    }).send()
  }

  getWebhookInfo() {
    return new GetWebhookInfoRequest({
      qiwi: this
    }).send()
  }

  async deleteWebhook(id) {
    if (!id) {
      const webhookInfo = await this.getWebhookInfo()
      id = webhookInfo.id
    }
    return new DeleteWebhookRequest({
      id
    }, {
      qiwi: this
    }).send()
  }

  async getWebhookSecretKey(id) {
    if (!id) {
      const webhookInfo = await this.getWebhookInfo()
      id = webhookInfo.id
    }
    return new GetWebhookSecretKeyRequest({
      id
    }, {
      qiwi: this
    }).send()
  }

  async getNewWebhookSecretKey(id) {
    if (!id) {
      const webhookInfo = await this.getWebhookInfo()
      id = webhookInfo.id
    }
    return new GetNewWebhookSecretKeyRequest({
      id
    }, {
      qiwi: this
    }).send()
  }

  sendTestWebhookUpdate() {
    return new SendTestWebhookUpdateRequest({
      qiwi: this
    }).send()
  }

  processUpdate(params, callback) {
    const update = Update.fromParams(params, {
      qiwi: this
    })
    if (callback) {
      callback(update)
    }
    return update
  }
}
