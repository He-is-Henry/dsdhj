import { getPdfUrl } from "../components/supabaseUpload";

const backendBase = "https://dsdhj-api.onrender.com";

const ArchiveDetails = ({ file }) => {
  if (!file) return null;

  const fullUrl = getPdfUrl(file);
  const downloadUrl = `${backendBase}/files/download?url=${encodeURIComponent(
    fullUrl
  )}`;

  return (
    <div style={styles.container}>
      <iframe src={fullUrl} title="PDF Viewer" style={styles.iframe}></iframe>
      <div style={styles.buttonContainer}>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          ⬇️ Download Full Issue
        </a>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          👁️ View
        </a>
      </div>
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
    maxWidth: "400px",
    height: "300px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
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
