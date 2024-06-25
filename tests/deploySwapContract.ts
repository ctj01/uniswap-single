import hre from "hardhat";

async function Main() {
    const Swap = await hre.ethers.getContractFactory("Swap");
    const lock = await Swap.deploy();
    const result = await lock.waitForDeployment();
    console.log("Dex deployed to:", result.target);
}

Main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});