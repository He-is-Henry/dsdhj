import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import SEO from "../components/Seo";

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
  error: {
    color: "crimson",
    fontSize: "0.95rem",
    marginBottom: "1rem",
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

const Signup = () => {
  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirm: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/login";
  if (from.includes("/reset-password") || from.includes("/send-reset")) {
    from = "/";
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      return toast.error("Password must match confirm");
    }
    if (form.password.length < 8) {
      return toast.error("Password less than 8 characters");
    }

    try {
      const res = await axios.post("/users/signup", form, {
        withCredentials: true,
      });
      toast.success("Signup successful, proceed to login");
      if (res.status === 200) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      const message =
        err.response?.data?.error || "Something went wrong. Try again.";
      toast.error(message);
    }
  };

  return (
    <>
      <SEO
        title="Create Account – Delta State Dental And Health Journal"
        path="/signup"
      />
      <div style={styles.container}>
        <h2>Sign up as an author</h2>

        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label>Last Name:</label>
          <input
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Create Account
          </button>

          <p style={{ marginTop: "1rem" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login", { state: { from } })}
              style={styles.linkBtn}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
