"use client";
import { useEffect, useState } from 'react';

interface UserData {
    name: string;
    email: string;
}
const serverHost = process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string || 'http://localhost:3000'
if (!serverHost) {
  throw new Error('NEXT_PUBLIC_BETTER_AUTH_URL is not defined');
}

const ProfileSection = (props: { userId: string; userData: UserData | null }) => {
  const [userData, setUserData] = useState<UserData | null>(props.userData);

  useEffect(() => {
    if (!userData) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/user/${props.userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${props.userId}`,
            },
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
    }
  }, [props.userId, userData]);

  return (
    <div className="profile-section">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {userData?.name}</p>
      <p><strong>Email:</strong> {userData?.email}</p>
    </div>
  );
};

export default ProfileSection;
