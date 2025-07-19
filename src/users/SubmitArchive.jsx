import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import { uploadPdf, getPdfUrl, deletePdf } from "../components/supabaseUpload";

const SubmitArchive = () => {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [volume, setVolume] = useState(currentYear);
  const [issue, setIssue] = useState("");
  const [file, setFile] = useState(null);
  const [archives, setArchives] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [existingArchive, setExistingArchive] = useState(null);

  const fetchArchives = async () => {
    try {
      const res = await axios.get("/archives");
      setArchives(res.data);
    } catch (err) {
      toast.error("Failed to load archives");
    }
  };

  useEffect(() => {
    if (!archives.length) fetchArchives();
  }, []);

  const handleUpload = async () => {
    if (isNaN(issue) || isNaN(volume))
      return toast.error("Invalid issue or volume entry");
    if (!file || !issue) return toast.error("Issue and file required");

    const existing = archives.find(
      (a) =>
        Number(a.volume) === Number(volume) &&
        Number(a.issue) === Number(issue.trim())
    );

    if (existing) {
      setExistingArchive(existing);
      setOpen(true);
    } else {
      doUpload(null);
    }
  };

  const currentVolume = new Date().getFullYear() - 2022;
  const volumeArray = Array.from(
    { length: currentVolume },
    (_, i) => currentVolume - i
  );

  volumeArray.unshift(null);

  const doUpload = async (existing) => {
    setUploading(true);
    setStatusText("Uploading file..., this might take a while");

    try {
      if (existing?.file) {
        await deletePdf(existing.file);
      }

      const { url, error } = await uploadPdf(file);
      if (error) throw new Error("Upload failed");

      const filePath = url.split("/").pop();

      setStatusText("Saving archive...");

      await axios.post("/archives", {
        volume,
        issue,
        file: filePath,
      });

      toast.success("Archive created");
      setIssue("");
      setFile(null);
      fileInputRef.current.value = null;
      fetchArchives();
    } catch (err) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
      setOpen(false);
      setExistingArchive(null);
      setStatusText("");
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
      <ConfirmModal
        open={open}
        message={"Archive already exists. Replace file?"}
        cancel={true}
        onConfirm={() => {
          setOpen(false);
          doUpload(existingArchive);
        }}
        onCancel={() => {
          setOpen(false);
          setExistingArchive(null);
        }}
      />

      <h2 style={{ marginBottom: "1rem" }}>Upload Archive</h2>

      {/* Volume */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Volume:</label>
        <select
          disabled={uploading}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        >
          {volumeArray.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Issue:</label>
        <input
          type="number"
          disabled={uploading}
          placeholder="Enter issue..."
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
      </div>

      {/* File */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Manuscript File (PDF):</label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          disabled={uploading}
          style={{ width: "100%", marginTop: "0.25rem" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: uploading ? "#60a5fa" : "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          fontWeight: "bold",
          cursor: uploading ? "not-allowed" : "pointer",
        }}
      >
        {uploading ? statusText : "Upload Archive"}
      </button>

      {uploading && (
        <p
          style={{
            marginTop: "0.75rem",
            color: "#3b82f6",
            textAlign: "center",
          }}
        >
          {statusText}
        </p>
      )}
    </div>
  );
};

export default SubmitArchive;
