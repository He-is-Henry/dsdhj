"use client"

import { ChangeEvent, useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/context/UserContext";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

const SendReset = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email ?? "");

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/users/send-reset", { email });
      toast.success(res.data.message || res.data.success || "Reset link sent");
    } catch (e) {
      const err = e as AxiosError<{ error: string }>
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2>Reset Password</h2>

        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default SendReset;
