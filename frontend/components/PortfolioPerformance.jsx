import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

export default function PortfolioPerformance({ account }) {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (account) {
      loadPortfolioPerformance();
    }
  }, [account]);

  const loadPortfolioPerformance = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiService.getPortfolioPerformance(account);
      setPerformanceData(data);
    } catch (error) {
      console.error('Error loading portfolio performance:', error);
      setError('Failed to load portfolio performance');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
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
          📊 Portfolio Performance
        </h3>
        <p style={{ color: '#e2e8f0' }}>
          Connect your wallet to view portfolio performance
        </p>
      </div>
    );
  }

  if (loading) {
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
          📊 Portfolio Performance
        </h3>
        <div style={{ color: '#e2e8f0' }}>
          Loading performance data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        padding: '30px', 
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        margin: '20px 0'
      }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>
          📊 Portfolio Performance
        </h3>
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.2)', 
          color: '#fca5a5', 
          padding: '15px', 
          borderRadius: '8px',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          {error}
        </div>
      </div>
    );
  }

  if (!performanceData) {
    return null;
  }

  const { performance_data, summary } = performanceData;

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
          📊 Portfolio Performance (30 Days)
        </h3>
        <button
          onClick={loadPortfolioPerformance}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Refresh
        </button>
      </div>

      {/* Summary Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '15px', 
        marginBottom: '25px' 
      }}>
        <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '10px' }}>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '5px' }}>Current Value</div>
          <div style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: 'bold' }}>
            {formatCurrency(summary.current_value)}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '10px' }}>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '5px' }}>Total Return</div>
          <div style={{ 
            color: summary.total_return >= 0 ? '#10b981' : '#ef4444', 
            fontSize: '1.3rem', 
            fontWeight: 'bold' 
          }}>
            {formatPercentage(summary.total_return)}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '10px' }}>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '5px' }}>Volatility</div>
          <div style={{ color: '#fbbf24', fontSize: '1.3rem', fontWeight: 'bold' }}>
            {summary.volatility}%
          </div>
        </div>
        
        <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '10px' }}>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '5px' }}>Sharpe Ratio</div>
          <div style={{ color: '#3b82f6', fontSize: '1.3rem', fontWeight: 'bold' }}>
            {summary.sharpe_ratio}
          </div>
        </div>
      </div>

      {/* Performance Chart (Simple Bar Chart) */}
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{ color: 'white', marginBottom: '15px' }}>Daily Performance</h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'end', 
          gap: '2px', 
          height: '100px',
          background: 'rgba(0, 0, 0, 0.2)',
          padding: '10px',
          borderRadius: '8px',
          overflowX: 'auto'
        }}>
          {performance_data.slice(-14).map((day, index) => {
            const height = Math.abs(day.daily_return) * 20; // Scale for visualization
            const color = day.daily_return >= 0 ? '#10b981' : '#ef4444';
            
            return (
              <div
                key={index}
                style={{
                  width: '20px',
                  height: `${Math.max(height, 2)}px`,
                  background: color,
                  borderRadius: '2px',
                  minHeight: '2px'
                }}
                title={`${day.date}: ${formatPercentage(day.daily_return)}`}
              />
            );
          })}
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '8px',
          fontSize: '0.8rem',
          color: '#cbd5e1'
        }}>
          <span>14 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Best/Worst Days */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '15px' 
      }}>
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.1)', 
          padding: '15px', 
          borderRadius: '10px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>
            🚀 Best Day
          </div>
          <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>
            {formatPercentage(summary.best_day.daily_return)}
          </div>
          <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
            {summary.best_day.date}
          </div>
        </div>
        
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          padding: '15px', 
          borderRadius: '10px',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          <div style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '8px' }}>
            📉 Worst Day
          </div>
          <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>
            {formatPercentage(summary.worst_day.daily_return)}
          </div>
          <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
            {summary.worst_day.date}
          </div>
        </div>
      </div>
    </div>
  );
}
