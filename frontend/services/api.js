const API_BASE_URL = 'https://ai-yield-aggregator.onrender.com';

class ApiService {
  async getProtocols() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/protocols`);
      if (!response.ok) throw new Error('Failed to fetch protocols');
      return await response.json();
    } catch (error) {
      console.error('Error fetching protocols:', error);
      throw error;
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