class Requests {}
Object.defineProperty(Requests, 'GetMeRequest', {
  get: () => {
    if (!Requests._GetMeRequest) {
      Requests._GetMeRequest = require('./GetMeRequest')
    }
    return Requests._GetMeRequest
  }
})
Object.defineProperty(Requests, 'VerifyIdentificationRequest', {
  get: () => {
    if (!Requests._VerifyIdentificationRequest) {
      Requests._VerifyIdentificationRequest = require('./VerifyIdentificationRequest')
    }
    return Requests._VerifyIdentificationRequest
  }
})
Object.defineProperty(Requests, 'GetIdentificationInfoRequest', {
  get: () => {
    if (!Requests._GetIdentificationInfoRequest) {
      Requests._GetIdentificationInfoRequest = require('./GetIdentificationInfoRequest')
    }
    return Requests._GetIdentificationInfoRequest
  }
})
Object.defineProperty(Requests, 'GetWalletLimitsRequest', {
  get: () => {
    if (!Requests._GetWalletLimitsRequest) {
      Requests._GetWalletLimitsRequest = require('./GetWalletLimitsRequest')
    }
    return Requests._GetWalletLimitsRequest
  }
})
Object.defineProperty(Requests, 'GetWalletRestrictionsRequest', {
  get: () => {
    if (!Requests._GetWalletRestrictionsRequest) {
      Requests._GetWalletRestrictionsRequest = require('./GetWalletRestrictionsRequest')
    }
    return Requests._GetWalletRestrictionsRequest
  }
})
Object.defineProperty(Requests, 'GetPaymentsRequest', {
  get: () => {
    if (!Requests._GetPaymentsRequest) {
      Requests._GetPaymentsRequest = require('./GetPaymentsRequest')
    }
    return Requests._GetPaymentsRequest
  }
})
Object.defineProperty(Requests, 'GetPaymentsStatsRequest', {
  get: () => {
    if (!Requests._GetPaymentsStatsRequest) {
      Requests._GetPaymentsStatsRequest = require('./GetPaymentsStatsRequest')
    }
    return Requests._GetPaymentsStatsRequest
  }
})
Object.defineProperty(Requests, 'GetTransactionRequest', {
  get: () => {
    if (!Requests._GetTransactionRequest) {
      Requests._GetTransactionRequest = require('./GetTransactionRequest')
    }
    return Requests._GetTransactionRequest
  }
})
Object.defineProperty(Requests, 'DownloadTransactionChequeRequest', {
  get: () => {
    if (!Requests._DownloadTransactionChequeRequest) {
      Requests._DownloadTransactionChequeRequest = require('./DownloadTransactionChequeRequest')
    }
    return Requests._DownloadTransactionChequeRequest
  }
})
Object.defineProperty(Requests, 'SendTransactionChequeToEmailRequest', {
  get: () => {
    if (!Requests._SendTransactionChequeToEmailRequest) {
      Requests._SendTransactionChequeToEmailRequest = require('./SendTransactionChequeToEmailRequest')
    }
    return Requests._SendTransactionChequeToEmailRequest
  }
})
Object.defineProperty(Requests, 'GetAccountsRequest', {
  get: () => {
    if (!Requests._GetAccountsRequest) {
      Requests._GetAccountsRequest = require('./GetAccountsRequest')
    }
    return Requests._GetAccountsRequest
  }
})
Object.defineProperty(Requests, 'GetAccountRequest', {
  get: () => {
    if (!Requests._GetAccountRequest) {
      Requests._GetAccountRequest = require('./GetAccountRequest')
    }
    return Requests._GetAccountRequest
  }
})
Object.defineProperty(Requests, 'CreateAccountRequest', {
  get: () => {
    if (!Requests._CreateAccountRequest) {
      Requests._CreateAccountRequest = require('./CreateAccountRequest')
    }
    return Requests._CreateAccountRequest
  }
})
Object.defineProperty(Requests, 'GetAccountOffersRequest', {
  get: () => {
    if (!Requests._GetAccountOffersRequest) {
      Requests._GetAccountOffersRequest = require('./GetAccountOffersRequest')
    }
    return Requests._GetAccountOffersRequest
  }
})
Object.defineProperty(Requests, 'MarkAccountDefaultRequest', {
  get: () => {
    if (!Requests._MarkAccountDefaultRequest) {
      Requests._MarkAccountDefaultRequest = require('./MarkAccountDefaultRequest')
    }
    return Requests._MarkAccountDefaultRequest
  }
})
Object.defineProperty(Requests, 'GetNicknameInfoRequest', {
  get: () => {
    if (!Requests._GetNicknameInfoRequest) {
      Requests._GetNicknameInfoRequest = require('./GetNicknameInfoRequest')
    }
    return Requests._GetNicknameInfoRequest
  }
})
Object.defineProperty(Requests, 'GetPaymentCommissionRatesRequest', {
  get: () => {
    if (!Requests._GetPaymentCommissionRatesRequest) {
      Requests._GetPaymentCommissionRatesRequest = require('./GetPaymentCommissionRatesRequest')
    }
    return Requests._GetPaymentCommissionRatesRequest
  }
})
Object.defineProperty(Requests, 'SendPaymentRequest', {
  get: () => {
    if (!Requests._SendPaymentRequest) {
      Requests._SendPaymentRequest = require('./SendPaymentRequest')
    }
    return Requests._SendPaymentRequest
  }
})
Object.defineProperty(Requests, 'GetCrossRatesRequest', {
  get: () => {
    if (!Requests._GetCrossRatesRequest) {
      Requests._GetCrossRatesRequest = require('./GetCrossRatesRequest')
    }
    return Requests._GetCrossRatesRequest
  }
})
Object.defineProperty(Requests, 'DetectMobileProviderRequest', {
  get: () => {
    if (!Requests._DetectMobileProviderRequest) {
      Requests._DetectMobileProviderRequest = require('./DetectMobileProviderRequest')
    }
    return Requests._DetectMobileProviderRequest
  }
})
Object.defineProperty(Requests, 'DetectCardProviderRequest', {
  get: () => {
    if (!Requests._DetectCardProviderRequest) {
      Requests._DetectCardProviderRequest = require('./DetectCardProviderRequest')
    }
    return Requests._DetectCardProviderRequest
  }
})
Object.defineProperty(Requests, 'SearchProviderRequest', {
  get: () => {
    if (!Requests._SearchProviderRequest) {
      Requests._SearchProviderRequest = require('./SearchProviderRequest')
    }
    return Requests._SearchProviderRequest
  }
})
Object.defineProperty(Requests, 'SetWebhookRequest', {
  get: () => {
    if (!Requests._SetWebhookRequest) {
      Requests._SetWebhookRequest = require('./SetWebhookRequest')
    }
    return Requests._SetWebhookRequest
  }
})
Object.defineProperty(Requests, 'GetWebhookInfoRequest', {
  get: () => {
    if (!Requests._GetWebhookInfoRequest) {
      Requests._GetWebhookInfoRequest = require('./GetWebhookInfoRequest')
    }
    return Requests._GetWebhookInfoRequest
  }
})
Object.defineProperty(Requests, 'DeleteWebhookRequest', {
  get: () => {
    if (!Requests._DeleteWebhookRequest) {
      Requests._DeleteWebhookRequest = require('./DeleteWebhookRequest')
    }
    return Requests._DeleteWebhookRequest
  }
})
Object.defineProperty(Requests, 'GetWebhookSecretKeyRequest', {
  get: () => {
    if (!Requests._GetWebhookSecretKeyRequest) {
      Requests._GetWebhookSecretKeyRequest = require('./GetWebhookSecretKeyRequest')
    }
    return Requests._GetWebhookSecretKeyRequest
  }
})
Object.defineProperty(Requests, 'GetNewWebhookSecretKeyRequest', {
  get: () => {
    if (!Requests._GetNewWebhookSecretKeyRequest) {
      Requests._GetNewWebhookSecretKeyRequest = require('./GetNewWebhookSecretKeyRequest')
    }
    return Requests._GetNewWebhookSecretKeyRequest
  }
})
Object.defineProperty(Requests, 'SendTestWebhookUpdateRequest', {
  get: () => {
    if (!Requests._SendTestWebhookUpdateRequest) {
      Requests._SendTestWebhookUpdateRequest = require('./SendTestWebhookUpdateRequest')
    }
    return Requests._SendTestWebhookUpdateRequest
  }
})

module.exports = Requests
