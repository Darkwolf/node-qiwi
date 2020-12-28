const Helper = require('@darkwolf/helper.cjs')

class PinInfo {
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
PinInfo.fromParams = (params = {}, context) => new PinInfo({
  used: params.pinUsed
}, context)
PinInfo.from = (data, context) => new PinInfo(data, context)

module.exports = PinInfo
