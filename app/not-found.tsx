"use client"
import Link from "next/link";

const Missing = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" style={{ color: "#007bff" }}>
        ← Go Home
      </Link>
    </div>
  );
};

export default Missing;
