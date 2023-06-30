async function main() {
  const [deployer, feeAccount] = await hre.ethers.getSigners();
  console.log("Deployer account:", deployer.address);
  console.log("Fee account:", feeAccount.address);

  const Token = await ethers.getContractFactory("Token");
  const Trade = await ethers.getContractFactory("Trade");

  const rolls = await Token.deploy('Martian', 'MTI', '100000');
  console.log("\nMartian deployed to:", rolls.target);
  const lambo = await Token.deploy('EthCoins', 'ETC', '100000');
  console.log("EthCoins deployed to:", lambo.target);
  const bugatti = await Token.deploy('StellarCoins', 'STC', '100000');
  console.log("StellarCoins deployed to:", bugatti.target);

  const trade = await Trade.deploy(feeAccount.address, 10);
  console.log("Trade deployed to:", trade.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
