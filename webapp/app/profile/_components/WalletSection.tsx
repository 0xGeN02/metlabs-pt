"use client";
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

interface WalletData {
  public_key: string;
  userId: string;
}

const columnHelper = createColumnHelper<{ key: string; value: string }>();

const WalletSection = (props: { userId: string; walletData: WalletData | null }) => {
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let counter = 1000;

  const data = useMemo(() => [
    { key: 'Address', value: props.walletData?.public_key || 'N/A' },
    { key: 'Balance', value: `${counter} ETH` },
    { key: 'Transaction Hash', value: transactionHash || 'N/A' },
  ], [props.walletData, counter, transactionHash]);

  const columns = useMemo(() => [
    columnHelper.accessor('key', {
      header: 'Field',
    }),
    columnHelper.accessor('value', {
      header: 'Value',
    }),
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
    <div className="wallet-section bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet</h2>
      <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-blue-500 text-white">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  {typeof header.column.columnDef.header === 'function' ? header.column.columnDef.header(header.getContext()) : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-100 transition-colors">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2 text-gray-700">
                  {typeof cell.column.columnDef.cell === 'function' ? cell.column.columnDef.cell(cell.getContext()) : cell.column.columnDef.cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 mt-4" onClick={() => handleDeposit(props.userId)} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Deposit 1 ETH'}
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 ml-2 mt-4" onClick={handleWithdraw} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Withdraw'}
      </button>
    </div>
  );
};

export default WalletSection;
