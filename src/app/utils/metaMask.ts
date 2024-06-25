import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'

export const [web3MetamaskWallet, web3MetamaskWalletHooks] = initializeConnector<MetaMask>(
    (actions) => new MetaMask({ actions, onError: onConnectionError })
  )

function onConnectionError(error: Error) {
    console.error(error)
}
