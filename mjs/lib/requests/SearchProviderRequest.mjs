import Helper from '@darkwolf/helper.mjs'
import { Provider } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'
import QIWI from '../index.mjs'

export default class SearchProviderRequest {
  static method = 'POST'
  static endpoint = '/search/results/json.action'

  static from(parameters, context) {
    return new SearchProviderRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = SearchProviderRequest.method
    this.endpoint = SearchProviderRequest.endpoint
    this
      .setContext(context)
      .setQuery(parameters.query)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setQuery(query) {
    this.query = query
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.query)) {
      params.searchPhrase = this.query
    }
    return params
  }

  async send() {
    const response = await this.context.qiwi.request(this)
    if (response) {
      if (response.ok) {
        if (response.result.code._name === 'ERROR') {
          response
            .setOk(false)
            .setMessage(response.result.message)
          const error = new UnknownError(response.message).setResponse(response)
          this.context.qiwi.emit(EventType.ERROR, error)
          if (!this.context.qiwi.settings.ignoreErrors) throw error
        } else {
          response.setResult(response.result.data.items ? response.result.data.items.map(item => {
            const providerId = parseInt(item.item.id.id)
            const title = item.item.text
            let url
            let logoUrl
            if (item.item.url) {
              url = item.item.url.startsWith('/') ? `${QIWI.URL}${item.item.url}` : item.item.url
            }
            if (item.logo) {
              logoUrl = `https:${item.logo}`
            }
            const page = item.item.type.id === 'PAGE'
            return new Provider({
              id: providerId,
              title,
              url,
              logoUrl,
              page
            }, this.context)
          }) : [])
          this.context.qiwi.emit(EventType.RESPONSE, response)
          return response.result
        }
      } else {
        const error = new UnknownError(response.message).setResponse(response)
        this.context.qiwi.emit(EventType.ERROR, error)
        if (!this.context.qiwi.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
