const types = require('./')

class Profile {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setAuthInfo(data.authInfo)
      .setContractInfo(data.contractInfo)
      .setUserInfo(data.userInfo)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAuthInfo(authInfo) {
    this.authInfo = authInfo ? (
      authInfo instanceof types.AuthInfo ? authInfo : new types.AuthInfo(authInfo, this.context)
    ) : undefined
    return this
  }

  setContractInfo(contractInfo) {
    this.contractInfo = contractInfo ? (
      contractInfo instanceof types.ContractInfo ? contractInfo : new types.ContractInfo(contractInfo, this.context)
    ) : undefined
    return this
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo ? (
      userInfo instanceof types.UserInfo ? userInfo : new types.UserInfo(userInfo, this.context)
    ) : undefined
    return this
  }

  get() {
    return this.context.qiwi.getMe()
  }

  toJSON() {
    const data = {}
    if (this.authInfo) {
      data.authInfo = this.authInfo.toJSON()
    }
    if (this.contractInfo) {
      data.contractInfo = this.contractInfo.toJSON()
    }
    if (this.userInfo) {
      data.userInfo = this.userInfo.toJSON()
    }
    return data
  }
}
Profile.fromParams = (params = {}, context) => {
  const data = {
    authInfo: params.authInfo,
    contractInfo: params.contractInfo,
    userInfo: params.userInfo
  }
  if (data.authInfo) {
    data.authInfo = types.AuthInfo.fromParams(data.authInfo, context)
  }
  if (data.contractInfo) {
    data.contractInfo = types.ContractInfo.fromParams(data.contractInfo, context)
  }
  if (data.userInfo) {
    data.userInfo = types.UserInfo.fromParams(data.userInfo, context)
  }
  return new Profile(data, context)
}
Profile.from = (data, context) => new Profile(data, context)

module.exports = Profile
