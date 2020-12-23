import Helper from '@darkwolf/helper.mjs'
import PaymentDetails from './PaymentDetails.mjs'

export default class PaymentDetailsBankDetailsTransfer extends PaymentDetails {
  static fromParams(params = {}) {
    const data = {
      account: params.account,
      bankName: params.name,
      bic: params.to_bik || params.extra_to_bik,
      organizationName: params.to_name,
      inn: params.to_inn,
      kpp: params.to_kpp,
      city: params.city,
      description: params.info,
      nds: params.nds,
      purpose: params.goal,
      senderLastName: params.from_name_f,
      senderFirstName: params.from_name,
      senderMiddleName: params.from_name_p,
      commercial: params.is_commercial,
      urgent: params.urgent
    }
    if (data.commercial) {
      data.commercial = data.commercial === '1'
    }
    if (data.urgent) {
      data.urgent = data.urgent === '1'
    }
    return new PaymentDetailsBankDetailsTransfer(data)
  }

  static from(options) {
    return new PaymentDetailsBankDetailsTransfer(options)
  }

  constructor(options = {}) {
    super(options)
    this
      .setBankName(options.bankName)
      .setBic(options.bic)
      .setOrganizationName(options.organizationName)
      .setInn(options.inn)
      .setKpp(options.kpp)
      .setCity(options.city)
      .setDescription(options.description)
      .setNds(options.nds)
      .setPurpose(options.purpose)
      .setSenderLastName(options.senderLastName)
      .setSenderFirstName(options.senderFirstName)
      .setSenderMiddleName(options.senderMiddleName)
      .setCommercial(options.commercial)
      .setUrgent(options.urgent)
  }

  setBankName(name) {
    this.bankName = name
    return this
  }

  setBic(bic) {
    this.bic = bic
    return this
  }

  setOrganizationName(name) {
    this.organizationName = name
    return this
  }

  setInn(inn) {
    this.inn = inn
    return this
  }

  setKpp(kpp) {
    this.kpp = kpp
    return this
  }

  setCity(city) {
    this.city = city
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  setNds(nds) {
    this.nds = nds
    return this
  }

  setPurpose(purpose) {
    this.purpose = purpose
    return this
  }

  setSenderLastName(lastName) {
    this.senderLastName = lastName
    return this
  }

  setSenderFirstName(firstName) {
    this.senderFirstName = firstName
    return this
  }

  setSenderMiddleName(middleName) {
    this.senderMiddleName = middleName
    return this
  }

  setCommercial(boolean) {
    this.commercial = boolean
    return this
  }

  setUrgent(boolean) {
    this.urgent = boolean
    return this
  }

  toParams() {
    const params = {
      requestProtocol: 'qw1',
      toServiceId: '1717'
    }
    if (this.account) {
      params.account = `${this.account}`
    }
    if (Helper.exists(this.bankName)) {
      params.name = this.bankName
    }
    if (this.bic) {
      params.to_bik = this.bic
      params.extra_to_bik = this.bic
    }
    if (Helper.exists(this.organizationName)) {
      params.to_name = this.organizationName
    }
    if (this.inn) {
      params.inn = `${this.inn}`
    }
    if (this.kpp) {
      params.kpp = `${this.kpp}`
    }
    if (Helper.exists(this.city)) {
      params.city = this.city
    }
    if (Helper.exists(this.description)) {
      params.info = this.description
    }
    if (Helper.exists(this.nds)) {
      params.nds = this.nds
    }
    if (Helper.exists(this.purpose)) {
      params.goal = this.purpose
    }
    if (Helper.exists(this.senderLastName)) {
      params.from_name_f = this.senderLastName
    }
    if (Helper.exists(this.senderFirstName)) {
      params.from_name = senderFirstName
    }
    if (Helper.exists(this.senderMiddleName)) {
      params.from_name_p = this.senderMiddleName
    }
    if (Helper.exists(this.commercial)) {
      params.is_commercial = `${Number(this.commercial)}`
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
    if (Helper.exists(this.bankName)) {
      data.bankName = this.bankName
    }
    if (this.bic) {
      data.bic = this.bic
    }
    if (Helper.exists(this.organizationName)) {
      data.organizationName = this.organizationName
    }
    if (this.inn) {
      data.inn = this.inn
    }
    if (this.kpp) {
      data.kpp = this.kpp
    }
    if (Helper.exists(this.city)) {
      data.city = this.city
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    if (Helper.exists(this.nds)) {
      data.nds = this.nds
    }
    if (Helper.exists(this.purpose)) {
      data.purpose = this.purpose
    }
    if (Helper.exists(this.senderLastName)) {
      data.senderLastName = this.senderLastName
    }
    if (Helper.exists(this.senderFirstName)) {
      data.senderFirstName = this.senderFirstName
    }
    if (Helper.exists(this.senderMiddleName)) {
      data.senderMiddleName = this.senderMiddleName
    }
    if (Helper.exists(this.commercial)) {
      data.commercial = this.commercial
    }
    if (Helper.exists(this.urgent)) {
      data.urgent = this.urgent
    }
    return data
  }
}
