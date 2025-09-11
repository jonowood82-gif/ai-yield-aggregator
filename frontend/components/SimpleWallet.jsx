import React, { useState } from 'react';

export default function SimpleWallet({ onAccountChange }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        onAccountChange && onAccountChange(accounts[0]);
      } else {
        alert('Please install MetaMask to connect your wallet');
      }
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setAccount('');
    setIsConnected(false);
    onAccountChange && onAccountChange('');
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '10px 20px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'white', fontWeight: 'bold' }}>
            {formatAddress(account)}
          </div>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
            Connected
          </div>
        </div>
        <button
          onClick={handleDisconnect}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
        opacity: isConnecting ? 0.7 : 1
      }}
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}