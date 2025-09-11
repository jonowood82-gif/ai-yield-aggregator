import React, { useState, useEffect } from 'react';

export default function NetworkIndicator() {
  const [network, setNetwork] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkNetwork = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          setIsConnected(accounts.length > 0);
          
          if (chainId === '0x89') { // Polygon Mainnet
            setNetwork('Polygon');
          } else if (chainId === '0x1') { // Ethereum Mainnet
            setNetwork('Ethereum');
          } else if (chainId === '0x13881') { // Polygon Mumbai Testnet
            setNetwork('Polygon Mumbai');
          } else if (chainId === '0xaa36a7') { // Sepolia Testnet
            setNetwork('Sepolia');
          } else {
            setNetwork('Unknown Network');
          }
        } catch (error) {
          console.error('Error checking network:', error);
        }
      }
    };

    checkNetwork();

    // Listen for network changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        if (chainId === '0x89') {
          setNetwork('Polygon');
        } else if (chainId === '0x1') {
          setNetwork('Ethereum');
        } else if (chainId === '0x13881') {
          setNetwork('Polygon Mumbai');
        } else if (chainId === '0xaa36a7') {
          setNetwork('Sepolia');
        } else {
          setNetwork('Unknown Network');
        }
      });

      window.ethereum.on('accountsChanged', (accounts) => {
        setIsConnected(accounts.length > 0);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('chainChanged');
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  if (!isConnected) {
    return null; // Don't show network indicator if wallet not connected
  }

  const getNetworkColor = () => {
    switch (network) {
      case 'Polygon':
        return '#8247e5'; // Polygon purple
      case 'Ethereum':
        return '#627eea'; // Ethereum blue
      case 'Polygon Mumbai':
        return '#8247e5';
      case 'Sepolia':
        return '#627eea';
      default:
        return '#ef4444'; // Red for unknown
    }
  };

  const getNetworkIcon = () => {
    switch (network) {
      case 'Polygon':
        return '🟣';
      case 'Ethereum':
        return '🔵';
      case 'Polygon Mumbai':
        return '🟣';
      case 'Sepolia':
        return '🔵';
      default:
        return '❓';
    }
  };

  const isTestnet = network.includes('Mumbai') || network.includes('Sepolia');

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      border: `2px solid ${getNetworkColor()}`,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#1a202c',
      minWidth: '140px'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: getNetworkColor(),
        animation: 'pulse 2s infinite'
      }} />
      <span style={{ fontSize: '1.1rem' }}>
        {getNetworkIcon()}
      </span>
      <div>
        <div style={{ 
          color: getNetworkColor(),
          fontSize: '0.85rem',
          fontWeight: 'bold'
        }}>
          {network}
        </div>
        {isTestnet && (
          <div style={{ 
            color: '#f59e0b',
            fontSize: '0.7rem',
            fontWeight: '500'
          }}>
            TESTNET
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
