import Helper from '@darkwolf/helper.mjs'

export default class Provider {
  static fromParams(params = {}, context) {
    return new Provider({
      id: params.id,
      title: params.shortName,
      fullName: params.longName,
      description: params.description,
      url: params.siteUrl,
      logoUrl: params.logoUrl,
      keywordsText: params.keys
    }, context)
  }

  static from(data, context) {
    return new Provider(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setTitle(data.title)
      .setFullName(data.fullName)
      .setDescription(data.description)
      .setUrl(data.url)
      .setLogoUrl(data.logoUrl)
      .setKeywordsText(data.keywordsText)
      .setPage(data.page)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setFullName(fullName) {
    this.fullName = fullName
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setLogoUrl(url) {
    this.logoUrl = url
    return this
  }

  setKeywordsText(text) {
    this.keywordsText = text
    return this
  }

  setPage(boolean) {
    this.page = boolean
    return this
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (Helper.exists(this.title)) {
      data.title = this.title
    }
    if (Helper.exists(this.fullName)) {
      data.fullName = this.fullName
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    if (this.url) {
      data.url = this.url
    }
    if (this.logoUrl) {
      data.logoUrl = this.logoUrl
    }
    if (Helper.exists(this.keywordsText)) {
      data.keywordsText = this.keywordsText
    }
    if (Helper.exists(this.page)) {
      data.page = this.page
    }
    return data
  }
}
