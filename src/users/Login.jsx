import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/UserContext";
import SEO from "../components/Seo";

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
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  let from = location.state?.from?.pathname || "/";
  if (from.includes("/reset-password") || from.includes("/send-reset")) {
    from = "/";
  }
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/users/login", formData, {
        withCredentials: true,
      });
      login(res.data.user);

      navigate(from, { replace: true });
    } catch (err) {
      if (err?.response) return setError("No server response");
      const message = err.response?.data?.error || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Login – Delta State Dental And Health Journal"
        path="/login"
      />
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
            onClick={() => navigate("/signup", { state: { from } })}
            style={styles.linkBtn}
          >
            Create one
          </button>
        </p>

        <p>
          <button
            type="button"
            onClick={() => navigate("/send-reset", { state: { from } })}
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
