const Helper = require('@darkwolf/helper.cjs')

class PaymentView {
  constructor(data = {}) {
    this
      .setTitle(data.title)
      .setAccount(data.account)
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setAccount(account) {
    this.account = account
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.title)) {
      data.title = this.title
    }
    if (this.account) {
      data.account = this.account
    }
    return data
  }
}
PaymentView.fromParams = (params = {}) => new PaymentView({
  title: params.title,
  account: params.account
})
PaymentView.from = data => new PaymentView(data)

module.exports = PaymentView
