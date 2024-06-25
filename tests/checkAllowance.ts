
import { ethers } from 'hardhat'

async function Main() {
    const [deployer] = await ethers.getSigners();
    // Usdt
    const token0 = "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0";
    //chainklink
    const token1 = "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5";
    const token0Contract = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", token0);
    const token1Contract = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", token1);
    const poolFactory = await ethers.getContractAt("IUniswapV3Factory", "0x0227628f3F023bb0B980b67D528571c95c6DaC1c");
    const pool = await poolFactory.getPool(token0, token1, 3000);
    const poolBalanceToken0 = await token0Contract.balanceOf(pool);
    const poolBalanceToken1 = await token1Contract.balanceOf(pool);
    console.log("Pool balance token0:", poolBalanceToken0.toString());
    console.log("Pool balance token1:", poolBalanceToken1.toString());
    console.log("Pool:", pool);
}

Main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});