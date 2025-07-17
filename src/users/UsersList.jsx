import { useEffect, useState } from "react";
import axios from "../api/axios";
import UserDetails from "./UserDetails";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get("/users");
      setUsers(response.data);
    };
    getAllUsers();
  }, []);
  return (
    <div>
      <h2>All users</h2>
      <Link to="/invite">Invite New User</Link>
      {users.map((user) => (
        <UserDetails key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
