import { ethers } from 'ethers'
import ABI_FACTORY from '../../../artifacts/@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json'
import SWAP_ROUTER_ABI from '../../../artifacts/contracts/UniSwapRouter.sol/SwapRouter.json'
import SWAP_ABI from '../../../artifacts/contracts/UniSwasp.sol/Swap.json'
import ERC_20_ABI from '../../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json'
import { JsonRpcSigner } from "ethers"
import { contractUniSwapRouter, contractUniSwapFactory, contractUsdtToken, contractChainlinkToken } from "../constants/contractConstants"
export const getUniSwapContracts = async (provider: any) => {
    try {
        const signer = await provider.getSigner();
        const contractSwapRouter = getContract(contractUniSwapRouter, signer, SWAP_ROUTER_ABI.abi);
        const contractSwap = getContract(contractUniSwapRouter, signer, SWAP_ABI.abi);
        const contractFactory = getContract(contractUniSwapFactory, signer, ABI_FACTORY.abi);
        const contractERC20Usdt = getContract(contractUsdtToken, signer, ERC_20_ABI.abi);
        const contractERC20Link = getContract(contractChainlinkToken, signer, ERC_20_ABI.abi);
        const contractERC20 = { contractERC20Usdt, contractERC20Link }
        return { contractSwapRouter, contractSwap , contractFactory, contractERC20 }
    } catch (error) {
        console.log(error)
    }
}

const getContract =  (contractAddreess: string, signer: JsonRpcSigner, ABI: any) => {
    const contract = new ethers.Contract(contractAddreess, ABI, signer);
    return contract;
}