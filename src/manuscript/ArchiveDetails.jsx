import { getPdfUrl } from "../components/supabaseUpload";

const backendBase = "https://dsdhj-api.onrender.com";

const ArchiveDetails = ({ file }) => {
  if (!file) return null;

  const fullUrl = getPdfUrl(file);
  const downloadUrl = `${backendBase}/files/download?url=${encodeURIComponent(
    fullUrl
  )}`;

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <button style={styles.editBtn}>
          <a style={styles.editBtn} href={downloadUrl}>
            Download
          </a>
        </button>
      </div>
      <>
        <div style={styles.iframeContainer}>
          <iframe
            title="Manuscript Preview"
            src={fullUrl}
            style={styles.iframe}
          />
        </div>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          👁️ View
        </a>
      </>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

  iframe: {
    width: "100%",
    height: "400px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    overflow: "hidden",
    marginTop: "1rem",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
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
    color: "white",
    marginLeft: "auto",
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

export default ArchiveDetails;
