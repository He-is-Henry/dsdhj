import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

const CompleteInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleComplete = async () => {
    if (!firstname || !lastname || !password || !confirmPassword)
      return setError("All fields are required.");

    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    if (password.length < 8)
      return setError("Password length cannot be less than 8");

    try {
      setLoading(true);
      setError("");

      await axios.patch(`/users/complete/${token}`, {
        firstname,
        lastname,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error("Invite error:", err);
      const customErrMsg = err.response?.data?.error;
      console.log(customErrMsg);
      setError(
        customErrMsg || "Failed to complete setup. The link may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Set Up Your Account</h2>

      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Choose a Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleComplete} disabled={loading} style={styles.button}>
        {loading ? "Setting up..." : "Complete Setup"}
      </button>

      {error && (
        <p style={styles.error}>
          {error}{" "}
          {error === "Account already activated" && (
            <a href="/login">Login here</a>
          )}
        </p>
      )}
    </div>
  );
};

export default CompleteInvite;

const styles = {
  container: {
    maxWidth: 400,
    margin: "60px auto",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  heading: {
    marginBottom: 20,
    fontSize: "1.8rem",
  },
  input: {
    display: "block",
    width: "100%",
    padding: 10,
    marginBottom: 15,
    fontSize: "1rem",
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    width: "100%",
  },
  error: {
    color: "crimson",
    marginTop: 10,
  },
};
