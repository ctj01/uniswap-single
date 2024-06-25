import { MetaMask } from "@web3-react/metamask";
import { Web3ReactHooks, Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { web3MetamaskWalletHooks as metaMaskHooks, web3MetamaskWallet } from "../utils/metaMask";
import { network, hooks as networkHooks } from "../utils/network";
import { ReactNode } from "react";



const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
    const connectors: [MetaMask | Network, Web3ReactHooks][] = [
        [web3MetamaskWallet, metaMaskHooks],
        [network, networkHooks],
      ]

    return (
        <Web3ReactProvider connectors={connectors}>
            {children}
        </Web3ReactProvider>
    )

}
export default Web3ContextProvider;

