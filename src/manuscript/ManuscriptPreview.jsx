import { Link } from "react-router-dom";

function formatManuscriptID(id) {
  const prefix = id.slice(0, 5);
  const year = id.slice(5, 9);
  const number = id.slice(9);
  return `${prefix}-${year}-${number}`;
}
const infoStyle = {
  whiteSpace: "nowrap",
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
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        marginBottom: "1.5rem",
        margin: "10px 0",
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
            marginLeft: "20px",
            whiteSpace: "wrap",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Link
          to={`/manuscript/${manuscript._id}`}
          style={{
            display: "inline",
            color: "#1e3a8a",
            fontWeight: "600",
            textDecoration: "none",
            borderBottom: "1px solid #1e3a8a",
          }}
        >
          View Abstract →
        </Link>
        <span>
          <strong>View(s): </strong>
          {manuscript.views}
        </span>
      </div>
    </div>
  );
};

export default ManuscriptPreview;
