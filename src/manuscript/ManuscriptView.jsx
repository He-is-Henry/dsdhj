import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const backendBase = "https://dsdhj-api.onrender.com";

const formatDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleDateString("en-GB", {
      dateStyle: "long",
    });
  } catch {
    return isoString;
  }
};

const ManuscriptView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [manuscript, setManuscript] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [isPdfFile, setIsPDFFile] = useState(undefined);

  useEffect(() => {
    const getManuscript = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/published/${id}`);
        setManuscript(response.data);
        setIsPDFFile(!/\.\w{3,4}$/.test(response.data.file));
      } catch (err) {
        setErrMsg(err?.response?.data?.error || "Failed to load manuscript.");
      } finally {
        setLoading(false);
      }
    };
    getManuscript();
  }, [id]);

  if (loading) return <p>Loading manuscript...</p>;
  if (errMsg) return <p>{errMsg}</p>;
  if (!manuscript?.title) return <p>Manuscript not found.</p>;

  const {
    title,
    name,
    coauthors,
    affiliation,
    country,
    discipline,
    volume,
    issue,
    createdAt,
    submittedOn,
    abstract,
    keywords,
    references,
    views,
    file,
  } = manuscript;

  const allAuthors = [name, ...(coauthors || [])];
  const authorDisplay =
    allAuthors.length > 10 ? `${allAuthors[0]} et al.` : allAuthors.join(", ");

  const googleDocsPreviewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    file
  )}&embedded=true`;

  return (
    <div
      className="manuscript-public"
      style={{
        padding: "1.5rem",
        maxWidth: "800px",
        margin: "auto",
        textAlign: "left",
      }}
    >
      <h2 style={{ marginBottom: "0.5rem" }}>{title}</h2>

      <p>
        <strong>Authors:</strong> {authorDisplay}
      </p>

      {affiliation && (
        <p>
          <strong>Affiliation:</strong> {affiliation}
        </p>
      )}
      {country && (
        <p>
          <strong>Country:</strong> {country}
        </p>
      )}
      {discipline && (
        <p>
          <strong>Discipline:</strong> {discipline}
        </p>
      )}

      {(volume || issue) && (
        <p>
          <strong>Journal Issue:</strong> {volume && `Vol. ${volume}`}{" "}
          {issue && `Issue ${issue}`}
        </p>
      )}

      {keywords?.length ? (
        <p>
          <strong>Keywords:</strong> {keywords.join(", ")}
        </p>
      ) : (
        ""
      )}

      <p>
        <strong>Submitted on:</strong> {formatDate(submittedOn)}
      </p>
      <p>
        <strong>Published on:</strong> {formatDate(createdAt)}
      </p>
      <p>
        <strong>Views:</strong> {views}
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        <h4>Abstract</h4>
        <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>{abstract}</p>
      </div>

      {references && (
        <div style={{ marginTop: "1.5rem" }}>
          <h4>References</h4>
          <div
            style={{ lineHeight: "1.6" }}
            dangerouslySetInnerHTML={{
              __html: references.replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <a
          href={isPdfFile ? `${backendBase}/files/download?url=${file}` : file}
          target="_blank"
          rel="noopener noreferrer"
          className="blue-button"
        >
          Download Full Paper
        </a>

        <a
          href={googleDocsPreviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="blue-button"
          style={{ marginLeft: "1rem" }}
        >
          View Online
        </a>
      </div>
    </div>
  );
};

export default ManuscriptView;
