import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: "#007bff" }}>
        ← Go Home
      </Link>
    </div>
  );
};

export default Missing;
