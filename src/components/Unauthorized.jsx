import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h1>🚫 Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/" style={{ color: "#007bff" }}>
        ← Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;
