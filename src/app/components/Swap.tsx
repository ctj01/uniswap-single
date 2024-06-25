

"use client";
import { useEffect, useState } from 'react';
import { getUniSwapContracts } from '../utils/getContracts';
import { Field, PrimaryButton } from './Index';
import { contractChainlinkToken, contractUsdtToken } from '../constants/contractConstants';
import { web3MetamaskWalletHooks } from '../utils/metaMask';
import { BigNumberish, formatEther } from 'ethers';
import { TOKENS_ERC20 } from '../constants/tokenConstants';

interface TokenBalance {
    usdtBalance: string,
    linkBalance: BigNumberish
}

const FEE = 3000;
const Swap = () => {
    const { useProvider } = web3MetamaskWalletHooks;

    const [tokenBalance, setTokenBalance] = useState<TokenBalance>();
    const provider = useProvider();
    const [contracts, setContracts] = useState<any>(null);
    const getContracts = async () => {
        if (provider) {
            const contracts = await getUniSwapContracts(provider);
            setContracts(contracts);

        }
    }

    const onChangeFrom = (e: any) => {
        console.log(e.target.value);
    }
  
    const onChangeToAmount = (e: any) => {
        
    }

    

    const poolFactory = async () => {
        if (contracts) {
            try {
                const pool = await contracts.contractFactory.getPool(contractUsdtToken, contractChainlinkToken, FEE);
                const usdtBalance = await contracts.contractERC20.contractERC20Usdt.balanceOf(pool);
                const linkBalance = await contracts.contractERC20.contractERC20Link.balanceOf(pool);          
                setTokenBalance({ usdtBalance, linkBalance });

            } catch (error) {

            }
        }
    }

    useEffect(() => {
        getContracts();
    }, [provider])

    useEffect(() => {
        if (contracts) {
            poolFactory();
        }
    }, [contracts])
    return (
        <>
            <div className='flex flex-column justify-center align-center mt-10 '>
                <div style={{ width: "30%" }}>
                    <div className='flex flex-row justify-between align-center'>
                        <div className='flex flex-row justify-center align-center'>
                            <img src={TOKENS_ERC20[0].icons} alt={TOKENS_ERC20[0].name} className='w-10 h-10' />
                            <span className='ml-2'>{parseFloat(tokenBalance?.usdtBalance ?? "")}</span>
                        </div>
                        <div className='flex flex-row justify-center align-center'>
                            <img src={TOKENS_ERC20[1].icons} alt={TOKENS_ERC20[1].name} className='w-10 h-10' />
                            <span className='ml-2'>{formatEther(tokenBalance?.linkBalance ?? 0)}</span>
                        </div>
                    </div>
                    <Field value={0} onChange={onChangeFrom} currency="USDT" tokens={TOKENS_ERC20} onCurrencyChange={(e) => console.log(e.target.value)} label='From' />
                    <Field value={0} onChange={(e) => console.log(e.target.value)} currency="LINK" tokens={TOKENS_ERC20} onCurrencyChange={(e) => console.log(e.target.value)} label='To' />
                </div>
            </div>
            <div className='flex flex-row justify-center align-center mt-10'>
                <PrimaryButton onClick={() => console.log('Swap')} text='Swap' />
            </div>
        </>
    )
}

export default Swap;