import Helper from '@darkwolf/helper.mjs'
import { UnixTimestamp } from '@darkwolf/time.mjs'

export default class PassInfo {
  static fromParams(params = {}, context) {
    const data = {
      lastChange: params.lastPassChange,
      nextChange: params.nextPassChange,
      used: params.passwordUsed
    }
    if (data.lastChange) {
      data.lastChange = new UnixTimestamp(data.lastChange).seconds
    }
    if (data.nextChange) {
      data.nextChange = new UnixTimestamp(data.nextChange).seconds
    }
    return new PassInfo(data, context)
  }

  static from(data, context) {
    return new PassInfo(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setLastChange(data.lastChange)
      .setNextChange(data.nextChange)
      .setUsed(data.used)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setLastChange(date) {
    this.lastChange = date
    return this
  }

  setNextChange(date) {
    this.nextChange = date
    return this
  }

  setUsed(boolean) {
    this.used = boolean
    return this
  }

  toJSON() {
    const data = {}
    if (this.lastChange) {
      data.lastChange = this.lastChange
    }
    if (this.nextChange) {
      data.nextChange = this.nextChange
    }
    if (Helper.exists(this.used)) {
      data.used = this.used
    }
    return data
  }
}
