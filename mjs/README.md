# QIWI API
## Install
#### ECMAScript (Node.js v12.x LTS or higher)
`npm i --save @darkwolf/qiwi.mjs`
#### CommonJS (Node.js v10.x LTS or higher)
`npm i --save @darkwolf/qiwi.cjs`
## Using
```javascript
// ECMAScript
import QIWI from '@darkwolf/qiwi.mjs'

// CommonJS
const QIWI = require('@darkwolf/qiwi.cjs')

const qiwi = new QIWI(token, {
  phoneNumber // Some requests require a wallet phone number
})

// Handling events
qiwi.on('request', request => {})
qiwi.on('response', response => {})
qiwi.on('error', error => {})

// Getting account balance
const {balance} = await qiwi.getAccount('qw_wallet_rub')
// Getting payments
const timestamp = new UnixTimestamp()
const {transactions} = await qiwi.getPayments({
  type: 'incoming',
  sources: ['qw_rub'],
  startDate: timestamp.clone().subtract('90 days'),
  endDate: timestamp,
  limit: 50
})
// Sending payments
const paymentRequest = await qiwi.transferToQIWIWallet(phoneNumber, 5000, {
  comment: 'Ave, Darkwolf!'
})
// Getting transactions
const transaction = await qiwi.getTransaction(transactionId)
const blob = await transaction.downloadCheque('application/pdf')
await transaction.sendChequeToEmail('PavelWolfDark@gmail.com')
// Search for providers
const providers = await qiwi.searchProvider('сбер')
```
## [API Documentation](https://github.com/Darkwolf/node-qiwi/blob/master/docs/API.md)
## Contact Me
#### GitHub: [@PavelWolfDark](https://github.com/PavelWolfDark)
#### Telegram: [@PavelWolfDark](https://t.me/PavelWolfDark)
#### Email: [PavelWolfDark@gmail.com](mailto:PavelWolfDark@gmail.com)
