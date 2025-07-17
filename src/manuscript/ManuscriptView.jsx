import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ManuscriptView = () => {
  const { state } = useLocation();
  const manuscript = state?.manuscript;
  const [isPdfFile, setIsPDFFile] = useState(undefined);

  useEffect(() => {
    if (!manuscript) return;
    setIsPDFFile(!/\.\w{3,4}$/.test(manuscript.file));
  }, [manuscript]);

  if (!manuscript) return <p>Manuscript not found.</p>;
  console.log(manuscript.file);

  const allAuthors = [manuscript.name, ...(manuscript.coauthors || [])];
  const authorDisplay =
    allAuthors.length > 10 ? `${allAuthors[0]} et al.` : allAuthors.join(", ");

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>{manuscript.title}</h2>
      <p>
        <strong>Authors:</strong> {authorDisplay}
      </p>
      {manuscript.affiliation && (
        <p>
          <strong>Affiliation:</strong> {manuscript.affiliation}
        </p>
      )}
      <p>
        <strong>Abstract:</strong>
      </p>
      <p style={{ lineHeight: "1.6" }}>{manuscript.abstract}</p>

      <div style={{ marginTop: "2rem" }}>
        <a
          href={
            isPdfFile
              ? `http://localhost:5000/files/download?url=${manuscript.file}`
              : manuscript.file
          }
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "0.6rem 1.2rem",
            backgroundColor: "#1e3a8a",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Download Full Paper
        </a>
      </div>
    </div>
  );
};

export default ManuscriptView;
