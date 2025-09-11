import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 125000,
    totalYield: 12.8,
    dailyEarnings: 43.84,
    strategies: [
      { protocol: 'Compound', apy: 8.5, allocation: 0.4, value: 50000, change: 2.3 },
      { protocol: 'Aave', apy: 12.3, allocation: 0.3, value: 37500, change: 1.8 },
      { protocol: 'Yearn', apy: 15.2, allocation: 0.2, value: 25000, change: 3.1 },
      { protocol: 'Curve', apy: 18.7, allocation: 0.1, value: 12500, change: 4.2 }
    ]
  });

  const [aiInsights, setAiInsights] = useState([
    {
      type: 'opportunity',
      title: 'High Yield Opportunity Detected',
      description: 'Curve protocol showing 18.7% APY with low risk. Consider increasing allocation.',
      impact: 'high',
      action: 'Increase Curve allocation to 15%'
    },
    {
      type: 'warning',
      title: 'Risk Alert: Market Volatility',
      description: 'Recent market conditions suggest reducing exposure to higher-risk protocols.',
      impact: 'medium',
      action: 'Consider rebalancing to more stable protocols'
    },
    {
      type: 'success',
      title: 'Portfolio Optimization Complete',
      description: 'AI successfully rebalanced your portfolio, increasing yield by 0.8%.',
      impact: 'high',
      action: 'Portfolio automatically optimized'
    }
  ]);

  return (
    <>
      <Head>
        <title>Analytics - AI Yield Aggregator</title>
        <meta name="description" content="Advanced analytics and performance tracking for your DeFi portfolio" />
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
                    
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>
                  YieldAI Analytics
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Link href="/dashboard" style={{ 
                  color: '#64748b', 
                  textDecoration: 'none',
                  fontSize: '1rem'
                }}>
                  ← Back to Dashboard
                </Link>
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
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Key Metrics */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px', 
            marginBottom: '40px' 
          }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '15px', 
              padding: '25px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: '#10b981', 
                  borderRadius: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.2rem'
                }}>
                    
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Total Value</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                    ${portfolioData.totalValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '15px', 
              padding: '25px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: '#3b82f6', 
                  borderRadius: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.2rem'
                }}>
                    
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Current APY</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                    {portfolioData.totalYield}%
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '15px', 
              padding: '25px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: '#8b5cf6', 
                  borderRadius: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.2rem'
                }}>
                  ⏰
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Daily Earnings</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                    ${portfolioData.dailyEarnings.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '15px', 
              padding: '25px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: '#f59e0b', 
                  borderRadius: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.2rem'
                }}>
                    
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Performance</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                    +25.0%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '20px' }}>
              🤖 AI Insights & Recommendations
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {aiInsights.map((insight, index) => (
                <div key={index} style={{ 
                  padding: '20px', 
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: insight.type === 'warning' ? '#fef3c7' : 
                            insight.type === 'success' ? '#d1fae5' : '#eff6ff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginRight: '15px',
                      fontSize: '1rem',
                      background: insight.type === 'warning' ? '#f59e0b' : 
                                insight.type === 'success' ? '#10b981' : '#3b82f6',
                      color: 'white'
                    }}>
                      {insight.type === 'warning' ? '⚠️' : 
                       insight.type === 'success' ? '✅' : '💡'}
                    </div>
                    <h4 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      color: '#1a202c', 
                      margin: 0 
                    }}>
                      {insight.title}
                    </h4>
                    <div style={{ 
                      marginLeft: 'auto',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      background: insight.impact === 'high' ? '#dc2626' : 
                                insight.impact === 'medium' ? '#f59e0b' : '#10b981',
                      color: 'white'
                    }}>
                      {insight.impact.toUpperCase()}
                    </div>
                  </div>
                  <p style={{ color: '#64748b', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                    {insight.description}
                  </p>
                  <div style={{ 
                    padding: '8px 16px', 
                    background: '#f8fafc', 
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    color: '#374151',
                    fontWeight: '500'
                  }}>
                    💡 <strong>Action:</strong> {insight.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protocol Performance */}
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '20px' }}>
              🏆 Protocol Performance
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {portfolioData.strategies.map((strategy, index) => (
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: 'bold', color: '#1a202c', margin: '0 0 5px 0', fontSize: '1.1rem' }}>
                        {strategy.apy}% APY
                      </p>
                      <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
                        Current Yield
                      </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: 'bold', color: '#10b981', margin: '0 0 5px 0', fontSize: '1.1rem' }}>
                        +{strategy.change}%
                      </p>
                      <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
                        7d Change
                      </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: 'bold', color: '#1a202c', margin: '0 0 5px 0', fontSize: '1.1rem' }}>
                        ${strategy.value.toLocaleString()}
                      </p>
                      <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
                        Value
                      </p>
                    </div>
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