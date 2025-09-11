const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying FeeCollector contract...");

  // Get the contract factory
  const FeeCollector = await ethers.getContractFactory("FeeCollector");

  // Deploy the contract
  const feeCollector = await FeeCollector.deploy();

  // Wait for deployment to complete
  await feeCollector.deployed();

  console.log("FeeCollector deployed to:", feeCollector.address);
  console.log("Owner:", await feeCollector.owner());
  console.log("Performance Fee Rate:", await feeCollector.performanceFeeRate(), "basis points (0.5%)");

  // Save the contract address for frontend use
  const contractInfo = {
    address: feeCollector.address,
    abi: FeeCollector.interface.format("json"),
    network: "ethereum", // or "polygon" depending on where you deploy
    deploymentDate: new Date().toISOString()
  };

  console.log("\nContract Info for Frontend:");
  console.log(JSON.stringify(contractInfo, null, 2));

  console.log("\nNext steps:");
  console.log("1. Update the CONTRACT_ADDRESS in your admin.js file");
  console.log("2. Add the contract ABI to your frontend");
  console.log("3. Test the fee collection functionality");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
