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
    const chainId = network.chainId.toString();
    const isTestnet = chainId !== '1' && chainId !== '137'; // Not Ethereum or Polygon mainnet
    
    if (isTestnet) {
      console.log('⚠️ Connected to testnet. Using testnet token addresses.');
      // For testnets, we'll skip token balance fetching since they don't have real value
      const nativeSymbol = chainId === '80001' ? 'MATIC' : 'ETH';
      balances[nativeSymbol] = await this.getETHBalance(userAddress);
      return balances;
    }
    
    // Token addresses by network
    const tokens = {
      '1': { // Ethereum Mainnet
        'USDC': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        'USDT': '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        'DAI': '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        'WETH': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        'WBTC': '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        'LINK': '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        'UNI': '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        'AAVE': '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        'CRV': '0xD533a949740bb3306d119CC777fa900bA034cd52',
        'COMP': '0xc00e94Cb662C3520282E6f5717214004A7f26888'
      },
      '137': { // Polygon Mainnet
        'USDC': '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        'USDT': '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        'DAI': '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        'WMATIC': '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        'WBTC': '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
        'WETH': '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        'LINK': '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
        'UNI': '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
        'AAVE': '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
        'CRV': '0x172370d5Cd63279eFa6d502DAB29171933a610AF'
      }
    };
    
    const networkTokens = tokens[chainId] || tokens['1']; // Default to Ethereum if network not found

    // Get native balance (ETH or POL)
    const nativeSymbol = chainId === '137' ? 'POL' : 'ETH';
    balances[nativeSymbol] = await this.getETHBalance(userAddress);

    // Get token balances
    for (const [symbol, address] of Object.entries(networkTokens)) {
      balances[symbol] = await this.getTokenBalance(address, userAddress);
    }

    return balances;
  }

  async getUSDValue(balances) {
    // Get current network
    const network = await this.provider.getNetwork();
    const chainId = network.chainId.toString();
    const isTestnet = chainId !== '1' && chainId !== '137'; // Not Ethereum or Polygon mainnet
    
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
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin,tether,dai,weth,polygon,wrapped-bitcoin,chainlink,uniswap,aave,curve-dao-token,compound-governance-token&vs_currencies=usd'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      
      const data = await response.json();
      
      // Map CoinGecko IDs to our symbols
      return {
        'ETH': data.ethereum?.usd || 2000,
        'POL': data.polygon?.usd || 0.8,
        'USDC': data['usd-coin']?.usd || 1,
        'USDT': data.tether?.usd || 1,
        'DAI': data.dai?.usd || 1,
        'WETH': data.weth?.usd || 2000,
        'WMATIC': data.polygon?.usd || 0.8,
        'WBTC': data['wrapped-bitcoin']?.usd || 30000,
        'LINK': data.chainlink?.usd || 15,
        'UNI': data.uniswap?.usd || 8,
        'AAVE': data.aave?.usd || 120,
        'CRV': data['curve-dao-token']?.usd || 0.5,
        'COMP': data['compound-governance-token']?.usd || 50
      };
    } catch (error) {
      console.error('Error fetching real-time prices:', error);
      // Fallback to mock prices if API fails
      return {
        'ETH': 2000,
        'POL': 0.8,
        'USDC': 1,
        'USDT': 1,
        'DAI': 1,
        'WETH': 2000,
        'WMATIC': 0.8,
        'WBTC': 30000,
        'LINK': 15,
        'UNI': 8,
        'AAVE': 120,
        'CRV': 0.5,
        'COMP': 50
      };
    }
  }
}

export default new BalanceService();