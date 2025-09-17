import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';
import BalanceService from '../services/balanceService';

export default function PortfolioOptimizer({ account }) {
  const [amount, setAmount] = useState(10000);
  const [riskTolerance, setRiskTolerance] = useState('medium');
  const [protocols, setProtocols] = useState([]);
  const [optimization, setOptimization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userBalances, setUserBalances] = useState(null);
  const [loadingBalances, setLoadingBalances] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState('');

  useEffect(() => {
    loadProtocols();
  }, []);

  useEffect(() => {
    if (account) {
      loadUserBalances();
      getCurrentNetwork();
    }
  }, [account]);

  const getCurrentNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId === '0x89') {
          setCurrentNetwork('🟣 Polygon (POL)');
        } else if (chainId === '0x1') {
          setCurrentNetwork('🔵 Ethereum');
        } else if (chainId === '0x13881') {
          setCurrentNetwork('🟣 Polygon Mumbai (Testnet)');
        } else if (chainId === '0xaa36a7') {
          setCurrentNetwork('🔵 Sepolia (Testnet)');
        } else {
          setCurrentNetwork('❓ Unknown Network');
        }
      } catch (error) {
        setCurrentNetwork('❓ Unknown Network');
      }
    } else {
      setCurrentNetwork('❓ No Wallet');
    }
  };

  const loadProtocols = async () => {
    try {
      const data = await ApiService.getProtocols();
      setProtocols(Object.values(data.protocols));
    } catch (error) {
      setError('Failed to load protocols');
    }
  };

  const loadUserBalances = async () => {
    if (!account) return;
    
    setLoadingBalances(true);
    setError(null); // Clear previous errors
    try {
      console.log('Starting balance loading for account:', account);
      
      // Initialize BalanceService with wallet provider
      await BalanceService.connectWallet();
      console.log('Wallet connected successfully');
      
      const balances = await BalanceService.getAllBalances(account);
      console.log('Raw balances:', balances);
      
      const usdData = await BalanceService.getUSDValue(balances);
      console.log('USD data:', usdData);
      
      setUserBalances(usdData);
      
      // Set the amount to user's total balance (but don't set to 0 if there are issues)
      if (usdData.totalUSD > 0) {
        setAmount(usdData.totalUSD);
      }
      
      console.log('Balance loading completed successfully');
    } catch (error) {
      console.error('Error loading balances:', error);
      console.warn('Balance loading failed, continuing with default amount');
      setUserBalances(null);
    } finally {
      setLoadingBalances(false);
    }
  };

  const handleOptimize = async () => {
    if (!account) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // First get the AI optimization recommendations
      const result = await ApiService.optimizePortfolio(amount, riskTolerance);
      setOptimization(result);
      
      // Now execute the actual deposit transaction
      await executeDepositTransaction(amount);
      
    } catch (error) {
      console.error('Optimization error:', error);
      setError('Failed to optimize portfolio: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const executeDepositTransaction = async (depositAmount) => {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Contract address and ABI for the AI Yield Aggregator
      const CONTRACT_ADDRESS = '0x94805547CAA2FA55d5B3A6448904Bc8a77f52CB5'; // AI Yield Aggregator contract
      const USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // Sepolia USDC
      
      // USDC contract ABI
      const usdcABI = [
        "function approve(address spender, uint256 amount) returns (bool)",
        "function balanceOf(address account) view returns (uint256)",
        "function decimals() view returns (uint8)"
      ];
      
      // AI Yield Aggregator contract ABI
      const aiAggregatorABI = [
        "function deposit(uint256 amount) external",
        "function withdraw(uint256 amount) external",
        "function getUserPosition(address user) view returns (uint256, uint256, uint256, uint256, bool)",
        "function getStats() view returns (uint256, uint256, uint256, uint256)"
      ];
      
      const usdcContract = new ethers.Contract(USDC_ADDRESS, usdcABI, signer);
      const aiAggregatorContract = new ethers.Contract(CONTRACT_ADDRESS, aiAggregatorABI, signer);
      
      // Convert amount to USDC decimals (6 decimals for USDC)
      const amountInWei = ethers.parseUnits(depositAmount.toString(), 6);
      
      // Check USDC balance
      const balance = await usdcContract.balanceOf(account);
      if (balance < amountInWei) {
        throw new Error(`Insufficient USDC balance. You have ${ethers.formatUnits(balance, 6)} USDC, trying to deposit ${depositAmount} USDC`);
      }
      
      // Approve USDC spending
      console.log('Approving USDC spending...');
      const approveTx = await usdcContract.approve(CONTRACT_ADDRESS, amountInWei);
      await approveTx.wait();
      console.log('USDC approval confirmed');
      
      // Deposit USDC to the AI Yield Aggregator (automatically farms yield)
      console.log('Depositing USDC to AI Yield Aggregator...');
      const depositTx = await aiAggregatorContract.deposit(amountInWei);
      await depositTx.wait();
      console.log('USDC deposit confirmed - AI is now farming yield!');
      
      // Show success message
      alert(`🚀 Successfully deposited ${depositAmount} USDC! The AI is now automatically farming yield across DeFi protocols. You'll earn real returns and fees will be collected from profits!`);
      
    } catch (error) {
      console.error('Transaction error:', error);
      throw new Error(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.1)', 
      padding: '30px', 
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      margin: '20px 0'
    }}>
      <h2 style={{ color: 'white', marginBottom: '20px', fontSize: '1.8rem' }}>
        AI Portfolio Optimizer
      </h2>

      {/* Network Status Display */}
      {account && (
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.2)', 
          padding: '15px', 
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            backgroundColor: '#3b82f6',
            animation: 'pulse 2s infinite'
          }} />
          <span style={{ color: 'white', fontWeight: 'bold' }}>
            Connected to: {currentNetwork}
          </span>
        </div>
      )}

      {/* User Balance Display */}
      {account && (
        <div style={{ 
          background: 'rgba(34, 197, 94, 0.2)', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#86efac', marginBottom: '15px' }}>
            💰 Your Wallet Balance
          </h3>
          
          {loadingBalances ? (
            <div style={{ color: '#e2e8f0' }}>Loading balances...</div>
          ) : userBalances ? (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>Total Portfolio Value:</span>
                <span style={{ color: '#86efac', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  ${userBalances.totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {Object.entries(userBalances.usdBalances).map(([symbol, data]) => {
                  // Get token icon
                  const getTokenIcon = (symbol) => {
                    const icons = {
                      'ETH': '🔵',
                      'POL': '🟣',
                      'MATIC': '🟣',
                      'USDC': '💙',
                      'USDT': '💚',
                      'DAI': '🟡',
                      'WETH': '🔵',
                      'WMATIC': '🟣',
                      'WBTC': '🟠',
                      'LINK': '🔗',
                      'UNI': '🦄',
                      'AAVE': '👻',
                      'CRV': '🌀',
                      'COMP': '🏛️'
                    };
                    return icons[symbol] || '💰';
                  };

                  return (
                    <div key={symbol} style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '12px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
                        {getTokenIcon(symbol)}
                      </div>
                      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        {symbol}
                      </div>
                      <div style={{ color: '#86efac', fontSize: '0.8rem', marginTop: '2px' }}>
                        ${data.usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      {data.balance && data.balance !== '0' && (
                        <div style={{ color: '#cbd5e1', fontSize: '0.7rem', marginTop: '2px' }}>
                          {parseFloat(data.balance).toFixed(4)} {symbol}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ color: '#e2e8f0' }}>
              <div style={{ marginBottom: '10px' }}>Unable to load wallet balances</div>
              <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                You can still use the optimizer by entering an amount manually below
              </div>
            </div>
          )}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={{ color: '#e2e8f0', display: 'block', marginBottom: '8px' }}>
            Investment Amount (USD)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              fontSize: '1rem'
            }}
            placeholder="Enter amount"
          />
        </div>
        
        <div>
          <label style={{ color: '#e2e8f0', display: 'block', marginBottom: '8px' }}>
            Risk Tolerance
          </label>
          <select
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              fontSize: '1rem'
            }}
          >
            <option value="low" style={{ background: '#1a202c', color: 'white' }}>Low Risk</option>
            <option value="medium" style={{ background: '#1a202c', color: 'white' }}>Medium Risk</option>
            <option value="high" style={{ background: '#1a202c', color: 'white' }}>High Risk</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleOptimize}
        disabled={loading || !account}
        style={{
          background: loading ? 'rgba(255, 255, 255, 0.3)' : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '10px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          width: '100%',
          marginBottom: '20px'
        }}
      >
        {loading ? ' AI Optimizing...' : ' Optimize Portfolio'}
      </button>

      {error && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.2)', 
          color: '#fca5a5', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          {error}
        </div>
      )}

      {optimization && (
        <div style={{ 
          background: 'rgba(34, 197, 94, 0.2)', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }}>
          <h3 style={{ color: '#86efac', marginBottom: '15px' }}>
            🎯 Advanced AI Optimization Results
          </h3>
          
          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>Expected APY</div>
              <div style={{ color: '#86efac', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {optimization.expected_apy}%
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>Daily Earnings</div>
              <div style={{ color: '#86efac', fontSize: '1.5rem', fontWeight: 'bold' }}>
                ${optimization.expected_daily}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>Monthly Earnings</div>
              <div style={{ color: '#86efac', fontSize: '1.5rem', fontWeight: 'bold' }}>
                ${optimization.expected_monthly}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>Risk Level</div>
              <div style={{ 
                color: optimization.risk_level === 'Conservative' ? '#86efac' : 
                       optimization.risk_level === 'Moderate' ? '#fbbf24' : '#f87171', 
                fontSize: '1.2rem', 
                fontWeight: 'bold' 
              }}>
                {optimization.risk_level}
              </div>
            </div>
          </div>

          {/* Advanced Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '8px' }}>
              <div style={{ color: '#e2e8f0', fontSize: '0.8rem' }}>Sharpe Ratio</div>
              <div style={{ color: '#86efac', fontSize: '1.1rem', fontWeight: 'bold' }}>
                {optimization.sharpe_ratio}
              </div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '8px' }}>
              <div style={{ color: '#e2e8f0', fontSize: '0.8rem' }}>Risk Score</div>
              <div style={{ color: '#fbbf24', fontSize: '1.1rem', fontWeight: 'bold' }}>
                {optimization.risk_score}
              </div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '8px' }}>
              <div style={{ color: '#e2e8f0', fontSize: '0.8rem' }}>Diversification</div>
              <div style={{ color: '#86efac', fontSize: '1.1rem', fontWeight: 'bold' }}>
                {optimization.diversification_score}%
              </div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '8px' }}>
              <div style={{ color: '#e2e8f0', fontSize: '0.8rem' }}>Confidence</div>
              <div style={{ color: '#86efac', fontSize: '1.1rem', fontWeight: 'bold' }}>
                {optimization.optimization_confidence}%
              </div>
            </div>
          </div>

          {/* Recommended Allocation */}
          <div>
            <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '10px', fontWeight: 'bold' }}>
              🤖 AI-Recommended Allocation:
            </div>
            {Object.entries(optimization.recommendations).map(([protocol, allocation]) => {
              const percentage = ((allocation / amount) * 100).toFixed(1);
              return (
                <div key={protocol} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <span style={{ color: 'white', textTransform: 'capitalize', fontWeight: 'bold' }}>
                      {protocol}
                    </span>
                    <div style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                      {percentage}% allocation
                    </div>
                  </div>
                  <span style={{ color: '#86efac', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    ${allocation.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {protocols.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: 'white', marginBottom: '15px' }}>
            📊 Available Protocols
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {protocols.map((protocol, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>
                  {protocol.name}
                </div>
                <div style={{ color: '#86efac', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {protocol.apy}% APY
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.8rem', marginTop: '5px' }}>
                  Risk: {protocol.risk}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}