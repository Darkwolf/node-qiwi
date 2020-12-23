import Helper from '@darkwolf/helper.mjs'

export default class EmailSettings {
  static fromParams(params = {}, context) {
    const data = {
      useForSecurity: params['use-for-security'],
      useForPromo: params['use-for-promo']
    }
    if (data.useForSecurity) {
      data.useForSecurity = data.useForSecurity === 'true'
    }
    if (data.useForPromo) {
      data.useForPromo = data.useForPromo === 'true'
    }
    return new EmailSettings(data, context)
  }

  static from(data, context) {
    return new EmailSettings(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setUseForSecurity(data.useForSecurity)
      .setUseForPromo(data.useForPromo)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUseForSecurity(boolean) {
    this.useForSecurity = boolean
    return this
  }

  setUseForPromo(boolean) {
    this.useForPromo = boolean
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.useForSecurity)) {
      data.useForSecurity = this.useForSecurity
    }
    if (Helper.exists(this.useForPromo)) {
      data.useForPromo = this.useForPromo
    }
    return data
  }
}
