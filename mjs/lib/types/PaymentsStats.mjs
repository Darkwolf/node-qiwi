import CurrencyAmount from './CurrencyAmount.mjs'

export default class PaymentsStats {
  static fromParams(params = {}, context) {
    const data = {
      incoming: params.incomingTotal,
      outgoing: params.outgoingTotal
    }
    if (data.incoming) {
      data.incoming = data.incoming.map(amount => CurrencyAmount.fromParams(amount))
    }
    if (data.outgoing) {
      data.outgoing = data.outgoing.map(amount => CurrencyAmount.fromParams(amount))
    }
    return new PaymentsStats(data, context)
  }

  static from(data, context) {
    return new PaymentsStats(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setIncoming(data.incoming)
      .setOutgoing(data.outgoing)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setIncoming(amounts) {
    this.incoming = amounts ? amounts.map(amount =>
      amount instanceof CurrencyAmount ? amount : new CurrencyAmount(amount)
    ) : undefined
    return this
  }

  setOutgoing(amounts) {
    this.outgoing = amounts ? amounts.map(amount =>
      amount instanceof CurrencyAmount ? amount : new CurrencyAmount(amount)
    ) : undefined
    return this
  }

  get(options) {
    return this.context.qiwi.getPaymentsStats(options)
  }

  toJSON() {
    const data = {}
    if (this.incoming) {
      data.incoming = this.incoming.map(amount => amount.toJSON())
    }
    if (this.outgoing) {
      data.outgoing = this.outgoing.map(amount => amount.toJSON())
    }
    return data
  }
}
