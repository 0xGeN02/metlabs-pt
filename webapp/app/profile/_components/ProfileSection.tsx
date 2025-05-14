"use client";
interface UserData {
    name: string;
    email: string;
    birth_date: string;
    phone: string;
    sex: string;
    nationality: string;
}

const ProfileSection = (props: { userId: string; userData: UserData | null }) => {
  if(!props.userId || !props.userData) {
    return <div>Error: No se obtuvieron los datos de perfil</div>;
  }

  return (
    <div className="profile-section">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {props.userData.name}</p>
      <p><strong>Email:</strong> {props.userData.email}</p>
      <p><strong>User ID:</strong> {props.userId}</p>
      <p><strong>Birth Date:</strong>{props.userData.birth_date}</p>
      <p><strong>Phone Number:</strong> {props.userData.phone}</p>
      <p><strong>Sex:</strong> {props.userData.sex}</p>
      <p><strong>Nationality:</strong> {props.userData.nationality}</p>
    </div>
  );
};

export default ProfileSection;
