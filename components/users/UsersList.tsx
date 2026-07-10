"use client"

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import UserDetails from "./UserDetails";
import Link from "next/link";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
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
      <Link href="/invite">Invite New User</Link>
      {users.map((user) => (
        <UserDetails key={user._id} user={user} setUsers={setUsers} />
      ))}
    </div>
  );
};

export default UsersList;
