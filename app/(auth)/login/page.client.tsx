"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import { useAuth } from "@/context/UserContext";
import { AxiosError } from "axios";

const styles = {
  form: {
    maxWidth: "400px",
    margin: "4rem auto",
    padding: "2rem",
    borderRadius: "12px",
    backgroundColor: "#f0f6ff",
    boxShadow: "0 4px 12px rgba(30, 58, 138, 0.15)",
    fontFamily: "system-ui, sans-serif",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0",
    borderRadius: "8px",
    color: "#333",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    marginTop: "1rem",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    padding: "0.75rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    padding: 0,
    fontSize: "0.95rem",
  },
  error: {
    color: "crimson",
    fontSize: "0.9rem",
    marginBottom: "0.75rem",
  },
};

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const fromParam = searchParams.get("from") || "/";
  const from = fromParam.includes("/reset-password") || fromParam.includes("/send-reset") ? "/" : fromParam;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/users/login", formData, {
        withCredentials: true,
      });
      login(res.data.user);

      router.replace(from);
    } catch (e) {
      const err = e as AxiosError<{ error: string }>
      if (!err?.response) return setError("No server response");
      const message = err.response?.data?.error || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push(`/signup?from=${encodeURIComponent(from)}`)}
            style={styles.linkBtn}
          >
            Create one
          </button>
        </p>

        <p>
          <button
            type="button"
            onClick={() => router.push(`/send-reset?from=${encodeURIComponent(from)}`)}
            style={styles.linkBtn}
          >
            Forgotten password?
          </button>
        </p>
      </form>
    </>
  );
};

export default Login;
