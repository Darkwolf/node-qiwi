export default class PaymentDetails {
  static fromParams(params = {}) {
    return new PaymentDetails({
      account: params.account
    })
  }

  static from(options) {
    return new PaymentDetails(options)
  }

  constructor(options = {}) {
    this.setAccount(options.account)
  }

  setAccount(account) {
    this.account = account
    return this
  }

  toParams() {
    const params = {}
    if (this.account) {
      params.account = `${this.account}`
    }
    return params
  }

  toJSON() {
    const data = {}
    if (this.account) {
      data.account = this.account
    }
    return data
  }
}
