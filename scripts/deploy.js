const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const token = await hre.ethers.deployContract("Token");

  await token.waitForDeployment();

  console.log("Contract address:", token.target);
  console.log("Token deployed by:", deployer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
