require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  paths: {
    sources: "./",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
