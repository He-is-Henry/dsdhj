import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <div className="avatar">
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <FaUserCircle size={60} color="#1e3a8a" />
        )}
      </div>
      <div className="info">
        <h3 className="name">
          {user.firstname} {user.lastname}
        </h3>
        <div className="roles">
          {user.roles.map((role) => (
            <span className="role-tag" key={role}>
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
