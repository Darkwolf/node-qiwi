class PaymentDetails {
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
PaymentDetails.fromParams = (params = {}) => new PaymentDetails({
  account: params.account
})
PaymentDetails.from = options => new PaymentDetails(options)

module.exports = PaymentDetails
