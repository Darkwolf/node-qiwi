const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class PaymentDetailsInternationalCardTransfer extends types.PaymentDetails {
  constructor(options = {}) {
    super(options)
    this
      .setSenderFirstName(options.senderFirstName)
      .setSenderLastName(options.senderLastName)
      .setSenderCountry(options.senderCountry)
      .setSenderCity(options.senderCity)
      .setSenderAddress(options.senderAddress)
      .setReceiverFirstName(options.receiverFirstName)
      .setReceiverLastName(options.receiverLastName)
  }

  setSenderFirstName(firstName) {
    this.senderFirstName = firstName
    return this
  }

  setSenderLastName(lastName) {
    this.senderLastName = lastName
    return this
  }

  setSenderCountry(country) {
    this.senderCountry = country
    return this
  }

  setSenderCity(city) {
    this.senderCity = city
    return this
  }

  setSenderAddress(address) {
    this.senderAddress = address
    return this
  }

  setReceiverFirstName(firstName) {
    this.receiverFirstName = firstName
    return this
  }

  setReceiverLastName(lastName) {
    this.receiverLastName = lastName
    return this
  }

  toParams() {
    const params = {}
    if (this.account) {
      params.account = `${this.account}`
    }
    if (Helper.exists(this.senderFirstName)) {
      params.rem_name = this.senderFirstName
    }
    if (Helper.exists(this.senderLastName)) {
      params.rem_name_f = this.senderLastName
    }
    if (Helper.exists(this.senderCountry)) {
      params.rec_country = this.senderCountry
    }
    if (Helper.exists(this.senderCity)) {
      params.rec_city = this.senderCity
    }
    if (Helper.exists(this.senderAddress)) {
      params.rec_address = this.senderAddress
    }
    if (Helper.exists(this.receiverFirstName)) {
      params.reg_name = this.receiverFirstName
    }
    if (Helper.exists(this.receiverLastName)) {
      params.reg_name_f = this.receiverLastName
    }
    return params
  }

  toJSON() {
    const data = {}
    if (this.account) {
      data.account = this.account
    }
    if (Helper.exists(this.senderFirstName)) {
      data.senderFirstName = this.senderFirstName
    }
    if (Helper.exists(this.senderLastName)) {
      data.senderLastName = this.senderLastName
    }
    if (Helper.exists(this.senderCountry)) {
      data.senderCountry = this.senderCountry
    }
    if (Helper.exists(this.senderCity)) {
      data.senderCity = this.senderCity
    }
    if (Helper.exists(this.senderAddress)) {
      data.senderAddress = this.senderAddress
    }
    if (Helper.exists(this.receiverFirstName)) {
      data.receiverFirstName = this.receiverFirstName
    }
    if (Helper.exists(this.receiverLastName)) {
      data.receiverLastName = this.receiverLastName
    }
    return data
  }
}
PaymentDetailsInternationalCardTransfer.fromParams = (params = {}) => new PaymentDetailsInternationalCardTransfer({
  account: params.account,
  senderFirstName: params.rem_name,
  senderLastName: params.rem_name_f,
  senderCountry: params.rec_country,
  senderCity: params.rec_city,
  senderAddress: params.rec_address,
  receiverFirstName: params.reg_name,
  receiverLastName: params.reg_name_f
})
PaymentDetailsInternationalCardTransfer.from = options => new PaymentDetailsInternationalCardTransfer(options)

module.exports = PaymentDetailsInternationalCardTransfer
