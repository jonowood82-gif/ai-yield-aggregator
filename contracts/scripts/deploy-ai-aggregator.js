const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying AI Yield Aggregator contract...");

  // Get the contract factory
  const AIYieldAggregator = await ethers.getContractFactory("AIYieldAggregator");

  // Deploy the contract
  const aiAggregator = await AIYieldAggregator.deploy();

  // Wait for deployment to complete
  await aiAggregator.waitForDeployment();

  const contractAddress = await aiAggregator.getAddress();

  console.log("AI Yield Aggregator deployed to:", contractAddress);
  console.log("Owner:", await aiAggregator.owner());
  console.log("USDC Token:", await aiAggregator.USDC());
  console.log("Performance Fee Rate:", await aiAggregator.PERFORMANCE_FEE_RATE(), "basis points (0.5%)");
  console.log("Management Fee Rate:", await aiAggregator.MANAGEMENT_FEE_RATE(), "basis points (0.1%)");

  // Get initial stats
  const stats = await aiAggregator.getStats();
  console.log("\nInitial Stats:");
  console.log("Total Deposits:", ethers.formatUnits(stats[0], 6), "USDC");
  console.log("Total Fees Collected:", ethers.formatUnits(stats[1], 6), "USDC");
  console.log("Total Yield Generated:", ethers.formatUnits(stats[2], 6), "USDC");
  console.log("Contract Balance:", ethers.formatUnits(stats[3], 6), "USDC");

  // Get protocol allocations
  const allocations = await aiAggregator.getProtocolAllocations();
  console.log("\nProtocol Allocations:");
  for (let i = 0; i < allocations.length; i++) {
    console.log(`Protocol ${i}: ${allocations[i].percentage / 100}% (${allocations[i].protocol})`);
  }

  // Save the contract address for frontend use
  const contractInfo = {
    address: contractAddress,
    abi: AIYieldAggregator.interface.format("json"),
    network: "sepolia",
    deploymentDate: new Date().toISOString(),
    features: [
      "Real DeFi protocol integration",
      "Automated yield farming",
      "Performance fee collection",
      "Portfolio rebalancing",
      "Compound returns"
    ]
  };

  console.log("\nContract Info for Frontend:");
  console.log(JSON.stringify(contractInfo, null, 2));

  console.log("\nNext steps:");
  console.log("1. Update the CONTRACT_ADDRESS in your frontend");
  console.log("2. Add the contract ABI to your frontend");
  console.log("3. Test the real yield farming functionality");
  console.log("4. Deploy to mainnet when ready");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
