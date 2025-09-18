const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying AI Yield Aggregator Production Contract...");

  // Sepolia USDC address
  const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

  const AIYieldAggregatorProduction = await ethers.getContractFactory("AIYieldAggregatorProduction");
  const aiYieldAggregator = await AIYieldAggregatorProduction.deploy(USDC_ADDRESS);
  await aiYieldAggregator.waitForDeployment();

  const contractAddress = await aiYieldAggregator.getAddress();

  console.log("✅ AI Yield Aggregator Production deployed to:", contractAddress);
  console.log("👤 Owner:", await aiYieldAggregator.owner());
  console.log("💰 USDC Token:", await aiYieldAggregator.USDC());
  console.log("📊 Performance Fee Rate:", await aiYieldAggregator.PERFORMANCE_FEE_RATE(), "basis points (0.5%)");
  console.log("🎯 Yield Update Threshold:", await aiYieldAggregator.YIELD_UPDATE_THRESHOLD(), "basis points (1%)");

  // Get initial stats
  const stats = await aiYieldAggregator.getStats();
  console.log("\n📈 Initial Contract Stats:");
  console.log("Total Deposits:", ethers.formatUnits(stats[0], 6), "USDC");
  console.log("Total Fees:", ethers.formatUnits(stats[1], 6), "USDC");
  console.log("Total Yield:", ethers.formatUnits(stats[2], 6), "USDC");
  console.log("Contract Balance:", ethers.formatUnits(stats[3], 6), "USDC");
  console.log("Current APY:", Number(stats[4]) / 100, "%");
  console.log("Last Update:", new Date(Number(stats[5]) * 1000).toISOString());

  console.log("\n🔧 Next Steps:");
  console.log("1. Update CONTRACT_ADDRESS in frontend files");
  console.log("2. Update CONTRACT_ADDRESS in yield_updater.py");
  console.log("3. Start the yield updater service: python yield_updater.py");
  console.log("4. Test real yield farming with live data!");

  console.log("\n💡 Cost Analysis:");
  console.log("✅ Backend updates: ~$0-50/month (cheapest option)");
  console.log("✅ Real yield data from live DeFi protocols");
  console.log("✅ Automatic updates when APY changes by 1%+");
  console.log("✅ No oracle costs or complex integrations");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
