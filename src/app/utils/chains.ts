import type { AddEthereumChainParameter } from '@web3-react/types'

const ETH_SEPOLIA: AddEthereumChainParameter['nativeCurrency'] = {
    name: 'Sepolia',
    symbol: 'ETH',
    decimals: 18,
}


export const URL = {
    1: process.env.SEPOLIA_URL as string,
}

export const SEPOLIA: AddEthereumChainParameter = {
    chainId: 11155111,
    chainName: 'Sepolia',
    nativeCurrency: ETH_SEPOLIA,
    rpcUrls: [URL[1]],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
}

export const CHAINS = {
    1: SEPOLIA,
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
    (accumulator, chainId) => {
      const validURLs: string[] = CHAINS[1].rpcUrls.filter((rpcUrl) => rpcUrl)
  
      if (validURLs.length) {
        accumulator[Number(chainId)] = validURLs
      }
  
      return accumulator
    },
    {}
  )