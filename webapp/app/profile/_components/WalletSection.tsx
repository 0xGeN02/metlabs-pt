"use client";
import { useEffect, useState } from 'react';
import { z } from 'zod';

interface WalletData {
  public_key: string;
  userId: string;
}

const WalletSection = (props: { userId: string; walletData: WalletData | null }) => {
  const [walletData, setWalletData] = useState<WalletData | null>(props.walletData);
  const [transactionHash, setTransactionHash] = useState<string | null>(null); // Nuevo estado para el hash de la transacción
  const [isLoading, setIsLoading] = useState(false);
  let counter = 1000;
  const depositSchema = z.object({
    userId: z.string().nonempty("User ID is required"),
  });

  const handleDeposit = async (userId: string) => {
    try {
      const parsed = depositSchema.parse({ userId });

      const response = await fetch('http://localhost:3000/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });

      if (!response.ok) {
        throw new Error('Failed to deposit');
      }

      const data = await response.json();
      counter+=1;
      setTransactionHash(data.transactionHash); // Guardar el hash de la transacción en el estado
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
        body: JSON.stringify({ userId: props.userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to withdraw');
      }

      const data = await response.json();
      counter-=1;
      setTransactionHash(data.transactionHash); // Guardar el hash de la transacción en el estado
      alert('Withdrawal successful');
    } catch (error) {
      console.error('Error during withdrawal:', error);
    }
  };

  return (
    <div className="wallet-section">
      <h2>Wallet</h2>
      <p><strong>Address:</strong> {walletData?.public_key}</p>
      <p><strong>Balance:</strong> {counter} ETH</p>
      <button onClick={() => handleDeposit(props.userId)} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Deposit 1 ETH'}
      </button>
      <button onClick={handleWithdraw} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Withdraw'}
      </button>
      {transactionHash && (
        <p>
          <strong>Transaction Hash:</strong> {transactionHash}
        </p>
      )}
    </div>
  );
};

export default WalletSection;
