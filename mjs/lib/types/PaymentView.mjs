import Helper from '@darkwolf/helper.mjs'

export default class PaymentView {
  static fromParams(params = {}) {
    return new PaymentView({
      title: params.title,
      account: params.account
    })
  }

  static from(data) {
    return new PaymentView(data)
  }

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
