"use client";
import { useState } from 'react';
import ProfileSection from './ProfileSection';
import WalletSection from './WalletSection';

const ProfileContent = (props: {jwt: string}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet'>('profile');
  const token = props.jwt;
  if (!token) {
    console.error('No se encontró el token de autenticación en localStorage');
    return <div>Error: No se encontró el token de autenticación</div>;
  }
  return (
    <div className="profile-content">
      <div className="tabs">
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>
          Profile
        </button>
        <button onClick={() => setActiveTab('wallet')} className={activeTab === 'wallet' ? 'active' : ''}>
          Wallet
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' ? (
          <ProfileSection jwt={token} />
        ) : activeTab === 'wallet' ? (
          <WalletSection jwt={token} />
        ) : (
          <div>No se pudo cargar el contenido de la pestaña seleccionada.</div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;