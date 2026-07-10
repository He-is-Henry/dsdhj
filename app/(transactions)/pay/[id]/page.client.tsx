"use client";

import { SubmitEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/UserContext";
import axios from "@/lib/axios";

type Props = {
  id: string;
};

interface ManuscriptData {
  title?: string;
}

const WHATSAPP_NUMBER = "2349156263372";

const PaymentPage = ({ id }: Props) => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [submitted, setSubmitted] = useState(false);
  const [manuscript, setManuscript] = useState<ManuscriptData | null>(null);

  useEffect(() => {
    const fetchManuscript = async () => {
      try {
        const { data } = await axios.get(`/manuscripts/${id}`);
        setManuscript(data);
      } catch (err) {
        console.error("Failed to fetch manuscript for payment:", err);
      }
    };
    if (id) fetchManuscript();
  }, [id]);

  useEffect(() => {
    (() => { if (user?.email) setEmail(user.email) })();
  }, [user]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Payment claim from:", email);
    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const identifierText = manuscript?.title ? `"${manuscript.title}"` : `ID: ${id}`;
    const message = encodeURIComponent(
      `Hello, I would like to make a payment for my article ${identifierText}. Please provide the account details. My email is: ${email || "Not provided"}, id: ${id}`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const styles = {
    container: { maxWidth: "500px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" },
    heading: { fontSize: "24px", marginBottom: "10px" },
    input: { padding: "10px", fontSize: "16px", width: "100%", marginBottom: "10px" },
    button: { padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer", width: "100%" },
    link: { display: "inline-block", marginTop: "15px", color: "#25D366", textDecoration: "none" },
    message: { fontSize: "18px", color: "#333" },
    notice: { backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", padding: "15px", borderRadius: "6px", marginBottom: "20px", color: "#334155", lineHeight: "1.5" },
  };

  return (
    <div style={styles.container}>
      {!submitted ? (
        <>
          <h2 style={styles.heading}>Make a Payment</h2>

          {manuscript?.title && (
            <p style={{ fontSize: "1rem", color: "#64748b", marginBottom: "15px" }}>
              <strong>Paying for:</strong> {manuscript.title}
            </p>
          )}

          <div style={styles.notice}>
            <p style={{ margin: 0 }}>
              Please click the link below to contact us on WhatsApp and receive our current payment details.
              Once you have transferred the money, return here, enter your email, and click <strong>&quot;I have sent the money&quot;</strong>.
            </p>
          </div>

          {/*
          <div style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "8px" }}><strong>Access Bank:</strong> 1234567890 - Olanrewaju Basit</div>
            <div style={{ marginBottom: "8px" }}><strong>GTBank:</strong> 0987654321 - Olanrewaju Basit</div>
            <div style={{ marginBottom: "8px" }}><strong>Kuda:</strong> 2345678901 - Olanrewaju Basit</div>
          </div>
          */}

          <p>
            <button type="button" onClick={handleWhatsAppRedirect} style={{ ...styles.link, background: "none", border: "none", padding: 0, fontFamily: "inherit", fontSize: "16px", cursor: "pointer", textAlign: "left" }}>
              👉 Click here to Contact Us on WhatsApp for Account Details
            </button>
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
            <button type="submit" style={styles.button}>I have sent the money</button>
          </form>
        </>
      ) : (
        <div style={styles.message}>
          <p>✅ Thanks! We&apos;re verifying your payment.</p>
          <p>We&apos;ll get back to you within 24 hours.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;