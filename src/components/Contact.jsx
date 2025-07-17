import { useState } from "react";
import axios from "../api/axios";

const styles = {
  section: {
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "system-ui, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    color: "#1e3a8a",
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.3rem",
    marginBottom: "1rem",
    color: "#1e3a8a",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
  },
  list: {
    lineHeight: "1.8",
    listStyle: "none",
    paddingLeft: 0,
    marginBottom: "2rem",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: 500,
  },
  card: {
    backgroundColor: "#f0f6ff",
    borderRadius: "12px",
    maxWidth: "100%",
    padding: "2rem",
    boxShadow: "0 4px 12px rgba(30, 58, 138, 0.15)",
    border: "1px solid #cbd5e1",
  },
  label: {
    display: "block",
    marginBottom: "0.4rem",
    marginTop: "1rem",
    fontWeight: 600,
    color: "#1e3a8a",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    fontSize: "1rem",
  },
  textarea: {
    resize: "none",
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    fontSize: "1rem",
  },
  button: {
    marginTop: "1.5rem",
    backgroundColor: "#1e3a8a", // dark blue
    color: "#ffffff",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "#dc2626",
    marginTop: "0.5rem",
  },
  success: {
    color: "#15803d",
    marginTop: "0.5rem",
  },
};

const Contact = () => {
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("/messages", {
        firstname,
        lastname,
        email,
        message,
      });
      setMsg(res.data.success || "Message sent successfully!");
      setErrorMsg("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setMsg("");
      setErrorMsg(err?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onFirstNameChange = (e) => setFirstname(e.target.value);
  const onLastNameChange = (e) => setLastname(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onMessageChange = (e) => setMessage(e.target.value);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Contact Us</h2>
      <p style={styles.text}>
        For inquiries, feedback, or correspondence, please reach out to the
        Delta State Dental and Health Journal:
      </p>

      <ul style={styles.list}>
        <li>
          <strong>Phone:</strong>{" "}
          <a href="tel:+2348012345678" style={styles.link}>
            +234 801 234 5678
          </a>
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:dsdhj.dev@gmail.com" style={styles.link}>
            dsdhj.dev@gmail.com
          </a>
        </li>
        <li>
          <strong>Address:</strong> Delta State University, Abraka, Nigeria.
        </li>
      </ul>

      <div style={styles.card}>
        <h3 style={styles.subheading}>Send us a message</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname" style={styles.label}>
            First Name:
          </label>
          <input
            required
            type="text"
            id="firstname"
            value={firstname}
            onChange={onFirstNameChange}
            style={styles.input}
          />

          <label htmlFor="lastname" style={styles.label}>
            Last Name:
          </label>
          <input
            required
            type="text"
            id="lastname"
            value={lastname}
            onChange={onLastNameChange}
            style={styles.input}
          />

          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={onEmailChange}
            style={styles.input}
          />

          <label htmlFor="message" style={styles.label}>
            Message:
          </label>
          <textarea
            required
            id="message"
            rows={6}
            value={message}
            onChange={onMessageChange}
            style={styles.textarea}
          ></textarea>

          {errorMsg && <p style={styles.error}>{errorMsg}</p>}
          {msg && <p style={styles.success}>{msg}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
