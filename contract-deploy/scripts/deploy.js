const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying FeeCollector contract...");

  // USDC contract address on Sepolia testnet
  const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

  const FeeCollector = await ethers.getContractFactory("FeeCollector");
  const feeCollector = await FeeCollector.deploy(USDC_ADDRESS);
  await feeCollector.waitForDeployment();

  const contractAddress = await feeCollector.getAddress();

  console.log("FeeCollector deployed to:", contractAddress);
  console.log("Owner:", await feeCollector.owner());
  console.log("USDC Token:", USDC_ADDRESS);
  console.log("Performance Fee Rate:", await feeCollector.performanceFeeRate(), "basis points (0.5%)");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
