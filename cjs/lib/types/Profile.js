const AuthInfo = require('./AuthInfo')
const ContractInfo = require('./ContractInfo')
const UserInfo = require('./UserInfo')

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
      authInfo instanceof AuthInfo ? authInfo : new AuthInfo(authInfo, this.context)
    ) : undefined
    return this
  }

  setContractInfo(contractInfo) {
    this.contractInfo = contractInfo ? (
      contractInfo instanceof ContractInfo ? contractInfo : new ContractInfo(contractInfo, this.context)
    ) : undefined
    return this
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo ? (
      userInfo instanceof UserInfo ? userInfo : new UserInfo(userInfo, this.context)
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
    data.authInfo = AuthInfo.fromParams(data.authInfo, context)
  }
  if (data.contractInfo) {
    data.contractInfo = ContractInfo.fromParams(data.contractInfo, context)
  }
  if (data.userInfo) {
    data.userInfo = UserInfo.fromParams(data.userInfo, context)
  }
  return new Profile(data, context)
}
Profile.from = (data, context) => new Profile(data, context)

module.exports = Profile
