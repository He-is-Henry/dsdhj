import { Link } from "react-router-dom";

const ManuscriptPreview = ({ manuscript }) => {
  return (
    <div
      className="manuscript-preview"
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3
        style={{ color: "#093238", fontSize: "1.2rem", marginBottom: "0.5rem" }}
      >
        {manuscript.title}
      </h3>
      <p style={{ marginBottom: "0.75rem", color: "#333" }}>
        <strong>By:</strong> {manuscript.name}
      </p>
      <Link
        to={"/manuscript"}
        state={{ manuscript }}
        style={{
          color: "#1e3a8a",
          fontWeight: "600",
          textDecoration: "none",
          borderBottom: "1px solid #1e3a8a",
        }}
      >
        View Abstract →
      </Link>
    </div>
  );
};

export default ManuscriptPreview;
