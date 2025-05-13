"use client";
import { useEffect, useState } from 'react';
import { z } from 'zod';

interface WalletData {
  public_key: string;
  balance: number;
}

const WalletSection = (props: {jwt: string}) => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);

  const depositSchema = z.object({
    amount: z.number().positive("Amount must be a positive number"),
  });

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/wallet'); // Adjust endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch wallet data');
        }
        const data: WalletData = await response.json();
        setWalletData(data);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchWalletData();
  }, []);

  const handleDeposit = async (amount: number) => {
    try {
      const parsed = depositSchema.parse({ amount });

      const response = await fetch('http://localhost:3000/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      if (!response.ok) {
        throw new Error('Failed to deposit');
      }
      alert('Deposit successful');
    } catch (error) {
      console.error('Error during deposit:', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to withdraw');
      }
      alert('Withdrawal successful');
    } catch (error) {
      console.error('Error during withdrawal:', error);
    }
  };

  if (!walletData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wallet-section">
      <h2>Wallet</h2>
      <p><strong>Address:</strong> {walletData.public_key}</p>
      <p><strong>Balance:</strong> {walletData.balance} ETH</p>
      <button onClick={() => handleDeposit(1)}>Deposit 1 ETH</button>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};

export default WalletSection;
