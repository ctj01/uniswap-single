import hre from "hardhat";
import { ethers } from 'hardhat'
import { getMaxTick, getMinTick } from "../scripts/Ticks";


async function Main() {
    const [deployer] = await ethers.getSigners();
    // Usdt
    const token0 = "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0";
    //chainklink
    const token1 = "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5";
    

    const token0Contract = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", token0);
    const token1Contract = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", token1);
    const UniswapV3Liquidity = await hre.ethers.getContractFactory("UniswapV3Liquidity");
    
    const lock = await UniswapV3Liquidity.deploy("0x1238536071E1c677A632429e3655c799b22cDA52","0x0227628f3F023bb0B980b67D528571c95c6DaC1c", 
      "0x232B31AFECA95C73cB33fE43A2AA2cAF09c38f8F",token0,token1);
        
    const result = await lock.waitForDeployment();
    const fee = 3000;
    console.log("Liquiditypool deployed to:", result.target);
    const tickLower = getMinTick(fee);
    const tickUpper = getMaxTick(fee);
    const amount0 = ethers.parseUnits("5000", 6);
    const amount1 = ethers.parseUnits("300", 18);
    const amountMin0 = 0;
    const amountMin1 = 0; 
    
   try {
    await token0Contract.approve(result.target, amount0);
    await token1Contract.approve(result.target, amount1);
   } catch (error) {
        console.error(error);
   }
   
    const allowance0 = await token0Contract.allowance(deployer.address, result.target);
    const allowance1 = await token1Contract.allowance(deployer.address, result.target);
    console.log("Allowance 0:", allowance0.toString());
    console.log("Allowance 1:", allowance1.toString());
    try {
        const sendTransaction0 = await token0Contract.transfer(result.target, amount0);
        await sendTransaction0.wait();
        console.log("Transaction hash:", sendTransaction0.hash);
        const sendTransaction1 = await token1Contract.transfer(result.target, amount1);
        await sendTransaction1.wait();

        const tx = await result.addLiquidity(fee, tickLower, tickUpper, amount0, amount1, amountMin0, amountMin1, deployer.address, {
            gasLimit: 3000000,
            gasPrice: ethers.parseUnits("50", "gwei")
        });
        
        await tx.wait();
    console.log("Liquidity added to:", tx.hash);
    } catch (error) {
        console.error(error);
    }
   
}

Main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});