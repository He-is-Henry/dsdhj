"use client"

import { SubmitEvent, useState } from "react";

import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type Props = {
  token: string
}

const VerifyReset = ({ token }: Props) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/users/verify-reset", { token, password });
      toast.success(res.data.success || res.data.message || "Password reset!");
      setTimeout(() => router.prefetch("/login"), 3000);
    } catch (e) {
      const err = e as AxiosError<{ error: string }>
      toast.error(err?.response?.data?.error || "Something went wrong");
      router.push("/login")
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2>Set New Password</h2>

        <input
          type="password"
          required
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default VerifyReset;
