import React from "react";
import { Link } from "react-router-dom";

const ManuscriptExcerpt = ({ manuscript }) => {
  const { title, name, status, type, createdAt } = manuscript;

  const dateStr = createdAt?.$date || createdAt;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "2rem",
        marginBottom: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{title}</h3>
      <p>
        <strong>Author:</strong> {name}
      </p>
      <p>
        <strong>Type:</strong> {type}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span style={{ textTransform: "capitalize" }}>{status}</span>
      </p>
      <p>
        <strong>Submitted:</strong>{" "}
        {new Date(dateStr).toLocaleDateString("en-GB")}
      </p>
      <Link to={`/view/${manuscript._id}`}>
        <button
          style={{
            marginTop: "0.5rem",
            padding: "0.4rem 0.8rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View Full Details
        </button>
      </Link>
      {manuscript.status === "accepted" && (
        <Link to={`/pay/${manuscript._id}`}>
          <button
            style={{
              margin: "0.5rem",
              padding: "0.4rem 0.8rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Pay now
          </button>
        </Link>
      )}
    </div>
  );
};

export default ManuscriptExcerpt;
