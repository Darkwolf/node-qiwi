const CustomError = require('@darkwolf/custom-error.cjs')

class QIWIError extends CustomError {
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
QIWIError.name = 'QIWIError'

module.exports = QIWIError
