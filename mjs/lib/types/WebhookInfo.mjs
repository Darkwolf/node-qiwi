import Helper from '@darkwolf/helper.mjs'
import { PaymentType } from '../constants/index.mjs'

export default class WebhookInfo {
  static fromParams(params = {}, context) {
    const data = {
      id: params.hookId,
      type: params.hookType,
      paymentType: params.txnType
    }
    if (params.hookParameters) {
      data.url = params.hookParameters.url
    }
    if (data.type) {
      data.type = data.type.toLowerCase()
    }
    if (data.paymentType) {
      let type
      switch (data.paymentType) {
        case 'IN': {
          type = PaymentType.INCOMING
          break
        }
        case 'OUT': {
          type = PaymentType.OUTGOING
          break
        }
        default: {
          type = data.paymentType.toLowerCase()
        }
      }
      data.paymentType = type
    }
    return new WebhookInfo(data, context)
  }

  static from(data, context) {
    return new WebhookInfo(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setType(data.type)
      .setUrl(data.url)
      .setPaymentType(data.paymentType)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setPaymentType(type) {
    this.paymentType = type
    return this
  }

  get() {
    return this.context.qiwi.getWebhookInfo()
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.type) {
      data.type = this.type
    }
    if (this.url) {
      data.url = this.url
    }
    if (this.paymentType) {
      data.paymentType = this.paymentType
    }
    return data
  }
}
