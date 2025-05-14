import React, { useState, useMemo } from 'react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { z } from 'zod';
import { toast } from 'sonner';

// Color variables
// --bg-dark-blue: #1e1e3e;
// --bg-white: #e9e9e9;

const columnHelper = createColumnHelper<{ key: string; value: string }>();

interface UserData {
  name: string;
  email: string;
  birth_date: string;
  phone: string;
  sex: string;
  nationality: string;
}

interface WalletData {
  public_key: string;
  userId: string;
}

const ExchangeDashboard = (props: { userId: string; userData: UserData | null; walletData: WalletData | null }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet'>('profile');

  return (
    <div className="bg-gray-50 min-h-screen p-8 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex bg-bg-dark-blue rounded-xl overflow-hidden shadow-xl">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-center font-semibold transition ${
              activeTab === 'profile' 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                : 'bg-bg-dark-blue text-gray-400 hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 py-3 text-center font-semibold transition ${
              activeTab === 'wallet'
                ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white' 
                : 'bg-bg-dark-blue text-gray-400 hover:text-white'
            }`}
          >
            Wallet
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'profile' && <ProfileSection userId={props.userId} userData={props.userData} />}
          {activeTab === 'wallet' && <WalletSection userId={props.userId} walletData={props.walletData} />}
        </div>
      </div>
    </div>
  );
};

const ProfileSection = (props: { userId: string; userData: UserData | null }) => {
  if (!props.userId || !props.userData) {
    return <div className="text-red-400">Error: No se obtuvieron los datos de perfil</div>;
  }

  const data = useMemo(
    () => [
      { key: 'Name', value: props.userData?.name  || 'N/A' },
      { key: 'Email', value: props.userData?.email  || 'N/A' },
      { key: 'User ID', value: props.userId  || 'N/A' },
      { key: 'Birth Date', value: props.userData?.birth_date || 'N/A' },
      { key: 'Phone Number', value: props.userData?.phone || 'N/A' },
      { key: 'Sex', value: props.userData?.sex || 'N/A' },
      { key: 'Nationality', value: props.userData?.nationality || 'N/A' },
    ],
    [props.userData, props.userId]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('key', { header: 'Field' }),
      columnHelper.accessor('value', { header: 'Value' }),
    ],
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.key} className="p-4 bg-gray-50 rounded-lg">
            <span className="block text-sm text-gray-500">{item.key}</span>
            <span className="block text-lg font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const WalletSection = (props: { userId: string; walletData: WalletData | null }) => {
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(1000); // Cambiado a estado

  const data = useMemo(
    () => [
      { key: 'Address', value: localStorage.getItem('walletAddress') || 'N/A' },
      { key: 'Balance', value: `${counter} ETH` },
      { key: 'Last Tx Hash', value: transactionHash || 'N/A' },
    ],
    [transactionHash, counter]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('key', { header: 'Metric' }),
      columnHelper.accessor('value', { header: 'Details' }),
    ],
    []
  );

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  const depositSchema = z.object({ userId: z.string().nonempty() });

  const handleDeposit = async (userId: string) => {
    setIsLoading(true);
    try {
      const parsed = depositSchema.parse({ userId });

      const res = await fetch('http://localhost:3000/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error en la solicitud: ${res.status} - ${errorText}`);
      }

      const { message, transactionHash } = await res.json();
      setCounter((prev) => prev + 1);
      setTransactionHash(transactionHash);
    } catch (error) {
      console.error('Error en handleDeposit:', error);
      toast.error(`Error al realizar el depósito: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: props.userId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error en la solicitud: ${res.status} - ${errorText}`);
      }

      const { message, transactionHash } = await res.json();
      setCounter((prev) => prev - 1); 
      setTransactionHash(transactionHash);
    } catch (error) {
      console.error('Error en handleWithdraw:', error);
      toast.error(`Error al realizar el retiro: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Wallet Overview</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {data.map(item => (
          <div key={item.key} className="p-4 bg-gray-50 rounded-lg">
            <span className="block text-sm text-gray-500">{item.key}</span>
            <span className="block text-lg font-medium text-gray-900 break-words overflow-hidden text-ellipsis">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => handleDeposit(props.userId)}
          disabled={isLoading}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow hover:opacity-90 disabled:opacity-50 transition"
        >
          {isLoading ? 'Processing...' : 'Deposit 1 ETH'}
        </button>
        <button
          onClick={handleWithdraw}
          disabled={isLoading}
          className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg shadow hover:opacity-90 disabled:opacity-50 transition"
        >
          {isLoading ? 'Processing...' : 'Withdraw 1 ETH'}
        </button>
      </div>
    </div>
  );
};

export default ExchangeDashboard;
