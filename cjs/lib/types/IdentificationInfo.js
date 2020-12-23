const Helper = require('@darkwolf/helper.cjs')
const { IdentificationType } = require('../constants')

class IdentificationInfo {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setType(data.type)
      .setBankAlias(data.bankAlias)
      .setPassportExpired(data.passportExpired)
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

  setType(type) {
    this.type = type
    return this
  }

  setBankAlias(alias) {
    this.bankAlias = alias
    return this
  }

  setPassportExpired(boolean) {
    this.passportExpired = boolean
    return this
  }

  toJSON() {
    const data = {}
    if (this.type) {
      data.type = this.type
    }
    if (this.bankAlias) {
      data.bankAlias = this.bankAlias
    }
    if (Helper.exists(this.passportExpired)) {
      data.passportExpired = this.passportExpired
    }
    return data
  }
}
IdentificationInfo.fromParams = (params = {}, context) => {
  const data = {
    type: params.identificationLevel,
    bankAlias: params.bankAlias,
    passportExpired: params.passportExpired
  }
  if (data.type) {
    data.type = data.type.toLowerCase()
  }
  return new IdentificationInfo(data, context)
}
IdentificationInfo.from = (data, context) => new IdentificationInfo(data, context)

module.exports = IdentificationInfo
