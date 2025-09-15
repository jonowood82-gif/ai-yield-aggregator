const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying FeeCollector contract...");

  const FeeCollector = await ethers.getContractFactory("FeeCollector");
  const feeCollector = await FeeCollector.deploy();
  await feeCollector.waitForDeployment();

  const contractAddress = await feeCollector.getAddress();

  console.log("FeeCollector deployed to:", contractAddress);
  console.log("Owner:", await feeCollector.owner());
  console.log("Performance Fee Rate:", await feeCollector.performanceFeeRate(), "basis points (0.5%)");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
