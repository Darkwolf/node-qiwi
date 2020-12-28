let _QIWI
const QIWI = () => {
  if (!_QIWI) {
    _QIWI = require('../')
  }
  return _QIWI
}

class UserInfo {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setOperator(data.operator)
      .setFirstTransactionId(data.firstTransactionId)
      .setDefaultPayCurrency(data.defaultPayCurrency)
      .setDefaultPaySource(data.defaultPaySource)
      .setDefaultAccountAlias(data.defaultPayAccountAlias)
      .setLanguage(data.language)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setOperator(operator) {
    this.operator = operator
    return this
  }

  setFirstTransactionId(id) {
    this.firstTransactionId = id
    return this
  }

  setDefaultPayCurrency(currency) {
    this.defaultPayCurrency = currency
    return this
  }

  setDefaultPaySource(source) {
    this.defaultPaySource = source
    return this
  }

  setDefaultAccountAlias(alias) {
    this.defaultPayAccountAlias = alias
    return this
  }

  setLanguage(language) {
    this.language = language
    return this
  }

  get() {
    return this.context.qiwi.getUserInfo()
  }

  toJSON() {
    const data = {}
    if (this.operator) {
      data.operator = this.operator
    }
    if (this.firstTransactionId) {
      data.firstTransactionId = this.firstTransactionId
    }
    if (this.defaultPayCurrency) {
      data.defaultPayCurrency = this.defaultPayCurrency
    }
    if (this.defaultPaySource) {
      data.defaultPaySource = this.defaultPaySource
    }
    if (this.defaultPayAccountAlias) {
      data.defaultPayAccountAlias = this.defaultPayAccountAlias
    }
    if (this.language) {
      data.language = this.language
    }
    return data
  }
}
UserInfo.fromParams = (params = {}, context) => {
  const data = {
    operator: params.operator,
    firstTransactionId: params.firstTxnId,
    defaultPayCurrency: params.defaultPayCurrency,
    defaultPaySource: params.defaultPaySource,
    defaultPayAccountAlias: params.defaultPayAccountAlias,
    language: params.language
  }
  if (data.defaultPayCurrency) {
    data.defaultPayCurrency = QIWI().getCurrencyByCode(data.defaultPayCurrency)
  }
  return new UserInfo(data, context)
}
UserInfo.from = (data, context) => new UserInfo(data, context)

module.exports = UserInfo
