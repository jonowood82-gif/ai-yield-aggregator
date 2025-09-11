import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleWallet from '../components/SimpleWallet';
import PortfolioOptimizer from '../components/PortfolioOptimizer';
import TransactionHistory from '../components/TransactionHistory';
import PortfolioPerformance from '../components/PortfolioPerformance';
import NetworkIndicator from '../components/NetworkIndicator';

export default function Home() {
  const [account, setAccount] = useState('');

  return (
    <>
      <Head>
        <title>AI Yield Aggregator - Maximize Your DeFi Returns</title>
        <meta name="description" content="AI-powered DeFi yield optimization platform that automatically finds the best returns across multiple protocols" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)' }}>
        {/* Network Indicator */}
        <NetworkIndicator />
        
        {/* Navigation */}
        <nav style={{ padding: '20px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.5rem'
                }}>
                  ⚡
                </div>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>
                  YieldAI
                </span>
              </div>
              <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <a href="#features" style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '1.1rem' }}>
                  Features
                </a>
                <a href="#pricing" style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '1.1rem' }}>
                  Pricing
                </a>
                <a href="#how-it-works" style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '1.1rem' }}>
                  How It Works
                </a>
                <a href="#how-to" style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '1.1rem' }}>
                  How To
                </a>
                <SimpleWallet onAccountChange={setAccount} />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: 'bold', 
              color: 'white', 
              marginBottom: '20px',
              lineHeight: '1.1'
            }}>
              🚀 AI Yield Aggregator
            </h1>
            <p style={{ 
              fontSize: '1.5rem', 
              color: '#e2e8f0', 
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Maximize Your DeFi Yields with AI
            </p>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#cbd5e1', 
              marginBottom: '50px',
              maxWidth: '700px',
              margin: '0 auto 50px',
              lineHeight: '1.6'
            }}>
              Our advanced AI algorithms automatically find the best yield opportunities across 50+ DeFi protocols, 
              optimizing your portfolio for maximum returns while managing risk.
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '30px', 
              marginBottom: '50px',
              maxWidth: '800px',
              margin: '0 auto 50px'
            }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(10px)', 
                borderRadius: '15px', 
                padding: '30px' 
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>
                  $2.4B
                </div>
                <div style={{ color: '#e2e8f0' }}>Total Value Locked</div>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(10px)', 
                borderRadius: '15px', 
                padding: '30px' 
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>
                  1,247
                </div>
                <div style={{ color: '#e2e8f0' }}>Active Users</div>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(10px)', 
                borderRadius: '15px', 
                padding: '30px' 
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>
                  50+
                </div>
                <div style={{ color: '#e2e8f0' }}>Supported Protocols</div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Optimizer */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <PortfolioOptimizer account={account} />
        </div>

        {/* Transaction History and Performance */}
        {account && (
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <TransactionHistory account={account} />
            <PortfolioPerformance account={account} />
          </div>
        )}

        {/* Features Section */}
        <div id="features" style={{ padding: '80px 0', background: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '20px' }}>
                Why Choose YieldAI?
              </h2>
              <p style={{ fontSize: '1.3rem', color: '#64748b' }}>
                Advanced AI technology meets DeFi expertise
              </p>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '40px' 
            }}>
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 20px',
                  fontSize: '2rem'
                }}>
                  ⚡
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c' }}>
                  AI-Powered Optimization
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Machine learning algorithms continuously analyze market conditions and automatically rebalance your portfolio for maximum returns.
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 20px',
                  fontSize: '2rem'
                }}>
                  🛡️
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c' }}>
                  Risk Management
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Advanced risk assessment protects your funds while maximizing yield opportunities across multiple protocols.
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 20px',
                  fontSize: '2rem'
                }}>
                  📊
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c' }}>
                  Multi-Protocol Support
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Access the best yields across Compound, Aave, Yearn, Curve, and 50+ other DeFi protocols from a single interface.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" style={{ padding: '80px 0', background: '#f8fafc' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '20px' }}>
                How It Works
              </h2>
              <p style={{ fontSize: '1.3rem', color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>
                Our AI-powered platform automatically finds the best yield opportunities across multiple DeFi protocols, 
                optimizing your portfolio for maximum returns while managing risk.
              </p>
            </div>
            
            {/* AI Process Flow */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '30px',
              marginBottom: '60px'
            }}>
              <div style={{ 
                background: 'white', 
                borderRadius: '15px', 
                padding: '30px', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '20px',
                  fontSize: '1.5rem'
                }}>
                  🔍
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c' }}>
                  Market Analysis
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Our AI continuously monitors 50+ DeFi protocols including Compound, Aave, Yearn, and Curve Finance, 
                  analyzing real-time APY rates, liquidity, and risk factors.
                </p>
              </div>
              
              <div style={{ 
                background: 'white', 
                borderRadius: '15px', 
                padding: '30px', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '20px',
                  fontSize: '1.5rem'
                }}>
                  🧠
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c' }}>
                  AI Optimization
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Advanced algorithms calculate optimal portfolio allocation using Modern Portfolio Theory, 
                  considering risk-adjusted returns, Sharpe ratios, and diversification benefits.
                </p>
              </div>
              
              <div style={{ 
                background: 'white', 
                borderRadius: '15px', 
                padding: '30px', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '20px',
                  fontSize: '1.5rem'
                }}>
                  ⚡
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c' }}>
                  Auto-Execution
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Once you approve the recommended strategy, our smart contracts automatically execute trades 
                  across multiple protocols to optimize your yield in real-time.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div style={{ 
              background: 'white', 
              borderRadius: '20px', 
              padding: '40px', 
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px', color: '#1a202c', textAlign: 'center' }}>
                Key Features
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '25px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    🛡️
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px', color: '#1a202c' }}>
                      Risk Management
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Advanced risk scoring and diversification to protect your investments
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    📊
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px', color: '#1a202c' }}>
                      Real-time Analytics
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Live portfolio performance tracking and detailed analytics
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    🔄
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px', color: '#1a202c' }}>
                      Multi-Chain Support
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Optimize across Ethereum and Polygon networks
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    💰
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px', color: '#1a202c' }}>
                      Gas Optimization
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Smart batching and gas optimization to minimize transaction costs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How To Get Started Section */}
        <div id="how-to" style={{ padding: '80px 0', background: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '20px' }}>
                How To Get Started
              </h2>
              <p style={{ fontSize: '1.3rem', color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>
                New to DeFi? No problem! Follow our beginner-friendly guide to start earning optimized yields.
              </p>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '40px' 
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
                borderRadius: '15px', 
                padding: '30px',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 20px',
                  fontSize: '1.5rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c', textAlign: 'center' }}>
                  Set Up Your Wallet
                </h3>
                <div style={{ color: '#64748b', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Install MetaMask:</strong> Download the MetaMask browser extension or mobile app
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Create Account:</strong> Set up your wallet and securely store your seed phrase
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Add Funds:</strong> Buy ETH or MATIC from an exchange and send to your wallet
                  </p>
                  <p>
                    <strong>Connect:</strong> Click "Connect Wallet" on our platform
                  </p>
                </div>
              </div>
              
              <div style={{ 
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
                borderRadius: '15px', 
                padding: '30px',
                border: '2px solid #bbf7d0'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 20px',
                  fontSize: '1.5rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c', textAlign: 'center' }}>
                  Choose Your Strategy
                </h3>
                <div style={{ color: '#64748b', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Investment Amount:</strong> Enter how much you want to invest (minimum $100)
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Risk Level:</strong> Choose Conservative, Moderate, or Aggressive
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Network:</strong> Select Ethereum or Polygon (lower fees)
                  </p>
                  <p>
                    <strong>Review:</strong> Check the AI's recommended allocation
                  </p>
                </div>
              </div>
              
              <div style={{ 
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', 
                borderRadius: '15px', 
                padding: '30px',
                border: '2px solid #fbbf24'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 20px',
                  fontSize: '1.5rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c', textAlign: 'center' }}>
                  Start Earning
                </h3>
                <div style={{ color: '#64748b', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Approve Strategy:</strong> Review and approve the AI's recommendations
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Execute Trades:</strong> Confirm transactions in your wallet
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Monitor Performance:</strong> Track your yields in real-time
                  </p>
                  <p>
                    <strong>Auto-Optimize:</strong> Let AI rebalance as market conditions change
                  </p>
                </div>
              </div>
            </div>

            {/* Beginner Tips */}
            <div style={{ 
              background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)', 
              borderRadius: '20px', 
              padding: '40px', 
              marginTop: '60px',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>
                💡 Beginner Tips
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '25px' 
              }}>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                    🚀 Start Small
                  </h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9 }}>
                    Begin with a small amount ($100-500) to learn the platform and understand how DeFi works before investing larger sums.
                  </p>
                </div>
                
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                    ⛽ Gas Fees
                  </h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9 }}>
                    Ethereum gas fees can be high. Consider using Polygon network for lower fees, especially for smaller investments.
                  </p>
                </div>
                
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                    📚 Learn DeFi
                  </h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9 }}>
                    Understand basic DeFi concepts like liquidity pools, yield farming, and impermanent loss to make informed decisions.
                  </p>
                </div>
                
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                    🔒 Security First
                  </h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9 }}>
                    Never share your seed phrase, use hardware wallets for large amounts, and always verify contract addresses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" style={{ padding: '80px 0', background: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '20px' }}>
                Simple, Transparent Pricing
              </h2>
              <p style={{ fontSize: '1.3rem', color: '#64748b' }}>
                Choose the plan that fits your needs
              </p>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '30px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              <div style={{ 
                background: 'white', 
                border: '2px solid #e2e8f0', 
                borderRadius: '20px', 
                padding: '40px 30px',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#1a202c' }}>
                  Free
                </h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '20px' }}>
                  $0<span style={{ fontSize: '1rem', color: '#64748b' }}>/month</span>
                </div>
                <p style={{ color: '#64748b', marginBottom: '30px' }}>
                  + 0.5% performance fee
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span>
                    Basic AI optimization
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span>
                    Up to $10k portfolio
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span>
                    Community support
                  </li>
                </ul>
                <Link href="/dashboard" style={{ 
                  width: '100%', 
                  background: '#3b82f6', 
                  color: 'white', 
                  padding: '15px', 
                  borderRadius: '10px', 
                  textAlign: 'center', 
                  display: 'block',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}>
                  Get Started
                </Link>
              </div>
              
              <div style={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
                borderRadius: '20px', 
                padding: '40px 30px',
                textAlign: 'center',
                color: 'white',
                transform: 'scale(1.05)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  Premium
                </h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
                  $99<span style={{ fontSize: '1rem', opacity: 0.8 }}>/month</span>
                </div>
                <p style={{ opacity: 0.9, marginBottom: '30px' }}>
                  + 0.25% performance fee
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#86efac', marginRight: '10px' }}>✓</span>
                    Advanced AI optimization
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#86efac', marginRight: '10px' }}>✓</span>
                    Up to $100k portfolio
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#86efac', marginRight: '10px' }}>✓</span>
                    Auto-rebalancing
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#86efac', marginRight: '10px' }}>✓</span>
                    Priority support
                  </li>
                </ul>
                <Link href="/dashboard" style={{ 
                  width: '100%', 
                  background: 'white', 
                  color: '#3b82f6', 
                  padding: '15px', 
                  borderRadius: '10px', 
                  textAlign: 'center', 
                  display: 'block',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}>
                  Go Premium
                </Link>
              </div>
              
              <div style={{ 
                background: 'white', 
                border: '2px solid #e2e8f0', 
                borderRadius: '20px', 
                padding: '40px 30px',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#1a202c' }}>
                  Pro
                </h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '20px' }}>
                  $299<span style={{ fontSize: '1rem', color: '#64748b' }}>/month</span>
                </div>
                <p style={{ color: '#64748b', marginBottom: '30px' }}>
                  + 0.25% performance fee
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span>
                    Everything in Premium
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span>
                    White-label access
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span>
                    API access
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span>
                    Dedicated support
                  </li>
                </ul>
                <Link href="/dashboard" style={{ 
                  width: '100%', 
                  background: '#1a202c', 
                  color: 'white', 
                  padding: '15px', 
                  borderRadius: '10px', 
                  textAlign: 'center', 
                  display: 'block',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}>
                  Go Pro
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ padding: '80px 0', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '0 20px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>
              Ready to Maximize Your Yields?
            </h2>
            <p style={{ fontSize: '1.3rem', color: '#e0e7ff', marginBottom: '40px' }}>
              Join thousands of users already earning more with AI-powered DeFi optimization.
            </p>
            <Link href="/dashboard" style={{ 
              background: 'white', 
              color: '#3b82f6', 
              padding: '20px 40px', 
              borderRadius: '12px', 
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              Start Earning Now
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
