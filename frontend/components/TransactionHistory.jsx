import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

export default function TransactionHistory({ account }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (account) {
      loadTransactionHistory();
    }
  }, [account]);

  const loadTransactionHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiService.getTransactionHistory(account);
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error loading transaction history:', error);
      setError('Failed to load transaction history');
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return '📈';
      case 'withdrawal': return '📉';
      case 'rebalance': return '🔄';
      default: return '💱';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit': return '#10b981';
      case 'withdrawal': return '#ef4444';
      case 'rebalance': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount, token) => {
    if (amount === 0) return 'Portfolio Rebalance';
    return `$${amount.toLocaleString()} ${token}`;
  };

  if (!account) {
    return (
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        padding: '30px', 
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        margin: '20px 0',
        textAlign: 'center'
      }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>
          📋 Transaction History
        </h3>
        <p style={{ color: '#e2e8f0' }}>
          Connect your wallet to view transaction history
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.1)', 
      padding: '30px', 
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      margin: '20px 0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: 'white', margin: 0 }}>
          📋 Transaction History
        </h3>
        <button
          onClick={loadTransactionHistory}
          disabled={loading}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

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

      {loading ? (
        <div style={{ textAlign: 'center', color: '#e2e8f0' }}>
          Loading transaction history...
        </div>
      ) : transactions.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#e2e8f0' }}>
          No transactions found
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  fontSize: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '8px',
                  borderRadius: '8px'
                }}>
                  {getTransactionIcon(tx.type)}
                </div>
                <div>
                  <div style={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    marginBottom: '4px'
                  }}>
                    {tx.type} - {tx.protocol}
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    {formatDate(tx.timestamp)}
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  color: getTransactionColor(tx.type),
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}>
                  {formatAmount(tx.amount, tx.token)}
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                  APY: {tx.apy_at_time}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {transactions.length > 0 && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
            Total Transactions: <span style={{ color: 'white', fontWeight: 'bold' }}>{transactions.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
