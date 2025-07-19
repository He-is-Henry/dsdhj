import { Link } from "react-router-dom";

function formatManuscriptID(id) {
  const prefix = id.slice(0, 5);
  const year = id.slice(5, 9);
  const number = id.slice(9);
  return `${prefix}-${year}-${number}`;
}
const infoStyle = {
  color: "#fff",
  backgroundColor: "#1d53a0",
  padding: "10px 20px",
  borderRadius: "20px",
};

const ManuscriptPreview = ({ manuscript }) => {
  const allAuthors = [manuscript.name, ...(manuscript.coauthors || [])];
  const authorDisplay =
    allAuthors.length > 10 ? `${allAuthors[0]} et al.` : allAuthors.join(", ");

  return (
    <div
      className="manuscript-preview"
      style={{
        borderRadius: "10px",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "15px",
          width: "100%",
        }}
      >
        <span style={infoStyle}>vol {manuscript.volume}</span>
        <span style={infoStyle}>issue {manuscript.issue}</span>
        <span
          style={{
            marginLeft: "30px",
            whiteSpace: "nowrap",
            color: "#1d53a0",
            fontWeight: "bold",
          }}
        >
          {manuscript.type}
        </span>
      </div>

      <h3
        style={{ color: "#093238", fontSize: "1.2rem", marginBottom: "0.5rem" }}
      >
        {manuscript.title}
      </h3>
      {
        <p>
          <strong>ID: </strong>
          {formatManuscriptID(manuscript.customId)}
        </p>
      }
      <p style={{ marginBottom: "0.75rem", color: "#333" }}>
        <strong>Author(s):</strong> {authorDisplay}
      </p>
      <Link
        to={`/manuscript/${manuscript._id}`}
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
