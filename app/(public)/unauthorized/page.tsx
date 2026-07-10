import Link from "next/link";

const Unauthorized = () => {
  return (
    <div>
      <h1>🚫 Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <Link href="/" style={{ color: "#007bff" }}>
        ← Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;
