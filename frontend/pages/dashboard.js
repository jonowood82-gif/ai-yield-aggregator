import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState({
    totalValue: 0,
    totalYield: 0,
    dailyEarnings: 0,
    strategies: []
  });
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

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
      setWalletConnected(true);
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
            onClick={() => setWalletConnected(true)}
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
                  0x1234...5678
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
