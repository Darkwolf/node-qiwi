import { UnixTimestamp } from '@darkwolf/time.mjs'
import Transaction from './Transaction.mjs'

export default class Payments {
  static fromParams(params = {}, context) {
    const data = {
      transactions: params.data,
      nextTransactionId: params.nextTxnId,
      nextTransactionDate: params.nextTxnDate
    }
    if (data.transactions) {
      data.transactions = data.transactions.map(transaction => Transaction.fromParams(transaction, context))
    }
    if (data.nextTransactionDate) {
      data.nextTransactionDate = new UnixTimestamp(data.nextTransactionDate).seconds
    }
    return new Payments(data, context)
  }

  static from(data, context) {
    return new Payments(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setTransactions(data.transactions)
      .setNextTransactionId(data.nextTransactionId)
      .setNextTransactionDate(data.nextTransactionDate)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTransactions(transactions) {
    this.transactions = transactions ? transactions.map(transaction =>
      transaction instanceof Transaction ? transaction : new Transaction(transaction, this.context)
    ) : undefined
    return this
  }

  setNextTransactionId(id) {
    this.nextTransactionId = id
    return this
  }

  setNextTransactionDate(date) {
    this.nextTransactionDate = date
    return this
  }

  get(options) {
    return this.context.qiwi.getPayments(options)
  }

  toJSON() {
    const data = {}
    if (this.transactions) {
      data.transactions = this.transactions.map(transaction => transaction.toJSON())
    }
    if (this.nextTransactionId) {
      data.nextTransactionId = this.nextTransactionId
    }
    if (this.nextTransactionDate) {
      data.nextTransactionDate = this.nextTransactionDate
    }
    return data
  }
}
