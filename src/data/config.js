import healthNodes from './healthNodes'

const NOTARY_URL = process.env.VUE_APP_NOTARY_URL || 'http://localhost:8083/'
const NOTARY_ACCOUNT = process.env.VUE_APP_NOTARY_ACCOUNT || 'notary@notary'
const RELAY_ACCOUNT_KEY = process.env.VUE_APP_RELAY_ACCOUNT_KEY || 'eth_registration_service@notary'

export default {
  notaryUrl: NOTARY_URL,
  account: NOTARY_ACCOUNT,
  ETH: {
    relayRegistrationIrohaAccount: RELAY_ACCOUNT_KEY
  },
  healthNodes
}
