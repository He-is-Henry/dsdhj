import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";

const Stage5 = ({
  formData,
  prevStage,
  setStage,
  handleFinalSubmit,
  error,
  submitting,
  show,
  setShow,
  isEdit,
  updateForm,
  id,
}) => {
  const fileURL = `https://docs.google.com/viewer?url=${encodeURIComponent(
    formData.file
  )}&embedded=true`;
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <ConfirmModal
        open={show}
        message={`Successfully submitted manuscript "${
          formData.title.length > 20
            ? formData.title.slice(0, 19) + "..."
            : formData.title
        }"!`}
        onConfirm={() => {
          setShow(false);
          navigate(`${isEdit ? `/view/${id}` : "/dashboard"}`);
        }}
      />

      <h2 style={styles.heading}>
        📄 Review Your {isEdit ? "Changes" : "Submission"}
      </h2>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3>👤 Author Details</h3>
          <button style={styles.editBtn} onClick={() => setStage(1)}>
            Edit
          </button>
        </div>
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Affiliation:</strong> {formData.affiliation}
        </p>
        <p>
          <strong>Institution:</strong> {formData.institutionalAddress}
        </p>
        <p>
          <strong>Discipline:</strong> {formData.discipline}
        </p>
        <p>
          <strong>Country:</strong> {formData.country}
        </p>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3>📝 Manuscript Information</h3>
          <button style={styles.editBtn} onClick={() => setStage(2)}>
            Edit
          </button>
        </div>
        <p>
          <strong>Title:</strong> {formData.title}
        </p>
        <p>
          <strong>Type:</strong> {formData.type}
        </p>
        <p>
          <strong>Keywords:</strong> {formData.keywords.join(", ")}
        </p>
        <p>
          <strong>Abstract:</strong> {formData.abstract}
        </p>
        <p>
          <strong>References:</strong> {formData.references}
        </p>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3>👥 Co-Authors</h3>
          <button style={styles.editBtn} onClick={() => setStage(3)}>
            Edit
          </button>
        </div>
        {formData.coAuthors?.length > 0 ? (
          formData.coAuthors.map((c, i) => (
            <p key={i}>
              <strong>{c.name}</strong> – {c.email}
            </p>
          ))
        ) : (
          <p>None</p>
        )}
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3>📎 Uploaded File</h3>
          <button style={styles.editBtn} onClick={() => setStage(4)}>
            Edit
          </button>
        </div>
        {formData.file ? (
          <>
            <div style={styles.iframeContainer}>
              <iframe
                title="Manuscript Preview"
                src={fileURL}
                style={styles.iframe}
              />
            </div>
            <a
              href={fileURL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.viewLink}
            >
              View in new tab
            </a>
          </>
        ) : (
          <p style={{ color: "crimson" }}>No file uploaded</p>
        )}
      </div>

      {isEdit && (
        <>
          <label htmlFor="comment">Remarks (optional)</label>
          <input
            type="text"
            id="comment"
            value={formData.comment}
            onChange={(e) => updateForm("comment", e.target.value)}
          />
        </>
      )}

      <div style={styles.navButtons}>
        <button type="button" onClick={prevStage}>
          Back
        </button>
      </div>

      {error && <p style={{ color: "crimson", marginTop: "1rem" }}>{error}</p>}

      <button
        disabled={submitting}
        onClick={handleFinalSubmit}
        style={{
          ...styles.submitBtn,
          opacity: submitting ? 0.6 : 1,
        }}
      >
        {submitting
          ? isEdit
            ? "Editing"
            : "Uploading..."
          : isEdit
          ? "Save"
          : "Upload Manuscript"}
      </button>
    </section>
  );
};

export default Stage5;

const styles = {
  section: {
    width: "100%",
    maxWidth: "800px",
    margin: "auto",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#1e3a8a",
  },
  card: {
    background: "#eff6ff",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1.5rem",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  editBtn: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "4px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  iframeContainer: {
    width: "100%",
    height: "400px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    overflow: "hidden",
    marginTop: "1rem",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  viewLink: {
    display: "inline-block",
    marginTop: "0.5rem",
    color: "#1d4ed8",
    textDecoration: "underline",
  },
  navButtons: {
    marginTop: "1.5rem",
    marginBottom: "1rem",
    display: "flex",
    gap: "1rem",
  },
  submitBtn: {
    backgroundColor: "#1e40af",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};
