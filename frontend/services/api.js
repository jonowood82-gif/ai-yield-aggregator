const API_BASE_URL = 'https://ai-yield-aggregator.onrender.com';

class ApiService {
  async getProtocols() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/protocols`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching protocols:', error);
      
      // Return fallback data if API fails
      return {
        protocols: {
          "compound": {"name": "Compound", "apy": 8.5, "tvl": 2500000000, "risk": "low", "tokens": ["USDC", "USDT", "DAI"]},
          "aave": {"name": "Aave", "apy": 12.3, "tvl": 1800000000, "risk": "medium", "tokens": ["USDC", "USDT", "DAI", "ETH"]},
          "yearn": {"name": "Yearn Finance", "apy": 15.7, "tvl": 800000000, "risk": "medium", "tokens": ["USDC", "USDT", "DAI", "WETH"]},
          "curve": {"name": "Curve Finance", "apy": 6.2, "tvl": 3200000000, "risk": "low", "tokens": ["USDC", "USDT", "DAI", "FRAX"]}
        },
        timestamp: new Date().toISOString(),
        source: "fallback_data"
      };
    }
  }

  async optimizePortfolio(amount, riskTolerance = 'medium') {
    try {
      const response = await fetch(`${API_BASE_URL}/api/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          risk_tolerance: riskTolerance
        })
      });
      if (!response.ok) throw new Error('Failed to optimize portfolio');
      return await response.json();
    } catch (error) {
      console.error('Error optimizing portfolio:', error);
      throw error;
    }
  }

  async getTransactionHistory(address) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions/${address}`);
      if (!response.ok) throw new Error('Failed to fetch transaction history');
      return await response.json();
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  }

  async getPortfolioPerformance(address) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolio-performance/${address}`);
      if (!response.ok) throw new Error('Failed to fetch portfolio performance');
      return await response.json();
    } catch (error) {
      console.error('Error fetching portfolio performance:', error);
      throw error;
    }
  }
}

export default new ApiService();