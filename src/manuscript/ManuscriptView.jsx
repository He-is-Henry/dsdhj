import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
const backendBase = "https://dsdhj-api.onrender.com/";

const ManuscriptView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [manuscript, setManuscript] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [isPdfFile, setIsPDFFile] = useState(undefined);

  useEffect(() => {
    if (!manuscript) return;
    setIsPDFFile(!/\.\w{3,4}$/.test(manuscript.file));
  }, [manuscript]);

  useEffect(() => {
    const getManuscript = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/published/${id}`);
        console.log(response);
        setManuscript(response.data);
      } catch (err) {
        setErrMsg(err?.response?.data?.error || "Failed to get manuscript");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getManuscript();
  }, []);
  if (!manuscript) return <p>Manuscript not found.</p>;
  console.log(manuscript.file);

  const allAuthors = [manuscript.name, ...(manuscript.coauthors || [])];
  const authorDisplay =
    allAuthors.length > 10 ? `${allAuthors[0]} et al.` : allAuthors.join(", ");
  if (loading) return <p>Loading...</p>;
  if (errMsg) return <p> {errMsg}</p>;

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
      <p>
        {" "}
        <strong>Views: </strong>
        {manuscript.views}
      </p>
      <div style={{ marginTop: "2rem" }}>
        <a
          href={
            isPdfFile
              ? `${backendBase}/files/download?url=${manuscript.file}`
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
        <a
          href={`https://docs.google.com/viewer?url=${encodeURIComponent(
            manuscript.file
          )}&embedded=true`}
          target="_blank"
          style={{
            display: "inline-block",
            padding: "0.6rem 1.2rem",
            margin: "20px",
            backgroundColor: "#1e3a8a",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          View
        </a>
      </div>
    </div>
  );
};

export default ManuscriptView;
