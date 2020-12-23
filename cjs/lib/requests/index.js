const GetMeRequest = require('./GetMeRequest')
const VerifyIdentificationRequest = require('./VerifyIdentificationRequest')
const GetIdentificationInfoRequest = require('./GetIdentificationInfoRequest')
const GetWalletLimitsRequest = require('./GetWalletLimitsRequest')
const GetWalletRestrictionsRequest = require('./GetWalletRestrictionsRequest')
const GetPaymentsRequest = require('./GetPaymentsRequest')
const GetPaymentsStatsRequest = require('./GetPaymentsStatsRequest')
const GetTransactionRequest = require('./GetTransactionRequest')
const DownloadTransactionChequeRequest = require('./DownloadTransactionChequeRequest')
const SendTransactionChequeToEmailRequest = require('./SendTransactionChequeToEmailRequest')
const GetAccountsRequest = require('./GetAccountsRequest')
const GetAccountRequest = require('./GetAccountRequest')
const CreateAccountRequest = require('./CreateAccountRequest')
const GetAccountOffersRequest = require('./GetAccountOffersRequest')
const MarkAccountDefaultRequest = require('./MarkAccountDefaultRequest')
const GetNicknameInfoRequest = require('./GetNicknameInfoRequest')
const GetPaymentCommissionRatesRequest = require('./GetPaymentCommissionRatesRequest')
const SendPaymentRequest = require('./SendPaymentRequest')
const GetCrossRatesRequest = require('./GetCrossRatesRequest')
const DetectMobileProviderRequest = require('./DetectMobileProviderRequest')
const DetectCardProviderRequest = require('./DetectCardProviderRequest')
const SearchProviderRequest = require('./SearchProviderRequest')
const SetWebhookRequest = require('./SetWebhookRequest')
const GetWebhookInfoRequest = require('./GetWebhookInfoRequest')
const DeleteWebhookRequest = require('./DeleteWebhookRequest')
const GetWebhookSecretKeyRequest = require('./GetWebhookSecretKeyRequest')
const GetNewWebhookSecretKeyRequest = require('./GetNewWebhookSecretKeyRequest')
const SendTestWebhookUpdateRequest = require('./SendTestWebhookUpdateRequest')

class Requests {}
Requests.GetMeRequest = GetMeRequest
Requests.VerifyIdentificationRequest = VerifyIdentificationRequest
Requests.GetIdentificationInfoRequest = GetIdentificationInfoRequest
Requests.GetWalletLimitsRequest = GetWalletLimitsRequest
Requests.GetWalletRestrictionsRequest = GetWalletRestrictionsRequest
Requests.GetPaymentsRequest = GetPaymentsRequest
Requests.GetPaymentsStatsRequest = GetPaymentsStatsRequest
Requests.GetTransactionRequest = GetTransactionRequest
Requests.DownloadTransactionChequeRequest = DownloadTransactionChequeRequest
Requests.SendTransactionChequeToEmailRequest = SendTransactionChequeToEmailRequest
Requests.GetAccountsRequest = GetAccountsRequest
Requests.GetAccountRequest = GetAccountRequest
Requests.CreateAccountRequest = CreateAccountRequest
Requests.GetAccountOffersRequest = GetAccountOffersRequest
Requests.MarkAccountDefaultRequest = MarkAccountDefaultRequest
Requests.GetNicknameInfoRequest = GetNicknameInfoRequest
Requests.GetPaymentCommissionRatesRequest = GetPaymentCommissionRatesRequest
Requests.SendPaymentRequest = SendPaymentRequest
Requests.GetCrossRatesRequest = GetCrossRatesRequest
Requests.DetectMobileProviderRequest = DetectMobileProviderRequest
Requests.DetectCardProviderRequest = DetectCardProviderRequest
Requests.SearchProviderRequest = SearchProviderRequest
Requests.SetWebhookRequest = SetWebhookRequest
Requests.GetWebhookInfoRequest = GetWebhookInfoRequest
Requests.DeleteWebhookRequest = DeleteWebhookRequest
Requests.GetWebhookSecretKeyRequest = GetWebhookSecretKeyRequest
Requests.GetNewWebhookSecretKeyRequest = GetNewWebhookSecretKeyRequest
Requests.SendTestWebhookUpdateRequest = SendTestWebhookUpdateRequest

module.exports = Requests