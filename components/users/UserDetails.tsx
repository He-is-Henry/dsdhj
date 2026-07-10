import { FaUserCircle } from "react-icons/fa";
import UserActions from "./UserActions";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

type Props = {
  user: User,
  setUsers: Dispatch<SetStateAction<User[]>>
}

const UserDetails = ({ user, setUsers }: Props) => {
  return (
    <div className="user-details">
      <div className="avatar">
        {user.avatar ? (
          <Image src={user.avatar} alt="avatar" width={200} height={200} />
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

      <UserActions user={user} setUsers={setUsers} />
    </div>
  );
};

export default UserDetails;
