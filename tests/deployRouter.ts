import hre from "hardhat";

async function Main() {
    const Swap = await hre.ethers.getContractFactory("SwapRouter");
    const router = await Swap.deploy("0x0227628f3F023bb0B980b67D528571c95c6DaC1c", "0xfff9976782d46cc05630d1f6ebab18b2324d6b14");
    const result = await router.waitForDeployment();
    console.log("router deployed to:", result.target);
}

Main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});