const Helper = require('@darkwolf/helper.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class VerifyIdentificationRequest {
  constructor(parameters = {}, context) {
    this.method = VerifyIdentificationRequest.method
    this.authRequired = VerifyIdentificationRequest.authRequired
    this
      .setContext(context)
      .setFirstName(parameters.firstName)
      .setMiddleName(parameters.middleName)
      .setLastName(parameters.lastName)
      .setBirthDate(parameters.birthDate)
      .setPassport(parameters.passport)
      .setInn(parameters.inn)
      .setSnils(parameters.snils)
      .setOms(parameters.oms)
  }

  get endpoint() {
    return `/identification/v1/persons/${this.context.qiwi.phoneNumber.slice(1)}/identification`
  }

  setContext(context = {}) {
    this.context = context
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

  toParams() {
    const params = {}
    if (Helper.exists(this.firstName)) {
      params.firstName = this.firstName
    }
    if (Helper.exists(this.middleName)) {
      params.middleName = this.middleName
    }
    if (Helper.exists(this.lastName)) {
      params.lastName = this.lastName
    }
    if (this.birthDate) {
      params.birthDate = this.birthDate
    }
    if (Helper.exists(this.passport)) {
      params.passport = `${this.passport}`
    }
    if (Helper.exists(this.inn)) {
      params.inn = `${this.inn}`
    }
    if (Helper.exists(this.snils)) {
      params.snils = `${this.snils}`
    }
    if (Helper.exists(this.oms)) {
      params.oms = `${this.oms}`
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(types.Identification.fromParams(response.result, this.context))
        this.context.qiwi.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new errors.UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(constants.EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
VerifyIdentificationRequest.method = 'POST'
VerifyIdentificationRequest.authRequired = true
VerifyIdentificationRequest.from = (parameters, context) => new VerifyIdentificationRequest(parameters, context)

module.exports = VerifyIdentificationRequest
