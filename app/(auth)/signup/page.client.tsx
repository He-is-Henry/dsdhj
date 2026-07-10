"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

const styles = {
  container: {
    maxWidth: "450px",
    margin: "4rem auto",
    padding: "2rem",
    borderRadius: "12px",
    backgroundColor: "#f0f6ff",
    boxShadow: "0 4px 12px rgba(30, 58, 138, 0.15)",
    fontFamily: "system-ui, sans-serif",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0 1rem",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    padding: "0.75rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    padding: 0,
    fontSize: "0.95rem",
    fontFamily: "inherit",
  },
};

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromParam = searchParams.get("from") || "/login";
  const from =
    fromParam.includes("/reset-password") || fromParam.includes("/send-reset")
      ? "/"
      : fromParam;

  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      return toast.error("Password must match confirm");
    }
    if (form.password.length < 8) {
      return toast.error("Password less than 8 characters");
    }

    try {
      const res = await axios.post("/users/signup", form);
      toast.success("Signup successful, proceed to login");
      if (res.status === 200) {
        router.replace(from);
      }
    } catch (e) {
      const err = e as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Something went wrong. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign up as an author</h2>

      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input name="firstname" value={form.firstname} onChange={handleChange} required style={styles.input} />

        <label>Last Name:</label>
        <input name="lastname" value={form.lastname} onChange={handleChange} required style={styles.input} />

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required style={styles.input} />

        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required style={styles.input} />

        <label>Confirm Password:</label>
        <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required style={styles.input} />

        <button type="submit" style={styles.button}>
          Create Account
        </button>

        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <button type="button" onClick={() => router.push(`/login?from=${encodeURIComponent(from)}`)} style={styles.linkBtn}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;