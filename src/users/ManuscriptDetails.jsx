import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../context/UserContext";
import ManuscriptActions from "../manuscript/ManuscriptActions";

const formatDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return isoString;
  }
};

const ManuscriptDetails = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(() => () => {});
  const [cancel, setCancel] = useState(false);
  const { manuscriptId } = useParams();
  const [loading, setLoading] = useState(false);
  const [manuscript, setManuscript] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getManuscript = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/manuscripts/${manuscriptId}`);
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

  const handleDelete = () => {
    setModalMessage("Are you sure you want to delete this manuscript?");
    setCancel(true);
    setModalAction(() => deleteManuscript);
    setModalOpen(true);
  };
  const getEditLink = () => {
    const isAuthor = manuscript?.author?.toString() === user?._id?.toString();
    const isAdmin =
      user.roles.includes("admin") || user.roles.includes("editor");

    const handleEditClick = () => {
      if (
        !(isAdmin && isAuthor) &&
        ((isAdmin && !isAuthor && manuscript.status === "screening") ||
          (isAuthor && !isAdmin && manuscript.status !== "screening"))
      ) {
        const reason = isAdmin
          ? "Admins can't edit a manuscript that's still under screening, use the message function to tell the user to make an edit."
          : "Authors can't edit a manuscript once it's gone past screening.";

        setModalMessage(reason);
        setModalAction(() => () => {});
        setCancel(false);
        setModalOpen(true);
      } else {
        navigate(`/edit/${manuscriptId}`);
      }
    };

    return (
      <button className="blue-button" onClick={handleEditClick}>
        Edit
      </button>
    );
  };

  const deleteManuscript = async () => {
    try {
      const response = await axios.delete(`manuscripts/${manuscriptId}`);
      const deleteRes = await axios.delete(
        `/files/delete?url=${manuscript.file}`
      );
      setOpen(false);
      navigate("/dashboard");

      console.log(response);
      console.log(deleteRes);
    } catch (err) {
      console.error(err);
    }
  };
  const {
    name,
    email,
    affiliation,
    institutionalAddress,
    discipline,
    country,
    title,
    type,
    keywords,
    abstract,
    references,
    coAuthors,
    file,
    status,
    volume,
    issue,
    createdAt,
    updatedAt,
  } = manuscript;

  const googleDocsPreviewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    file
  )}&embedded=true`;

  if (loading) return <p>Loading...</p>;
  if (errMsg) return <p>{errMsg}</p>;

  return (
    <div className="manuscript-details">
      <ConfirmModal
        open={modalOpen}
        message={modalMessage}
        cancel={cancel}
        onConfirm={() => {
          modalAction();
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
        showCancel={true}
      />

      <h3>{title}</h3>
      <p>
        <strong>Author:</strong> {name}
      </p>
      <p>
        {" "}
        <strong>Co-Authors:</strong>
        {coAuthors?.length ? (
          <span>
            {coAuthors.map((co, i) => (
              <span key={i}>
                {co.name} ({co.email})
              </span>
            ))}
          </span>
        ) : (
          <span>None</span>
        )}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Affiliation:</strong> {affiliation}
      </p>
      <p>
        <strong>Institutional Address:</strong> {institutionalAddress}
      </p>
      <p>
        <strong>Discipline:</strong> {discipline}
      </p>
      <p>
        <strong>Country:</strong> {country}
      </p>
      <p>
        <strong>Type:</strong> {type}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>Volume:</strong> {volume}
      </p>
      <p>
        <strong>Issue:</strong> {issue}
      </p>
      <p>
        <strong>Keywords:</strong>{" "}
        {keywords?.length ? keywords.join(", ") : "None"}
      </p>
      <p>
        <strong>Abstract:</strong> {abstract}
      </p>
      <p>
        <strong>References:</strong>{" "}
        <span
          dangerouslySetInnerHTML={{
            __html: references?.replace(/\n/g, "<br/>"),
          }}
        />
      </p>

      <div style={{ marginTop: "1rem" }}>
        <strong>File Preview:</strong>
        <iframe
          title="Manuscript File"
          src={googleDocsPreviewUrl}
          width="100%"
          height="400px"
          style={{ border: "1px solid #aaa", marginTop: "0.5rem" }}
        />
      </div>

      <p>
        <strong>Submitted on:</strong>{" "}
        {formatDate(createdAt?.$date || createdAt)}
      </p>
      <p>
        <strong>Last updated:</strong>{" "}
        {formatDate(updatedAt?.$date || updatedAt)}
      </p>

      <div className="details-buttons">
        {getEditLink()}
        <button className="blue-button" onClick={() => setShowHistory(true)}>
          View Edit History
        </button>
        <button onClick={handleDelete} style={{ color: "white" }}>
          Delete Manuscript
        </button>
      </div>

      {showHistory && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit History</h3>

            {manuscript.history?.length ? (
              <ul className="history-list">
                {manuscript.history.map((h, i) => (
                  <li key={i} className="history-item">
                    <p className="history-date">
                      {formatDate(h.date || h.timestamp || h.createdAt)}
                    </p>
                    <p className="history-comment">{h.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No edit history available.</p>
            )}

            <button
              className="blue-button close-btn"
              onClick={() => setShowHistory(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <ManuscriptActions
        manuscript={manuscript}
        setManuscript={setManuscript}
      />
    </div>
  );
};

export default ManuscriptDetails;
