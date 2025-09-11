import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Settings() {
  const [settings, setSettings] = useState({
    riskTolerance: 'moderate',
    autoRebalance: true,
    notifications: {
      email: true,
      push: false
    }
  });

  return (
    <>
      <Head>
        <title>Settings - AI Yield Aggregator</title>
        <meta name="description" content="Manage your account settings and preferences" />
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
                  ⚙️
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>
                  Settings
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

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Account Settings */}
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '20px' }}>
              👤 Account Settings
            </h3>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Risk Tolerance
              </label>
              <select
                value={settings.riskTolerance}
                onChange={(e) => setSettings({...settings, riskTolerance: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  background: 'white'
                }}
              >
                <option value="conservative">Conservative - Lower risk, stable returns</option>
                <option value="moderate">Moderate - Balanced risk and return</option>
                <option value="aggressive">Aggressive - Higher risk, maximum returns</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.autoRebalance}
                  onChange={(e) => setSettings({...settings, autoRebalance: e.target.checked})}
                  style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                />
                <span style={{ fontWeight: '500', color: '#374151' }}>
                  Enable Auto-Rebalancing
                </span>
              </label>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
                Automatically rebalance your portfolio when better opportunities are detected
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => alert('Settings saved!')}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
                padding: '15px 40px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}