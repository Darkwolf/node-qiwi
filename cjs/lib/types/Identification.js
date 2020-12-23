const Helper = require('@darkwolf/helper.cjs')
const { IdentificationType } = require('../constants')

class Identification {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setType(data.type)
      .setFirstName(data.firstName)
      .setMiddleName(data.middleName)
      .setLastName(data.lastName)
      .setBirthDate(data.birthDate)
      .setPassport(data.passport)
      .setInn(data.inn)
      .setSnils(data.snils)
      .setOms(data.oms)
  }

  get isAnonymous() {
    return this.type === IdentificationType.ANONYMOUS
  }

  get isSimple() {
    return this.type === IdentificationType.SIMPLE
  }

  get isVerified() {
    return this.type === IdentificationType.VERIFIED
  }

  get isFull() {
    return this.type === IdentificationType.FULL
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setType(type) {
    this.type = type
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

  setLastName(lastName) {
    this.lastName = lastName
    return this
  }

  setBirthDate(date) {
    this.birthDate = date
    return this
  }

  setPassport(passport) {
    this.passport = passport
    return this
  }

  setInn(inn) {
    this.inn = inn
    return this
  }

  setSnils(snils) {
    this.snils = snils
    return this
  }

  setOms(oms) {
    this.oms = oms
    return this
  }

  get() {
    return this.context.qiwi.getIdentification()
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.type) {
      data.type = this.type
    }
    if (Helper.exists(this.firstName)) {
      data.firstName = this.firstName
    }
    if (Helper.exists(this.middleName)) {
      data.middleName = this.middleName
    }
    if (Helper.exists(this.lastName)) {
      data.lastName = this.lastName
    }
    if (this.birthDate) {
      data.birthDate = this.birthDate
    }
    if (Helper.exists(this.passport)) {
      data.passport = this.passport
    }
    if (Helper.exists(this.inn)) {
      data.inn = this.inn
    }
    if (Helper.exists(this.snils)) {
      data.snils = this.snils
    }
    if (Helper.exists(this.oms)) {
      data.oms = this.oms
    }
    return data
  }
}
Identification.fromParams = (params = {}, context) => {
  const data = {
    id: params.id,
    type: params.type,
    firstName: params.firstName,
    middleName: params.middleName,
    lastName: params.lastName,
    birthDate: params.birthDate,
    passport: params.passport,
    inn: params.inn,
    snils: params.snils,
    oms: params.oms
  }
  if (data.type) {
    data.type = data.type.toLowerCase()
  }
  return new Identification(data, context)
}
Identification.from = (data, context) => new Identification(data, context)

module.exports = Identification
