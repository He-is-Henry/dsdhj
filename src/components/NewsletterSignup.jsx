import React, { useState } from "react";
import axios from "../api/axios";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErrMsg("");
    setLoading(true);

    try {
      const res = await axios.post("/newsletter", { email });
      setMsg(res.data.message || "Subscribed successfully");
      setEmail("");
    } catch (err) {
      const status = err?.response?.status;
      const error = err?.response?.data?.error || err?.response?.data?.message;
      if (status === 400) {
        setErrMsg(error || "Invalid email");
      } else if (status === 409) {
        setErrMsg("You're already subscribed.");
      } else {
        setErrMsg("Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const sectionStyle = {
    background: "#f0f8ff",
    padding: "2rem",
    borderRadius: "1rem",
    margin: "2rem auto",
    maxWidth: "600px",
    textAlign: "center",
    color: "#093238",
  };

  const inputStyle = {
    padding: "0.6rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
    width: "70%",
    maxWidth: "300px",
    marginRight: "0.5rem",
    outline: "none",
  };

  const buttonStyle = {
    backgroundColor: "#1e3a8a",
    color: "#fff",
    padding: "0.6rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const messageStyle = {
    marginTop: "1rem",
    fontWeight: "bold",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={{ color: "#1e3a8a" }}>Subscribe to Our Newsletter</h2>
      <p>Get the latest journal updates and submission news.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={inputStyle}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      {msg && <p style={{ ...messageStyle, color: "green" }}>✅ {msg}</p>}
      {errMsg && <p style={{ ...messageStyle, color: "red" }}>❌ {errMsg}</p>}
    </section>
  );
};

export default NewsletterSignup;
