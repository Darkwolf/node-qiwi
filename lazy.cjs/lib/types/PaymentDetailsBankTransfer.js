const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class PaymentDetailsBankTransfer extends types.PaymentDetails {
  constructor(options = {}) {
    super(options)
    this
      .setAccountType(options.accountType)
      .setAgreementNumber(options.agreementNumber)
      .setExpirationDate(options.expirationDate)
      .setBic(options.bic)
      .setLastName(options.lastName)
      .setFirstName(options.firstName)
      .setMiddleName(options.middleName)
      .setUrgent(options.urgent)
  }

  setAccountType(type) {
    this.accountType = type
    return this
  }

  setAgreementNumber(number) {
    this.agreementNumber = number
    return this
  }

  setExpirationDate(date) {
    this.expirationDate = date
    return this
  }

  setBic(bic) {
    this.bic = bic
    return this
  }

  setLastName(lastName) {
    this.lastName = lastName
    return this
  }

  setFirstName(firstName) {
    this.firstName = firstName
    return this
  }

  setMiddleName(middleName) {
    this.middleName = middleName
    return this
  }

  setUrgent(boolean) {
    this.urgent = boolean
    return this
  }

  toParams() {
    const params = {}
    if (this.account) {
      params.account = `${this.account}`
    }
    if (this.accountType) {
      params.account_type = `${this.accountType}`
    }
    if (this.agreementNumber) {
      params.agrnum = `${this.agreementNumber}`
    }
    if (this.expirationDate) {
      const match = this.expirationDate.match(/^\d{2}(?<year>\d{2})-(?<month>\d{2})$/)
      params.exp_date = `${match.groups.month}${match.groups.year}`
    }
    if (this.bic) {
      params.mfo = this.bic
    }
    if (Helper.exists(this.lastName)) {
      params.lname = this.lastName
    }
    if (Helper.exists(this.firstName)) {
      params.fname = this.firstName
    }
    if (Helper.exists(this.middleName)) {
      params.mname = this.middleName
    }
    if (Helper.exists(this.urgent)) {
      params.urgent = `${Number(this.urgent)}`
    }
    return params
  }

  toJSON() {
    const data = {}
    if (this.account) {
      data.account = this.account
    }
    if (this.accountType) {
      data.accountType = this.accountType
    }
    if (this.agreementNumber) {
      data.agreementNumber = this.agreementNumber
    }
    if (this.expirationDate) {
      data.expirationDate = this.expirationDate
    }
    if (this.bic) {
      data.bic = this.bic
    }
    if (Helper.exists(this.lastName)) {
      data.lastName = this.lastName
    }
    if (Helper.exists(this.firstName)) {
      data.firstName = this.firstName
    }
    if (Helper.exists(this.middleName)) {
      data.middleName = this.middleName
    }
    if (Helper.exists(this.urgent)) {
      data.urgent = this.urgent
    }
    return data
  }
}
PaymentDetailsBankTransfer.fromParams = (params = {}) => {
  const data = {
    account: params.account,
    accountType: params.account_type,
    agreementNumber: params.agrnum,
    expirationDate: params.exp_date,
    bic: params.mfo,
    lastName: params.lname,
    firstName: params.fname,
    middleName: params.mname,
    urgent: params.urgent
  }
  if (data.agreementNumber) {
    data.agreementNumber = parseInt(data.agreementNumber)
  }
  if (data.expirationDate) {
    const match = data.expirationDate.match(/^(?<month>\d{2})(?<year>\d{2})$/)
    if (match) {
      data.expirationDate = `20${match.groups.year}-${match.groups.month}`
    }
  }
  if (data.urgent) {
    data.urgent = data.urgent === '1'
  }
  return new PaymentDetailsBankTransfer(data)
}
PaymentDetailsBankTransfer.from = options => new PaymentDetailsBankTransfer(options)

module.exports = PaymentDetailsBankTransfer
