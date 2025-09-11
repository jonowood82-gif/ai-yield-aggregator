import { ethers } from 'ethers';

class BalanceService {
  constructor() {
    this.provider = null;
    this.signer = null;
  }

  async connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      return this.signer.address;
    }
    throw new Error('MetaMask not found');
  }

  async getTokenBalance(tokenAddress, userAddress) {
    if (!this.provider) throw new Error('Wallet not connected');
    
    try {
      // ERC-20 token contract
      const tokenContract = new ethers.Contract(tokenAddress, [
        'function balanceOf(address) view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)'
      ], this.provider);

      const [balance, decimals, symbol] = await Promise.all([
        tokenContract.balanceOf(userAddress),
        tokenContract.decimals(),
        tokenContract.symbol()
      ]);

      return {
        balance: ethers.formatUnits(balance, decimals),
        symbol,
        decimals
      };
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return { balance: '0', symbol: 'UNKNOWN', decimals: 18 };
    }
  }

  async getETHBalance(userAddress) {
    if (!this.provider) throw new Error('Wallet not connected');
    
    try {
      const balance = await this.provider.getBalance(userAddress);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
      return '0';
    }
  }

  async getAllBalances(userAddress) {
    const balances = {};
    
    // Common DeFi tokens on Ethereum mainnet
    const tokens = {
      'USDC': '0xA0b86a33E6441b8c4C8C0C4C0C4C0C4C0C4C0C4C', // USDC contract address
      'USDT': '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT contract address
      'DAI': '0x6B175474E89094C44Da98b954EedeAC495271d0F',  // DAI contract address
      'WETH': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'  // WETH contract address
    };

    // Get ETH balance
    balances['ETH'] = await this.getETHBalance(userAddress);

    // Get token balances
    for (const [symbol, address] of Object.entries(tokens)) {
      balances[symbol] = await this.getTokenBalance(address, userAddress);
    }

    return balances;
  }

  async getUSDValue(balances) {
    // This would integrate with a real price feed API
    // For now, we'll use mock prices
    const prices = {
      'ETH': 2000,
      'USDC': 1,
      'USDT': 1,
      'DAI': 1,
      'WETH': 2000
    };

    let totalUSD = 0;
    const usdBalances = {};

    for (const [symbol, balance] of Object.entries(balances)) {
      const price = prices[symbol] || 0;
      const usdValue = parseFloat(balance.balance || balance) * price;
      usdBalances[symbol] = {
        balance: balance.balance || balance,
        usdValue,
        price
      };
      totalUSD += usdValue;
    }

    return { totalUSD, usdBalances };
  }
}

export default new BalanceService();