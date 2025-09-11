import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SimpleWallet from '../components/SimpleWallet';
import PortfolioOptimizer from '../components/PortfolioOptimizer';
import TransactionHistory from '../components/TransactionHistory';
import PortfolioPerformance from '../components/PortfolioPerformance';

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
              <p style={{ fontSize: '1.3rem', color: '#64748b' }}>
                Get started in 3 simple steps
              </p>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '40px' 
            }}>
              <div style={{ textAlign: 'center', padding: '30px' }}>
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c' }}>
                  Connect Wallet
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Connect your MetaMask or other Web3 wallet to get started with yield optimization.
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '30px' }}>
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c' }}>
                  Set Preferences
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Choose your investment amount and risk tolerance. Our AI will find the best opportunities for you.
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '30px' }}>
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#1a202c' }}>
                  Earn More
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  Watch your yields grow as our AI continuously optimizes your portfolio across the best DeFi protocols.
                </p>
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
