"use client";
import { useState } from 'react';
import ProfileSection from './ProfileSection';
import WalletSection from './WalletSection';

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

const ProfileContent = (props: { userId: string; userData: UserData | null; walletData: WalletData | null }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet'>('profile');

  if (!props.userId) {
    return <div>Error: No se encontró el token de autenticación</div>;
  }

  return (
    <div className="profile-content bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="tabs flex justify-center mb-4">
        <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded-t-lg ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Profile
        </button>
        <button onClick={() => setActiveTab('wallet')} className={`px-4 py-2 rounded-t-lg ${activeTab === 'wallet' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Wallet
        </button>
      </div>

      <div className="tab-content bg-white p-6 rounded-b-lg shadow-md border border-gray-200">
        {activeTab === 'profile' ? (
          <ProfileSection userId={props.userId} userData={props.userData as UserData} />
        ) : activeTab === 'wallet' ? (
          <WalletSection userId={props.userId} walletData={props.walletData as WalletData} />
        ) : (
          <div className="text-red-500">No se pudo cargar el contenido de la pestaña seleccionada.</div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;