const crypto = require('crypto')
const EventEmitter = require('events')
const fetch = require('node-fetch')
const Helper = require('@darkwolf/helper.cjs')
const types = require('./types')
const requests = require('./requests')
const errors = require('./errors')
const constants = require('./constants')

class QIWI extends EventEmitter {
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
    this.emit(constants.EventType.REQUEST, request)
    try {
      const url = (
        request instanceof requests.DetectMobileProviderRequest ||
        request instanceof requests.DetectCardProviderRequest ||
        request instanceof requests.SearchProviderRequest
      ) ? QIWI.URL : QIWI.API_URL
      const method = request.method || 'GET'
      let body
      let encodedParams
      if (request.toParams) {
        const params = request.toParams()
        if (method === 'GET' || (
          request instanceof requests.DetectMobileProviderRequest ||
          request instanceof requests.DetectCardProviderRequest ||
          request instanceof requests.SearchProviderRequest ||
          request instanceof requests.SetWebhookRequest
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
      let response = new types.Response({
        ok: false
      }, {
        qiwi: this,
        request,
        response: res
      })
      if (res.status === 401) {
        throw new errors.InvalidAuthTokenError(this.token).setResponse(response)
      }
      if (request instanceof requests.DownloadTransactionChequeRequest && res.status === 200) {
        try {
          res.data = await res.blob()
          response
            .setOk(true)
            .setResult(res.data)
        } catch (e) {}
      } else if ((
        request instanceof requests.SendTransactionChequeToEmailRequest ||
        request instanceof requests.MarkAccountDefaultRequest
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
      this.emit(constants.EventType.ERROR, e)
      if (!this.settings.ignoreErrors) throw e
      return null
    }
  }

  getMe(options) {
    return new requests.GetMeRequest(options, {
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
    return new requests.VerifyIdentificationRequest(options, {
      qiwi: this
    }).send()
  }

  getIdentificationInfo() {
    return new requests.GetIdentificationInfoRequest({
      qiwi: this
    }).send()
  }

  getWalletLimits(types) {
    return new requests.GetWalletLimitsRequest({
      types
    }, {
      qiwi: this
    }).send()
  }

  getWalletRestrictions() {
    return new requests.GetWalletRestrictionsRequest({
      qiwi: this
    }).send()
  }

  getPayments(options) {
    return new requests.GetPaymentsRequest(options, {
      qiwi: this
    }).send()
  }

  getPaymentsStats(options) {
    return new requests.GetPaymentsStatsRequest(options, {
      qiwi: this
    }).send()
  }

  getTransaction(id, type) {
    return new requests.GetTransactionRequest({
      id,
      type
    }, {
      qiwi: this
    }).send()
  }

  downloadTransactionCheque(id, type, mimeType) {
    return new requests.DownloadTransactionChequeRequest({
      id,
      type,
      mimeType
    }, {
      qiwi: this
    }).send()
  }

  sendTransactionChequeToEmail(id, type, email) {
    return new requests.SendTransactionChequeToEmailRequest({
      id,
      type,
      email
    }, {
      qiwi: this
    }).send()
  }

  getAccounts(options) {
    return new requests.GetAccountsRequest(options, {
      qiwi: this
    }).send()
  }

  getAccount(alias, options) {
    return new requests.GetAccountRequest({
      ...options,
      alias
    }, {
      qiwi: this
    }).send()
  }

  createAccount(alias) {
    return new requests.CreateAccountRequest({
      alias
    }, {
      qiwi: this
    }).send()
  }

  getAccountOffers() {
    return new requests.GetAccountOffersRequest({
      qiwi: this
    }).send()
  }

  markAccountDefault(alias) {
    return new requests.MarkAccountDefaultRequest({
      alias
    }, {
      qiwi: this
    }).send()
  }

  getNicknameInfo() {
    return new requests.GetNicknameInfoRequest({
      qiwi: this
    }).send()
  }

  async getNickname() {
    const nicknameInfo = await this.getNicknameInfo()
    return nicknameInfo.nickname
  }

  getPaymentCommissionRates(providerId, amount, options) {
    return new requests.GetPaymentCommissionRatesRequest({
      ...options,
      providerId,
      amount
    }, {
      qiwi: this
    }).send()
  }

  sendPayment(providerId, account, amount, options) {
    return new requests.SendPaymentRequest({
      ...options,
      providerId,
      account,
      amount
    }, {
      qiwi: this
    }).send()
  }

  transferToQIWIWallet(phoneNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.QIWI_WALLET, phoneNumber, amount, options)
  }

  transferToQIWIWalletByNickname(nickname, amount, options) {
    return this.sendPayment(constants.ProviderId.QIWI_WALLET_NICKNAME, nickname.toUpperCase(), amount, options)
  }

  transferBetweenCurrencyAccounts(fromCurrency, currency, amount, options) {
    return this.sendPayment(constants.ProviderId.QIWI_WALLET_CONVERSION, this.phoneNumber, amount, {
      ...options,
      paymentMethod: new types.PaymentMethod(constants.PaymentMethodType.ACCOUNT, {
        accountId: constants.CurrencyCode[fromCurrency]
      }),
      currency
    })
  }

  transferToMTS(phoneNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.MTS, phoneNumber, amount, options)
  }

  transferToBeeline(phoneNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.BEELINE, phoneNumber, amount, options)
  }

  transferToMegafon(phoneNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.MEGAFON, phoneNumber, amount, options)
  }

  transferToMotiv(phoneNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.MOTIV, phoneNumber, amount, options)
  }

  transferToTele2(phoneNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.TELE2, phoneNumber, amount, options)
  }

