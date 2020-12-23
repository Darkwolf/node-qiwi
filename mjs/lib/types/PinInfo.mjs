import Helper from '@darkwolf/helper.mjs'

export default class PinInfo {
  static fromParams(params = {}, context) {
    return new PinInfo({
      used: params.pinUsed
    }, context)
  }

  static from(data, context) {
    return new PinInfo(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setUsed(data.used)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUsed(boolean) {
    this.used = boolean
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.used)) {
      data.used = this.used
    }
    return data
  }
}
