const { UnixTimestamp } = require('@darkwolf/time.cjs')
const types = require('./')

class AuthInfo {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setUserId(data.userId)
      .setEmail(data.email)
      .setPassInfo(data.passInfo)
      .setPinInfo(data.pinInfo)
      .setMobilePinInfo(data.mobilePinInfo)
      .setEmailSettings(data.emailSettings)
      .setIpAddress(data.ipAddress)
      .setLastLogin(data.lastLogin)
      .setRegistrationDate(data.registrationDate)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUserId(id) {
    this.userId = id
    return this
  }

  setEmail(email) {
    this.email = email
    return this
  }

  setPassInfo(passInfo) {
    this.passInfo = passInfo ? (
      passInfo instanceof types.PassInfo ? passInfo : new types.PassInfo(passInfo, this.context)
    ) : undefined
    return this
  }

  setPinInfo(pinInfo) {
    this.pinInfo = pinInfo ? (
      pinInfo instanceof types.PinInfo ? pinInfo : new types.PinInfo(pinInfo, this.context)
    ) : undefined
    return this
  }

  setMobilePinInfo(pinInfo) {
    this.mobilePinInfo = pinInfo ? (
      pinInfo instanceof types.MobilePinInfo ? pinInfo : new types.MobilePinInfo(pinInfo, this.context)
    ) : undefined
    return this
  }

  setEmailSettings(settings) {
    this.emailSettings = settings ? (
      settings instanceof types.EmailSettings ? settings : new types.EmailSettings(settings, this.context)
    ) : undefined
    return this
  }

  setIpAddress(ipAddress) {
    this.ipAddress = ipAddress
    return this
  }

  setLastLogin(date) {
    this.lastLogin = date
    return this
  }

  setRegistrationDate(date) {
    this.registrationDate = date
    return this
  }

  get() {
    return this.context.qiwi.getAuthInfo()
  }

  toJSON() {
    const data = {}
    if (this.userId) {
      data.userId = this.userId
    }
    if (this.email) {
      data.email = this.email
    }
    if (this.passInfo) {
      data.passInfo = this.passInfo.toJSON()
    }
    if (this.pinInfo) {
      data.pinInfo = this.pinInfo.toJSON()
    }
    if (this.mobilePinInfo) {
      data.mobilePinInfo = this.mobilePinInfo.toJSON()
    }
    if (this.emailSettings) {
      data.emailSettings = this.emailSettings.toJSON()
    }
    if (this.ipAddress) {
      data.ipAddress = this.ipAddress
    }
    if (this.lastLogin) {
      data.lastLogin = this.lastLogin
    }
    if (this.registrationDate) {
      data.registrationDate = this.registrationDate
    }
    return data
  }
}
AuthInfo.fromParams = (params = {}, context) => {
  const data = {
    userId: params.personId,
    email: params.boundEmail,
    passInfo: params.passInfo,
    pinInfo: params.pinInfo,
    mobilePinInfo: params.mobilePinInfo,
    emailSettings: params.emailSettings,
    ipAddress: params.ip,
    lastLogin: params.lastLoginDate,
    registrationDate: params.registrationDate
  }
  if (data.passInfo) {
    data.passInfo = types.PassInfo.fromParams(data.passInfo, context)
  }
  if (data.pinInfo) {
    data.pinInfo = types.PinInfo.fromParams(data.pinInfo, context)
  }
  if (data.mobilePinInfo) {
    data.mobilePinInfo = types.MobilePinInfo.fromParams(data.mobilePinInfo, context)
  }
  if (data.emailSettings) {
    data.emailSettings = types.EmailSettings.fromParams(data.emailSettings, context)
  }
  if (data.lastLogin) {
    data.lastLogin = new UnixTimestamp(data.lastLogin).seconds
  }
  if (data.registrationDate) {
    data.registrationDate = new UnixTimestamp(data.registrationDate).seconds
  }
  return new AuthInfo(data, context)
}
AuthInfo.from = (data, context) => new AuthInfo(data, context)

module.exports = AuthInfo
