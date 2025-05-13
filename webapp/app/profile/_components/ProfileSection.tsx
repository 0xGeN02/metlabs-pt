"use client";
import { useEffect, useState } from 'react';

interface UserData {
    name: string;
    email: string;
}
const serverHost = process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string || 'http://localhost:3010'
if (!serverHost) {
  throw new Error('NEXT_PUBLIC_BETTER_AUTH_URL is not defined');
}

const ProfileSection = (props: {jwt: string}) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${serverHost}/api/user/jwt`, {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-section">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>
  );
};

export default ProfileSection;
