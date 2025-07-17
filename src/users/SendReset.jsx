import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/UserContext";
import { toast } from "react-hot-toast";

const SendReset = () => {
  const [email, setEmail] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) setEmail(user.email);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/users/send-reset", { email });
      toast.success(res.data.message || res.data.success || "Reset link sent");
    } catch (err) {
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
