import React, { useState, useEffect } from 'react';

export default function SimpleWallet({ onAccountChange }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [showNetworkSelector, setShowNetworkSelector] = useState(false);

  // Polygon network configuration
  const polygonNetwork = {
    chainId: '0x89', // 137 in hex
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  };

  // Ethereum network configuration
  const ethereumNetwork = {
    chainId: '0x1', // 1 in hex
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io/'],
  };

  // Sepolia testnet configuration
  const sepoliaNetwork = {
    chainId: '0xaa36a7', // 11155111 in hex
    chainName: 'Sepolia',
    nativeCurrency: {
      name: 'SepoliaETH',
      symbol: 'SepoliaETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
  };

  // Check current network
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
        if (chainId === '0x89') {
          setNetwork('Polygon');
        } else if (chainId === '0x1') {
          setNetwork('Ethereum');
        } else if (chainId === '0xaa36a7') {
          setNetwork('Sepolia');
        } else {
          setNetwork('Unknown');
        }
      });
    }
  }, []);

  // Switch to Polygon network
  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: polygonNetwork.chainId }],
      });
      setNetwork('Polygon');
    } catch (switchError) {
      // If the network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [polygonNetwork],
          });
          setNetwork('Polygon');
        } catch (addError) {
          console.error('Failed to add Polygon network:', addError);
        }
      }
    }
  };

  // Switch to Ethereum network
  const switchToEthereum = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethereumNetwork.chainId }],
      });
      setNetwork('Ethereum');
    } catch (error) {
      console.error('Failed to switch to Ethereum:', error);
    }
  };

  // Switch to Sepolia testnet
  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: sepoliaNetwork.chainId }],
      });
      setNetwork('Sepolia');
    } catch (error) {
      console.error('Failed to switch to Sepolia:', error);
    }
  };

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
        
        // Check current network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId === '0x89') {
          setNetwork('Polygon');
        } else if (chainId === '0x1') {
          setNetwork('Ethereum');
        } else if (chainId === '0xaa36a7') {
          setNetwork('Sepolia');
        } else {
          setNetwork('Unknown');
        }
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
            Connected to {network}
          </div>
        </div>
        
        {/* Network Selector */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNetworkSelector(!showNetworkSelector)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            {network === 'Polygon' ? '🟣' : '🔵'} {network}
            <span>▼</span>
          </button>
          
          {showNetworkSelector && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '10px',
              minWidth: '150px',
              zIndex: 1000
            }}>
              <button
                onClick={() => {
                  switchToEthereum();
                  setShowNetworkSelector(false);
                }}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🔵 Ethereum
              </button>
              <button
                onClick={() => {
                  switchToPolygon();
                  setShowNetworkSelector(false);
                }}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🟣 Polygon
              </button>
              <button
                onClick={() => {
                  switchToSepolia();
                  setShowNetworkSelector(false);
                }}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🧪 Sepolia (Testnet)
              </button>
            </div>
          )}
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