"use client";
import { useState } from 'react';
import ProfileSection from './ProfileSection';
import WalletSection from './WalletSection';

const ProfileContent = (props: {userId: string}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet'>('profile');

  if (!props.userId) {
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
          <ProfileSection userId={props.userId} />
        ) : activeTab === 'wallet' ? (
          <WalletSection userId={props.userId} />
        ) : (
          <div>No se pudo cargar el contenido de la pestaña seleccionada.</div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;