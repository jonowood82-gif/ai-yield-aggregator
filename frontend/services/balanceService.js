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
      
      // Get network info for debugging
      const network = await this.provider.getNetwork();
      console.log('Connected to network:', network.name, 'Chain ID:', network.chainId);
      
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

      // Check if the contract exists and has the balanceOf function
      const balance = await tokenContract.balanceOf(userAddress);
      
      // If balance is 0, return early to avoid unnecessary calls
      if (balance === 0n) {
        return { balance: '0', symbol: 'TOKEN', decimals: 18 };
      }
      
      // Try to get decimals and symbol, but don't fail if they don't exist
      let decimals = 18; // Default to 18
      let symbol = 'TOKEN'; // Default symbol
      
      try {
        decimals = await tokenContract.decimals();
      } catch (e) {
        console.warn('Could not fetch decimals for token:', tokenAddress);
      }
      
      try {
        symbol = await tokenContract.symbol();
      } catch (e) {
        console.warn('Could not fetch symbol for token:', tokenAddress);
      }

      return {
        balance: ethers.formatUnits(balance, decimals),
        symbol,
        decimals
      };
    } catch (error) {
      // If it's a BAD_DATA error, the user likely doesn't have this token
      if (error.code === 'BAD_DATA' || error.message.includes('could not decode result data')) {
        return { balance: '0', symbol: 'TOKEN', decimals: 18 };
      }
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
    
    // Get current network
    const network = await this.provider.getNetwork();
    const isTestnet = network.chainId !== 1n; // 1n = Ethereum mainnet
    
    if (isTestnet) {
      console.log('⚠️ Connected to testnet. Using testnet token addresses.');
      // For testnets, we'll skip token balance fetching since they don't have real value
      balances['ETH'] = await this.getETHBalance(userAddress);
      return balances;
    }
    
    // Common DeFi tokens on Ethereum mainnet
    const tokens = {
      'USDC': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC contract address
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
    // Get current network
    const network = await this.provider.getNetwork();
    const isTestnet = network.chainId !== 1n; // 1n = Ethereum mainnet
    
    if (isTestnet) {
      console.log('⚠️ Testnet detected. Showing testnet balances with $0 value.');
      // For testnets, show balances but with $0 value since they have no real value
      const usdBalances = {};
      let totalUSD = 0;
      
      for (const [symbol, balance] of Object.entries(balances)) {
        const balanceAmount = typeof balance === 'string' ? balance : balance.balance;
        usdBalances[symbol] = {
          balance: balanceAmount,
          usdValue: 0, // Testnet tokens have no real value
          price: 0
        };
        console.log(`${symbol}: balance=${balanceAmount}, price=0 (testnet), usdValue=0`);
      }
      
      return { totalUSD: 0, usdBalances };
    }
    
    // Get real-time prices from CoinGecko API for mainnet
    const prices = await this.getRealTimePrices();

    let totalUSD = 0;
    const usdBalances = {};

    for (const [symbol, balance] of Object.entries(balances)) {
      const price = prices[symbol] || 0;
      // Handle both ETH (string) and token (object) formats
      const balanceAmount = typeof balance === 'string' ? balance : balance.balance;
      const usdValue = parseFloat(balanceAmount) * price;
      
      // Debug logging
      console.log(`${symbol}: balance=${balanceAmount}, price=${price}, usdValue=${usdValue}`);
      
      usdBalances[symbol] = {
        balance: balanceAmount,
        usdValue,
        price
      };
      totalUSD += usdValue;
    }

    return { totalUSD, usdBalances };
  }

  async getRealTimePrices() {
    try {
      // CoinGecko API endpoint for multiple coins
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin,tether,dai,weth&vs_currencies=usd'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      
      const data = await response.json();
      
      // Map CoinGecko IDs to our symbols
      return {
        'ETH': data.ethereum?.usd || 2000,
        'USDC': data['usd-coin']?.usd || 1,
        'USDT': data.tether?.usd || 1,
        'DAI': data.dai?.usd || 1,
        'WETH': data.weth?.usd || 2000
      };
    } catch (error) {
      console.error('Error fetching real-time prices:', error);
      // Fallback to mock prices if API fails
      return {
        'ETH': 2000,
        'USDC': 1,
        'USDT': 1,
        'DAI': 1,
        'WETH': 2000
      };
    }
  }
}

export default new BalanceService();