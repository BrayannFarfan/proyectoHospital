




export const ProfileCard = ({ user }) => {
  const profilePicUrl = user.profilePic
    ? `http://localhost:3000/${user.profilePic}`
    : defaultProfilePic;

  return (
    <div className="profile-card">
      <div className="profile-pic-container">
        <img
          src={profilePicUrl}
          alt="Profile"
          className="profile-pic"
          onError={(e) => {
            e.target.src = defaultProfilePic;
          }}
        />
      </div>
      <div className="profile-info">
        <h3>{user.name} {user.lastName}</h3>
        <p>
          {user.email}
        </p>
      </div>
    </div>
  );
};