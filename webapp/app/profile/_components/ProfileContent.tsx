"use client";
import { useState } from 'react';
import ProfileSection from './ProfileSection';
import WalletSection from './WalletSection';

const ProfileContent = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet'>('profile');

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
        {activeTab === 'profile' && <ProfileSection />}
        {activeTab === 'wallet' && <WalletSection />}
      </div>
    </div>
  );
};

export default ProfileContent;