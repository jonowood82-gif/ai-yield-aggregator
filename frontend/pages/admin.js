import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function Admin() {
  const [account, setAccount] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feeInfo, setFeeInfo] = useState({
    totalFees: '0',
    collectedFees: '0',
    pendingFees: '0'
  });
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Admin wallet addresses (add your wallet address here)
  const ADMIN_ADDRESSES = [
    '0xFB4d1Ab9435C08Ff0094eaE4e98cE3A9904f4EDC', // Your wallet address
    // Add more admin addresses if needed
  ];

  useEffect(() => {
    checkAdminStatus();
    loadFeeInfo();
  }, [account]);

  const checkAdminStatus = async () => {
    if (typeof window.ethereum !== 'undefined' && account) {
      const isAdminWallet = ADMIN_ADDRESSES.includes(account.toLowerCase());
      setIsAdmin(isAdminWallet);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet');
      }
    } else {
      alert('MetaMask is not installed');
    }
  };

  const loadFeeInfo = async () => {
    // This would connect to your smart contract to get fee information
    // For now, we'll simulate the data
    setFeeInfo({
      totalFees: '0.5',
      collectedFees: '2.3',
      pendingFees: '0.5'
    });
  };

  const collectFees = async () => {
    if (!isAdmin) {
      alert('Only admin can collect fees');
      return;
    }

    setIsLoading(true);
    try {
      // This would call your smart contract's collectFees function
      // For now, we'll simulate the transaction
      
      // Simulate contract interaction
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Your smart contract address and ABI would go here
      // const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      // const tx = await contract.collectFees();
      // await tx.wait();
      
      // Simulate successful collection
      setTimeout(() => {
        setFeeInfo(prev => ({
          ...prev,
          collectedFees: (parseFloat(prev.collectedFees) + parseFloat(prev.pendingFees)).toFixed(2),
          pendingFees: '0'
        }));
        
        setTransactionHistory(prev => [{
          id: Date.now(),
          amount: feeInfo.pendingFees,
          timestamp: new Date().toLocaleString(),
          txHash: '0x' + Math.random().toString(16).substr(2, 64),
          status: 'Success'
        }, ...prev]);
        
        setIsLoading(false);
        alert(`Successfully collected ${feeInfo.pendingFees} ETH in fees!`);
      }, 2000);
      
    } catch (error) {
      console.error('Error collecting fees:', error);
      alert('Failed to collect fees');
      setIsLoading(false);
    }
  };

  if (!account) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '40px', 
          borderRadius: '20px', 
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ color: '#1a202c', marginBottom: '20px' }}>🔐 Admin Access Required</h1>
          <p style={{ color: '#64748b', marginBottom: '30px' }}>
            Connect your admin wallet to access the fee collection dashboard
          </p>
          <button 
            onClick={connectWallet}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Connect Admin Wallet
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '40px', 
          borderRadius: '20px', 
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ color: '#dc2626', marginBottom: '20px' }}>🚫 Access Denied</h1>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>
            This wallet is not authorized for admin access
          </p>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '20px', 
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ color: '#1a202c', marginBottom: '10px' }}>💰 Admin Dashboard</h1>
          <p style={{ color: '#64748b' }}>
            Welcome, Admin! Manage fee collection and platform revenue
          </p>
          <div style={{ 
            background: '#f0f9ff', 
            padding: '15px', 
            borderRadius: '10px', 
            marginTop: '20px',
            border: '1px solid #0ea5e9'
          }}>
            <p style={{ color: '#0369a1', margin: 0, fontSize: '0.9rem' }}>
              🔐 Connected as: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          </div>
        </div>

        {/* Fee Collection Section */}
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '20px', 
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#1a202c', marginBottom: '20px' }}>💸 Fee Collection</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{ 
              background: '#f0f9ff', 
              padding: '20px', 
              borderRadius: '15px',
              border: '1px solid #0ea5e9'
            }}>
              <h3 style={{ color: '#0369a1', margin: '0 0 10px 0' }}>Total Fees</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                {feeInfo.totalFees} ETH
              </p>
            </div>
            
            <div style={{ 
              background: '#f0fdf4', 
              padding: '20px', 
              borderRadius: '15px',
              border: '1px solid #22c55e'
            }}>
              <h3 style={{ color: '#15803d', margin: '0 0 10px 0' }}>Collected</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                {feeInfo.collectedFees} ETH
              </p>
            </div>
            
            <div style={{ 
              background: '#fef3c7', 
              padding: '20px', 
              borderRadius: '15px',
              border: '1px solid #f59e0b'
            }}>
              <h3 style={{ color: '#d97706', margin: '0 0 10px 0' }}>Pending</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                {feeInfo.pendingFees} ETH
              </p>
            </div>
          </div>

          <button 
            onClick={collectFees}
            disabled={isLoading || parseFloat(feeInfo.pendingFees) === 0}
            style={{
              background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 40px',
              borderRadius: '15px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s',
              width: '100%',
              maxWidth: '300px'
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => !isLoading && (e.target.style.transform = 'scale(1)')}
          >
            {isLoading ? '⏳ Collecting...' : `💰 Collect ${feeInfo.pendingFees} ETH`}
          </button>
          
          {parseFloat(feeInfo.pendingFees) === 0 && (
            <p style={{ color: '#64748b', marginTop: '15px', textAlign: 'center' }}>
              No pending fees to collect
            </p>
          )}
        </div>

        {/* Transaction History */}
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#1a202c', marginBottom: '20px' }}>📊 Transaction History</h2>
          
          {transactionHistory.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>
              No fee collections yet
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Amount</th>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Transaction</th>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((tx) => (
                    <tr key={tx.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '15px', fontWeight: 'bold', color: '#1a202c' }}>
                        {tx.amount} ETH
                      </td>
                      <td style={{ padding: '15px', color: '#64748b' }}>
                        {tx.timestamp}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <a 
                          href={`https://etherscan.io/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#3b82f6', textDecoration: 'none' }}
                        >
                          {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}
                        </a>
                      </td>
                      <td style={{ padding: '15px' }}>
                        <span style={{ 
                          background: '#dcfce7', 
                          color: '#166534', 
                          padding: '5px 10px', 
                          borderRadius: '5px',
                          fontSize: '0.8rem'
                        }}>
                          ✅ {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
