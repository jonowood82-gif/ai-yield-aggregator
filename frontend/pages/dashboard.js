import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ethers } from 'ethers';

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState({
    totalValue: 0,
    totalYield: 0,
    dailyEarnings: 0,
    strategies: []
  });
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [contractBalance, setContractBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Contract addresses
  const CONTRACT_ADDRESS = '0x000E7780560412B866C9346C78A30D9A82F67838'; // Enhanced contract with USDC support
  const USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // Sepolia USDC
  
  const CONTRACT_ABI = [
    {
      "inputs": [{"internalType": "address", "name": "_usdcAddress", "type": "address"}],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{"internalType": "address", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
      "name": "depositUSDC",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
      "name": "getUserTotalBalance",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const USDC_ABI = [
    {
      "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
      "name": "approve",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setWalletConnected(true);
        await loadBalances(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet');
      }
    } else {
      alert('MetaMask is not installed');
    }
  };

  const loadBalances = async (userAccount) => {
    if (!userAccount) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Load USDC balance
      const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);
      const usdcBalance = await usdcContract.balanceOf(userAccount);
      setUsdcBalance(parseFloat(ethers.formatUnits(usdcBalance, 6))); // USDC has 6 decimals
      
      // Load contract balance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const contractBalance = await contract.getUserTotalBalance(userAccount);
      setContractBalance(parseFloat(ethers.formatUnits(contractBalance, 6)));
      
    } catch (error) {
      console.error('Error loading balances:', error);
    }
  };

  const depositUSDC = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsDepositing(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const amount = ethers.parseUnits(depositAmount, 6); // USDC has 6 decimals
      
      // Approve USDC spending
      const approveTx = await usdcContract.approve(CONTRACT_ADDRESS, amount);
      await approveTx.wait();
      
      // Deposit to contract
      const depositTx = await contract.depositUSDC(amount);
      await depositTx.wait();
      
      // Reload balances
      await loadBalances(account);
      setDepositAmount('');
      
      alert(`Successfully deposited ${depositAmount} USDC!`);
      
    } catch (error) {
      console.error('Error depositing USDC:', error);
      alert('Failed to deposit USDC');
    } finally {
      setIsDepositing(false);
    }
  };

  const withdrawUSDC = async () => {
    if (contractBalance <= 0) {
      alert('No funds to withdraw');
      return;
    }

    setIsWithdrawing(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      // Withdraw all available balance
      const withdrawTx = await contract.withdrawUSDC(ethers.parseUnits(contractBalance.toString(), 6));
      await withdrawTx.wait();
      
      // Reload balances
      await loadBalances(account);
      
      alert(`Successfully withdrew ${contractBalance.toFixed(2)} USDC!`);
      
    } catch (error) {
      console.error('Error withdrawing USDC:', error);
      alert('Failed to withdraw USDC: ' + error.message);
    } finally {
      setIsWithdrawing(false);
    }
  };

  useEffect(() => {
    // Simulate loading portfolio data
    setTimeout(() => {
      setPortfolio({
        totalValue: 125000,
        totalYield: 12.8,
        dailyEarnings: 43.84,
        strategies: [
          { protocol: 'Compound', apy: 8.5, allocation: 0.4, value: 50000 },
          { protocol: 'Aave', apy: 12.3, allocation: 0.3, value: 37500 },
          { protocol: 'Yearn', apy: 15.2, allocation: 0.2, value: 25000 },
          { protocol: 'Curve', apy: 18.7, allocation: 0.1, value: 12500 }
        ]
      });
    }, 1000);
  }, []);

  if (!walletConnected) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: 'rgba(255,255,255,0.2)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px',
            fontSize: '2rem'
          }}>
            🔗
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Connect Your Wallet</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.8 }}>
            Connect your wallet to access the AI yield optimizer
          </p>
          <button 
            onClick={connectWallet}
            style={{
              background: 'white',
              color: '#667eea',
              padding: '15px 30px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#f0f0f0'}
            onMouseOut={(e) => e.target.style.background = 'white'}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - AI Yield Aggregator</title>
        <meta name="description" content="Manage your DeFi portfolio with AI optimization" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
        {/* Header */}
        <div style={{ 
          background: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          borderBottom: '1px solid #e2e8f0',
          padding: '20px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  borderRadius: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px'
                }}>
                  ��
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>
                  YieldAI Dashboard
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  background: '#10b981', 
                  color: 'white', 
                  padding: '8px 16px', 
                  borderRadius: '20px', 
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : '0x1234...5678'}
                </div>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  cursor: 'pointer',
                  color: '#64748b'
                }}>
                  ⚙️
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Portfolio Overview */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px', 
            marginBottom: '40px' 
          }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '15px', 
              padding: '30px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#10b981', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.5rem'
                }}>
                  ��
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Total Value</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                    ${portfolio.totalValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '15px', 
              padding: '30px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#3b82f6', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.5rem'
                }}>
                  ��
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Total APY</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                    {portfolio.totalYield}%
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '15px', 
              padding: '30px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#8b5cf6', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.5rem'
                }}>
                  ��
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Daily Earnings</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                    ${portfolio.dailyEarnings.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '15px', 
              padding: '30px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#f59e0b', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.5rem'
                }}>
                  🛡️
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Risk Score</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                    Low
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* USDC Deposit Section */}
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '10px' }}>
              💰 USDC Management
            </h3>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>
              Deposit USDC to start earning with AI optimization
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px', 
              marginBottom: '30px' 
            }}>
              <div style={{ 
                background: '#f0f9ff', 
                padding: '20px', 
                borderRadius: '15px',
                border: '1px solid #0ea5e9'
              }}>
                <h4 style={{ color: '#0369a1', margin: '0 0 10px 0' }}>Wallet USDC</h4>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                  {usdcBalance.toFixed(2)} USDC
                </p>
              </div>
              
              <div style={{ 
                background: '#f0fdf4', 
                padding: '20px', 
                borderRadius: '15px',
                border: '1px solid #22c55e'
              }}>
                <h4 style={{ color: '#15803d', margin: '0 0 10px 0' }}>In Contract</h4>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                  {contractBalance.toFixed(2)} USDC
                </p>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              alignItems: 'end',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <label style={{ 
                  display: 'block', 
                  color: '#374151', 
                  fontSize: '0.9rem', 
                  fontWeight: '500', 
                  marginBottom: '8px' 
                }}>
                  Deposit Amount (USDC)
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              
              <button
                onClick={depositUSDC}
                disabled={isDepositing || !depositAmount || parseFloat(depositAmount) <= 0}
                style={{
                  background: isDepositing ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: isDepositing ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s',
                  minWidth: '120px'
                }}
                onMouseOver={(e) => !isDepositing && (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => !isDepositing && (e.target.style.transform = 'scale(1)')}
              >
                {isDepositing ? '⏳ Depositing...' : '💰 Deposit'}
              </button>
            </div>
            
            {contractBalance > 0 && (
              <div style={{ 
                background: '#fef3c7', 
                padding: '15px', 
                borderRadius: '10px', 
                marginTop: '20px',
                border: '1px solid #f59e0b'
              }}>
                <p style={{ color: '#d97706', margin: 0, fontSize: '0.9rem' }}>
                  💡 You have {contractBalance.toFixed(2)} USDC in the contract. The AI will optimize this for maximum yield!
                </p>
              </div>
            )}

            {/* Withdraw Section */}
            {contractBalance > 0 && (
              <div style={{ 
                background: '#fef2f2', 
                padding: '20px', 
                borderRadius: '10px', 
                marginTop: '20px',
                border: '1px solid #fca5a5'
              }}>
                <h4 style={{ color: '#dc2626', margin: '0 0 15px 0', fontSize: '1.1rem' }}>
                  💸 Withdraw Funds
                </h4>
                <p style={{ color: '#991b1b', margin: '0 0 15px 0', fontSize: '0.9rem' }}>
                  Withdraw your USDC from the contract
                </p>
                <button
                  onClick={withdrawUSDC}
                  disabled={isWithdrawing}
                  style={{
                    background: isWithdrawing ? '#9ca3af' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: isWithdrawing ? 'not-allowed' : 'pointer',
                    transition: 'transform 0.2s',
                    minWidth: '120px'
                  }}
                  onMouseOver={(e) => !isWithdrawing && (e.target.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => !isWithdrawing && (e.target.style.transform = 'scale(1)')}
                >
                  {isWithdrawing ? '⏳ Withdrawing...' : `💰 Withdraw ${contractBalance.toFixed(2)} USDC`}
                </button>
              </div>
            )}
          </div>

          {/* AI Optimization Section */}
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '10px' }}>
              🤖 AI Yield Optimization
            </h3>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>
              Let our AI find the best yield opportunities for you
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '15px', 
              marginBottom: '30px' 
            }}>
              <button style={{
                padding: '20px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '5px' }}>
                    Conservative
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    Lower risk, stable returns
                  </div>
                </div>
              </button>

              <button style={{
                padding: '20px',
                border: '2px solid #3b82f6',
                borderRadius: '10px',
                background: '#eff6ff',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '5px' }}>
                    Moderate
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#3b82f6' }}>
                    Balanced risk and return
                  </div>
                </div>
              </button>

              <button style={{
                padding: '20px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '5px' }}>
                    Aggressive
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    Higher risk, maximum returns
                  </div>
                </div>
              </button>
            </div>

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              �� Optimize Portfolio
            </button>
          </div>

          {/* Active Strategies */}
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '10px' }}>
              �� Active Strategies
            </h3>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>
              AI-optimized allocation across DeFi protocols
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {portfolio.strategies.map((strategy, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '20px', 
                  background: '#f8fafc', 
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                      borderRadius: '10px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginRight: '15px',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}>
                      {strategy.protocol[0]}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 'bold', color: '#1a202c', margin: '0 0 5px 0' }}>
                        {strategy.protocol}
                      </h4>
                      <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
                        {(strategy.allocation * 100).toFixed(1)}% allocation
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold', color: '#1a202c', margin: '0 0 5px 0', fontSize: '1.1rem' }}>
                      {strategy.apy}% APY
                    </p>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
                      ${strategy.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
