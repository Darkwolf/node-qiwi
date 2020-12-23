const Helper = require('@darkwolf/helper.cjs')
const Payment = require('./Payment')

class Update {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setHookId(data.hookId)
      .setPayment(data.payment)
      .setTest(data.test)
      .setVersion(data.version)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setHookId(id) {
    this.hookId = id
    return this
  }

  setPayment(payment) {
    this.payment = payment ? (
      payment instanceof Payment ? payment : new Payment(payment, this.context)
    ) : undefined
    return this
  }

  setTest(boolean) {
    this.test = boolean
    return this
  }

  setVersion(version) {
    this.version = version
    return this
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.hookId) {
      data.hookId = this.hookId
    }
    if (this.payment) {
      data.payment = this.payment.toJSON()
    }
    if (Helper.exists(this.test)) {
      data.test = this.test
    }
    if (this.version) {
      data.version = this.version
    }
    return data
  }
}
Update.fromParams = (params = {}, context) => {
  const data = {
    id: params.messageId,
    hookId: params.hookId,
    payment: params.payment,
    test: params.test,
    version: params.version
  }
  if (data.payment) {
    data.payment = Payment.fromParams(data.payment, context)
  }
  return new Update(data, context)
}
Update.from = (data, context) => new Update(data, context)

module.exports = Update
