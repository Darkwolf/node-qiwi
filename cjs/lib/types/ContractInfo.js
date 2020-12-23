const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const NicknameInfo = require('./NicknameInfo')
const IdentificationInfo = require('./IdentificationInfo')
const SmsNotification = require('./SmsNotification')
const PriorityPackage = require('./PriorityPackage')

class ContractInfo {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setNicknameInfo(data.nicknameInfo)
      .setIdentifications(data.identifications)
      .setSmsNotification(data.smsNotification)
      .setPriorityPackage(data.priorityPackage)
      .setBlocked(data.blocked)
      .setDate(data.date)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setNicknameInfo(nicknameInfo) {
    this.nicknameInfo = nicknameInfo ? (
      nicknameInfo instanceof NicknameInfo ? nicknameInfo : new NicknameInfo(nicknameInfo, this.context)
    ) : undefined
    return this
  }

  setIdentifications(identifications) {
    this.identifications = identifications ? identifications.map(identificationInfo =>
      identificationInfo instanceof IdentificationInfo ? identificationInfo : new IdentificationInfo(identificationInfo, this.context)
    ) : undefined
    return this
  }

  setSmsNotification(smsNotification) {
    this.smsNotification = smsNotification ? (
      smsNotification instanceof SmsNotification ? smsNotification : new SmsNotification(smsNotification, this.context)
    ) : undefined
    return this
  }

  setPriorityPackage(priorityPackage) {
    this.priorityPackage = priorityPackage ? (
      priorityPackage instanceof PriorityPackage ? priorityPackage : new PriorityPackage(priorityPackage, this.context)
    ) : undefined
    return this
  }

  setBlocked(boolean) {
    this.blocked = boolean
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  get() {
    return this.context.qiwi.getContractInfo()
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.nicknameInfo) {
      data.nicknameInfo = this.nicknameInfo.toJSON()
    }
    if (this.identifications) {
      data.identifications = this.identifications.map(identificationInfo => identificationInfo.toJSON())
    }
    if (this.smsNotification) {
      data.smsNotification = this.smsNotification.toJSON()
    }
    if (this.priorityPackage) {
      data.priorityPackage = this.priorityPackage.toJSON()
    }
    if (Helper.exists(this.blocked)) {
      data.blocked = this.blocked
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
ContractInfo.fromParams = (params = {}, context) => {
  const data = {
    id: params.contractId,
    nicknameInfo: params.nickname,
    identifications: params.identificationInfo,
    smsNotification: params.smsNotification,
    priorityPackage: params.priorityPackage,
    blocked: params.blocked,
    date: params.creationDate
  }
  if (data.nicknameInfo) {
    data.nicknameInfo = NicknameInfo.fromParams(data.nicknameInfo, context)
  }
  if (data.identifications) {
    data.identifications = data.identifications.map(identificationInfo => IdentificationInfo.fromParams(identificationInfo, context))
  }
  if (data.smsNotification) {
    data.smsNotification = SmsNotification.fromParams(data.smsNotification, context)
  }
  if (data.priorityPackage) {
    data.priorityPackage = PriorityPackage.fromParams(data.priorityPackage, context)
  }
  if (data.date) {
    data.date = new UnixTimestamp(data.date).seconds
  }
  return new ContractInfo(data, context)
}
ContractInfo.from = (data, context) => new ContractInfo(data, context)

module.exports = ContractInfo
