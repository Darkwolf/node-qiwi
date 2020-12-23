import Helper from '@darkwolf/helper.mjs'

export default class NicknameInfo {
  static fromParams(params = {}, context) {
    return new NicknameInfo({
      nickname: params.nickname,
      canChange: params.canChange,
      canUse: params.canUse,
      description: params.description
    }, context)
  }

  static from(data, context) {
    return new NicknameInfo(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setNickname(data.nickname)
      .setCanChange(data.canChange)
      .setCanUse(data.canUse)
      .setDescription(data.description)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setNickname(nickname) {
    this.nickname = nickname
    return this
  }

  setCanChange(boolean) {
    this.canChange = boolean
    return this
  }

  setCanUse(boolean) {
    this.canUse = boolean
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  toJSON() {
    const data = {}
    if (this.nickname) {
      data.nickname = this.nickname
    }
    if (Helper.exists(this.canChange)) {
      data.canChange = this.canChange
    }
    if (Helper.exists(this.canUse)) {
      data.canUse = this.canUse
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    return data
  }
}
