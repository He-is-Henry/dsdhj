import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const PaymentPage = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Payment claim from:", email);

    setSubmitted(true);
  };

  useEffect(() => {
    if (user) setEmail(user.email);
  }, [user]);

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "10px",
    },
    accountList: {
      marginBottom: "20px",
    },
    listItem: {
      marginBottom: "8px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      width: "100%",
      marginBottom: "10px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      width: "100%",
    },
    link: {
      display: "inline-block",
      marginTop: "15px",
      color: "#25D366",
      textDecoration: "none",
    },
    message: {
      fontSize: "18px",
      color: "#333",
    },
  };

  const prefilledWhatsAppMessage = encodeURIComponent(
    `Hello, I just made a payment. Please verify and confirm. My email is: ${email}, id: ${id}`
  );

  return (
    <div style={styles.container}>
      {!submitted ? (
        <>
          <h2 style={styles.heading}>Make a Payment</h2>
          <div style={styles.accountList}>
            <div style={styles.listItem}>
              <strong>Access Bank:</strong> 1234567890 - Olanrewaju Basit
            </div>
            <div style={styles.listItem}>
              <strong>GTBank:</strong> 0987654321 - Olanrewaju Basit
            </div>
            <div style={styles.listItem}>
              <strong>Kuda:</strong> 2345678901 - Olanrewaju Basit
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              I have sent the money
            </button>
          </form>

          <p>
            Can't use any of these payment methods?
            <a
              href={`https://wa.me/2348104260489?text=${prefilledWhatsAppMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Contact Us on WhatsApp
            </a>
          </p>
        </>
      ) : (
        <div style={styles.message}>
          <p>✅ Thanks! We’re verifying your payment.</p>
          <p>We’ll get back to you within 24 hours.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
