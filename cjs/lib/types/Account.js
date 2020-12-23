const Helper = require('@darkwolf/helper.cjs')
const { AccountType } = require('../constants')

let _QIWI
const QIWI = () => {
  if (!_QIWI) {
    _QIWI = require('../')
  }
  return _QIWI
}

class Account {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setAlias(data.alias)
      .setFundingSourceAlias(data.fundingSourceAlias)
      .setBankAlias(data.bankAlias)
      .setType(data.type)
      .setTitle(data.title)
      .setDescription(data.description)
      .setCurrency(data.currency)
      .setBalance(data.balance)
      .setHasBalance(data.hasBalance)
      .setDefault(data.default)
  }

  get isWallet() {
    return this.type === AccountType.WALLET
  }

  get isMc() {
    return this.type === AccountType.MC
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAlias(alias) {
    this.alias = alias
    return this
  }

  setFundingSourceAlias(alias) {
    this.fundingSourceAlias = alias
    return this
  }

  setBankAlias(alias) {
    this.bankAlias = alias
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setBalance(amount) {
    this.balance = amount
    return this
  }

  setHasBalance(boolean) {
    this.hasBalance = boolean
    return this
  }

  setDefault(boolean) {
    this.default = boolean
    return this
  }

  get() {
    return this.context.qiwi.getAccount(this.alias)
  }

  markDefault() {
    return this.context.qiwi.markAccountDefault(this.alias)
  }

  toJSON() {
    const data = {}
    if (this.alias) {
      data.alias = this.alias
    }
    if (this.fundingSourceAlias) {
      data.fundingSourceAlias = this.fundingSourceAlias
    }
    if (this.bankAlias) {
      data.bankAlias = this.bankAlias
    }
    if (this.type) {
      data.type = this.type
    }
    if (Helper.exists(this.title)) {
      data.title = this.title
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    if (this.currency) {
      data.currency = this.currency
    }
    if (Helper.exists(this.balance)) {
      data.balance = this.balance
    }
    if (Helper.exists(this.hasBalance)) {
      data.hasBalance = this.hasBalance
    }
    if (Helper.exists(this.default)) {
      data.default = this.default
    }
    return data
  }
}
Account.fromParams = (params = {}, context) => {
  const data = {
    alias: params.alias,
    fundingSourceAlias: params.fundingSourceAlias,
    bankAlias: params.bankAlias,
    title: params.title,
    currency: params.currency,
    hasBalance: params.hasBalance,
    default: params.defaultAccount
  }
  if (params.type) {
    data.type = params.type.id
    data.description = params.type.title
  }
  if (params.balance) {
    data.balance = params.balance.amount
  }
  if (data.type) {
    data.type = data.type.toLowerCase()
  }
  if (data.currency) {
    data.currency = QIWI().getCurrencyByCode(data.currency)
  } else if (data.alias) {
    const currency = data.alias.split('_').slice(-1)[0]
    data.currency = currency.toUpperCase()
  }
  return new Account(data, context)
}
Account.from = (data, context) => new Account(data, context)

module.exports = Account
