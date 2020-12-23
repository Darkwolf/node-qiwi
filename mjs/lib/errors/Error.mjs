import CustomError from '@darkwolf/custom-error.mjs'

export default class QIWIError extends CustomError {
  static name = 'QIWIError'

  constructor(message, code) {
    super(message, code)
    this.setName(QIWIError.name)
  }

  setRequest(request) {
    this.request = request
    return this
  }

  setResponse(response) {
    this.response = response
    return this
  }
}
