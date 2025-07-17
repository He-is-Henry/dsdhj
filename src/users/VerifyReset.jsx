import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-hot-toast";

const VerifyReset = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigte = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/users/verify-reset", { token, password });
      toast.success(res.data.success || res.data.message || "Password reset!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Something went wrong");
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