  transferToYota(phoneNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.YOTA, phoneNumber, amount, options)
  }

  transferToTinkoffMobile(phoneNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.TINKOFF_MOBILE, phoneNumber, amount, options)
  }

  transferToVisaInternational(cardNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.VISA_INTERNATIONAL, cardNumber, amount, {
      ...options,
      details
    })
  }

  transferToVisaRussia(cardNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.VISA_RUSSIA, cardNumber, amount, options)
  }

  transferToMasterCardInternational(cardNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.MASTERCARD_INTERNATIONAL, cardNumber, amount, {
      ...options,
      details
    })
  }

  transferToMasterCardRussia(cardNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.MASTERCARD_RUSSIA, cardNumber, amount, options)
  }

  transferToQVC(cardNumber, amount, options) {
    return this.sendPayment(constants.ProviderId.QVC, cardNumber, amount, options)
  }

  transferToHomeCredit(accountNumber, agreementNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.HOMECREDIT, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 6,
        agreementNumber
      }
    })
  }

  transferToAlfaCard(cardNumber, expirationDate, amount, details, options) {
    return this.sendPayment(constants.ProviderId.ALFA, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 1,
        expirationDate
      }
    })
  }

  transferToAlfaAccount(accountNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.ALFA, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToOTPCard(cardNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.OTP, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 1
      }
    })
  }

  transferToOTPAccount(accountNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.OTP, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToRSHBCard(cardNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.RSHB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 5
      }
    })
  }

  transferToRSHBAccount(bic, accountNumber, amount, details = {}, options) {
    return this.sendPayment(constants.ProviderId.RSHB, accountNumber, amount, {
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
    return this.sendPayment(constants.ProviderId.RSB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 1
      }
    })
  }

  transferToRSBAccount(accountNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.RSB, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToVTBCard(cardNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.VTB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 5
      }
    })
  }

  transferToVTBAccount(bic, accountNumber, amount, details = {}, options) {
    return this.sendPayment(constants.ProviderId.VTB, accountNumber, amount, {
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
    return this.sendPayment(constants.ProviderId.UNICREDIT, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToPSBCard(cardNumber, expirationDate, amount, details, options) {
    return this.sendPayment(constants.ProviderId.PSB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 7,
        expirationDate
      }
    })
  }

  transferToPSBAccount(accountNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.PSB, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 9
      }
    })
  }

  transferToQIWI(accountNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.QIWI, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToSberCard(cardNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.SBER, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 5
      }
    })
  }

  transferToSberAccount(bic, accountNumber, details = {}, options) {
    return this.sendPayment(constants.ProviderId.SBER, accountNumber, amount, {
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
    return this.sendPayment(constants.ProviderId.RENCREDIT, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 1
      }
    })
  }

  transferToRenCreditAccount(accountNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.RENCREDIT, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2
      }
    })
  }

  transferToMKBCard(cardNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.MKB, cardNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 5
      }
    })
  }

  transferToMKBAccount(accountNumber, amount, details = {}, options) {
    return this.sendPayment(constants.ProviderId.MKB, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2,
        urgent: details.urgent === true
      }
    })
  }

  transferToRaiffeisen(bic, accountNumber, amount, details, options) {
    return this.sendPayment(constants.ProviderId.RAIFFEISEN, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        accountType: 2,
        bic
      }
    })
  }

  transferToBankDetails(accountNumber, amount, details = {}, options) {
    return this.sendPayment(constants.ProviderId.BANK_DETAILS, accountNumber, amount, {
      ...options,
      details: {
        ...details,
        commercial: true,
        urgent: details.urgent === true
      }
    })
  }

  getCrossRates() {
    return new requests.GetCrossRatesRequest({
      qiwi: this
    }).send()
  }

  detectMobileProvider(phoneNumber) {
    return new requests.DetectMobileProviderRequest({
      phoneNumber
    }, {
      qiwi: this
    }).send()
  }

  detectCardProvider(cardNumber) {
    return new requests.DetectCardProviderRequest({
      cardNumber
    }, {
      qiwi: this
    }).send()
  }

  searchProvider(query) {
    return new requests.SearchProviderRequest({
      query
    }, {
      qiwi: this
    }).send()
  }

  setWebhook(url, options) {
    return new requests.SetWebhookRequest({
      ...options,
      url
    }, {
      qiwi: this
    }).send()
  }

  getWebhookInfo() {
    return new requests.GetWebhookInfoRequest({
      qiwi: this
    }).send()
  }

  async deleteWebhook(id) {
    if (!id) {
      const webhookInfo = await this.getWebhookInfo()
      id = webhookInfo.id
    }
    return new requests.DeleteWebhookRequest({
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
    return new requests.GetWebhookSecretKeyRequest({
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
    return new requests.GetNewWebhookSecretKeyRequest({
      id
    }, {
      qiwi: this
    }).send()
  }

  sendTestWebhookUpdate() {
    return new requests.SendTestWebhookUpdateRequest({
      qiwi: this
    }).send()
  }

  processUpdate(params, callback) {
    const update = types.Update.fromParams(params, {
      qiwi: this
    })
    if (callback) {
      callback(update)
    }
    return update
  }
}
QIWI.URL = 'https://qiwi.com'
QIWI.API_URL = 'https://edge.qiwi.com'
QIWI.WEBHOOK_SUBNETS = [
  '79.142.16.0/20',
  '195.189.100.0/22',
  '91.232.230.0/23',
  '91.213.51.0/24'
]
QIWI.settings = {
  ignoreErrors: false
}
QIWI.types = types
QIWI.requests = requests
QIWI.errors = errors
QIWI.constants = constants
QIWI.getCurrencyByCode = code => {
  const currency = Object.entries(constants.CurrencyCode).find(([key, value]) => value === code || parseInt(value) === code)
  return currency ? currency[0] : null
}
QIWI.getProviderTypeById = id => {
  const provider = Object.entries(constants.ProviderId).find(([key, value]) => value === id || parseInt(value) === id)
  return provider ? provider[0] : null
}
QIWI.getPaymentFormUrl = (providerId, options = {}) => {
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
    params.append('currency', constants.CurrencyCode[options.currency] || options.currency)
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
QIWI.getQIWIWalletPaymentFormUrl = (phoneNumber, options = {}) => QIWI.getPaymentFormUrl(constants.ProviderId.QIWI_WALLET, {
  disableEditAccount: options.disableEditPhoneNumber,
  ...options,
  account: phoneNumber
})
QIWI.getQIWIWalletByNicknamePaymentFormUrl = (nickname, options = {}) => QIWI.getPaymentFormUrl(constants.ProviderId.QIWI_WALLET_NICKNAME, {
  disableEditAccount: options.disableEditNickname,
  ...options,
  account: nickname.toUpperCase()
})
QIWI.verifyWebhookUpdateSignature = (params, secretKey) => {
  const fields = params.payment.signFields.split(',').map(path => Helper.get(params.payment, path)).join('|')
  const signature = crypto.createHmac('sha256', Buffer.from(secretKey, 'base64')).update(fields).digest('hex')
  return signature === params.hash
}
QIWI.from = (token, options) => new QIWI(token, options)
Object.defineProperty(QIWI, 'Response', {
  get: () => types.Response
})
Object.defineProperty(QIWI, 'Profile', {
  get: () => types.Profile
})
Object.defineProperty(QIWI, 'AuthInfo', {
  get: () => types.AuthInfo
})
Object.defineProperty(QIWI, 'ContractInfo', {
  get: () => types.ContractInfo
})
Object.defineProperty(QIWI, 'UserInfo', {
  get: () => types.UserInfo
})
Object.defineProperty(QIWI, 'PassInfo', {
  get: () => types.PassInfo
})
Object.defineProperty(QIWI, 'PinInfo', {
  get: () => types.PinInfo
})
Object.defineProperty(QIWI, 'MobilePinInfo', {
  get: () => types.MobilePinInfo
})
Object.defineProperty(QIWI, 'EmailSettings', {
  get: () => types.EmailSettings
})
Object.defineProperty(QIWI, 'NicknameInfo', {
  get: () => types.NicknameInfo
})
Object.defineProperty(QIWI, 'IdentificationInfo', {
  get: () => types.IdentificationInfo
})
Object.defineProperty(QIWI, 'Price', {
  get: () => types.Price
})
Object.defineProperty(QIWI, 'SmsNotification', {
  get: () => types.SmsNotification
})
Object.defineProperty(QIWI, 'PriorityPackage', {
  get: () => types.PriorityPackage
})
Object.defineProperty(QIWI, 'Identification', {
  get: () => types.Identification
})
Object.defineProperty(QIWI, 'WalletLimit', {
  get: () => types.WalletLimit
})
Object.defineProperty(QIWI, 'WalletRestriction', {
  get: () => types.WalletRestriction
})
Object.defineProperty(QIWI, 'Payments', {
  get: () => types.Payments
})
Object.defineProperty(QIWI, 'Transaction', {
  get: () => types.Transaction
})
Object.defineProperty(QIWI, 'Provider', {
  get: () => types.Provider
})
Object.defineProperty(QIWI, 'PaymentView', {
  get: () => types.PaymentView
})
Object.defineProperty(QIWI, 'CurrencyAmount', {
  get: () => types.CurrencyAmount
})
Object.defineProperty(QIWI, 'PaymentsStats', {
  get: () => types.PaymentsStats
})
Object.defineProperty(QIWI, 'Account', {
  get: () => types.Account
})
Object.defineProperty(QIWI, 'AccountOffer', {
  get: () => types.AccountOffer
})
Object.defineProperty(QIWI, 'PaymentMethod', {
  get: () => types.PaymentMethod
})
Object.defineProperty(QIWI, 'PaymentCommissionRates', {
  get: () => types.PaymentCommissionRates
})
Object.defineProperty(QIWI, 'PaymentDetails', {
  get: () => types.PaymentDetails
})
Object.defineProperty(QIWI, 'PaymentDetailsInternationalCardTransfer', {
  get: () => types.PaymentDetailsInternationalCardTransfer
})
Object.defineProperty(QIWI, 'PaymentDetailsBankTransfer', {
  get: () => types.PaymentDetailsBankTransfer
})
Object.defineProperty(QIWI, 'PaymentDetailsBankDetailsTransfer', {
  get: () => types.PaymentDetailsBankDetailsTransfer
})
Object.defineProperty(QIWI, 'PaymentRequest', {
  get: () => types.PaymentRequest
})
Object.defineProperty(QIWI, 'CrossRate', {
  get: () => types.CrossRate
})
Object.defineProperty(QIWI, 'WebhookInfo', {
  get: () => types.WebhookInfo
})
Object.defineProperty(QIWI, 'Update', {
  get: () => types.Update
})
Object.defineProperty(QIWI, 'Payment', {
  get: () => types.Payment
})
Object.defineProperty(QIWI, 'GetMeRequest', {
  get: () => requests.GetMeRequest
})
Object.defineProperty(QIWI, 'VerifyIdentificationRequest', {
  get: () => requests.VerifyIdentificationRequest
})
Object.defineProperty(QIWI, 'GetIdentificationInfoRequest', {
  get: () => requests.GetIdentificationInfoRequest
})
Object.defineProperty(QIWI, 'GetWalletLimitsRequest', {
  get: () => requests.GetWalletLimitsRequest
})
Object.defineProperty(QIWI, 'GetWalletRestrictionsRequest', {
  get: () => requests.GetWalletRestrictionsRequest
})
Object.defineProperty(QIWI, 'GetPaymentsRequest', {
  get: () => requests.GetPaymentsRequest
})
Object.defineProperty(QIWI, 'GetPaymentsStatsRequest', {
  get: () => requests.GetPaymentsStatsRequest
})
Object.defineProperty(QIWI, 'GetTransactionRequest', {
  get: () => requests.GetTransactionRequest
})
Object.defineProperty(QIWI, 'DownloadTransactionChequeRequest', {
  get: () => requests.DownloadTransactionChequeRequest
})
Object.defineProperty(QIWI, 'SendTransactionChequeToEmailRequest', {
  get: () => requests.SendTransactionChequeToEmailRequest
})
Object.defineProperty(QIWI, 'GetAccountsRequest', {
  get: () => requests.GetAccountsRequest
})
Object.defineProperty(QIWI, 'GetAccountRequest', {
  get: () => requests.GetAccountRequest
})
Object.defineProperty(QIWI, 'CreateAccountRequest', {
  get: () => requests.CreateAccountRequest
})
Object.defineProperty(QIWI, 'GetAccountOffersRequest', {
  get: () => requests.GetAccountOffersRequest
})
Object.defineProperty(QIWI, 'MarkAccountDefaultRequest', {
  get: () => requests.MarkAccountDefaultRequest
})
Object.defineProperty(QIWI, 'GetNicknameInfoRequest', {
  get: () => requests.GetNicknameInfoRequest
})
Object.defineProperty(QIWI, 'GetPaymentCommissionRatesRequest', {
  get: () => requests.GetPaymentCommissionRatesRequest
})
Object.defineProperty(QIWI, 'SendPaymentRequest', {
  get: () => requests.SendPaymentRequest
})
Object.defineProperty(QIWI, 'GetCrossRatesRequest', {
  get: () => requests.GetCrossRatesRequest
})
Object.defineProperty(QIWI, 'DetectMobileProviderRequest', {
  get: () => requests.DetectMobileProviderRequest
})
Object.defineProperty(QIWI, 'DetectCardProviderRequest', {
  get: () => requests.DetectCardProviderRequest
})
Object.defineProperty(QIWI, 'SearchProviderRequest', {
  get: () => requests.SearchProviderRequest
})
Object.defineProperty(QIWI, 'SetWebhookRequest', {
  get: () => requests.SetWebhookRequest
})
Object.defineProperty(QIWI, 'GetWebhookInfoRequest', {
  get: () => requests.GetWebhookInfoRequest
})
Object.defineProperty(QIWI, 'DeleteWebhookRequest', {
  get: () => requests.DeleteWebhookRequest
})
Object.defineProperty(QIWI, 'GetWebhookSecretKeyRequest', {
  get: () => requests.GetWebhookSecretKeyRequest
})
Object.defineProperty(QIWI, 'GetNewWebhookSecretKeyRequest', {
  get: () => requests.GetNewWebhookSecretKeyRequest
})
Object.defineProperty(QIWI, 'SendTestWebhookUpdateRequest', {
  get: () => requests.SendTestWebhookUpdateRequest
})
Object.defineProperty(QIWI, 'Error', {
  get: () => errors.Error
})
Object.defineProperty(QIWI, 'BadRequestError', {
  get: () => errors.BadRequestError
})
Object.defineProperty(QIWI, 'UnauthorizedError', {
  get: () => errors.UnauthorizedError
})
Object.defineProperty(QIWI, 'InvalidAuthTokenError', {
  get: () => errors.InvalidAuthTokenError
})
Object.defineProperty(QIWI, 'ForbiddenError', {
  get: () => errors.ForbiddenError
})
Object.defineProperty(QIWI, 'NotFoundError', {
  get: () => errors.NotFoundError
})
Object.defineProperty(QIWI, 'AccountNotFoundError', {
  get: () => errors.AccountNotFoundError
})
Object.defineProperty(QIWI, 'TransactionNotFoundError', {
  get: () => errors.TransactionNotFoundError
})
Object.defineProperty(QIWI, 'WebhookNotFoundError', {
  get: () => errors.WebhookNotFoundError
})
Object.defineProperty(QIWI, 'WebhookAlreadyExistsError', {
  get: () => errors.WebhookAlreadyExistsError
})
Object.defineProperty(QIWI, 'NotEnoughBalanceError', {
  get: () => errors.NotEnoughBalanceError
})
Object.defineProperty(QIWI, 'UnknownError', {
  get: () => errors.UnknownError
})
Object.defineProperty(QIWI, 'EventType', {
  get: () => constants.EventType
})
Object.defineProperty(QIWI, 'CountryCode', {
  get: () => constants.CountryCode
})
Object.defineProperty(QIWI, 'CurrencyCode', {
  get: () => constants.CurrencyCode
})
Object.defineProperty(QIWI, 'IdentificationType', {
  get: () => constants.IdentificationType
})
Object.defineProperty(QIWI, 'WalletOperationType', {
  get: () => constants.WalletOperationType
})
Object.defineProperty(QIWI, 'WalletRestrictionType', {
  get: () => constants.WalletRestrictionType
})
Object.defineProperty(QIWI, 'PaymentType', {
  get: () => constants.PaymentType
})
Object.defineProperty(QIWI, 'PaymentStatus', {
  get: () => constants.PaymentStatus
})
Object.defineProperty(QIWI, 'PaymentSource', {
  get: () => constants.PaymentSource
})
Object.defineProperty(QIWI, 'TransactionChequeMimeType', {
  get: () => constants.TransactionChequeMimeType
})
Object.defineProperty(QIWI, 'AccountType', {
  get: () => constants.AccountType
})
Object.defineProperty(QIWI, 'ProviderId', {
  get: () => constants.ProviderId
})
Object.defineProperty(QIWI, 'PaymentMethodType', {
  get: () => constants.PaymentMethodType
})

module.exports = QIWI
