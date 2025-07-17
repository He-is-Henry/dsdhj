import { useRef, useState } from "react";
import axios from "../api/axios";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../context/UserContext";

const Stage4 = ({ formData, setFormData, onNext, prevStage }) => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const fileUpdateForbidden = () => {
    if (!formData._id) return false;
    const isPaid = formData.status === "paid";
    const isScreening = formData.status === "screening";
    const isAuthor = formData.author.toString() === user._id.toString();
    const isPrivileged =
      user.roles.includes("editor") || user.roles.includes("admin");
    console.log(isPaid, isPrivileged);

    return !(isPaid && isPrivileged) && !(isScreening && isAuthor);
  };
  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (!selected || !allowedTypes.includes(selected.type)) {
      setFileError("Only PDF, DOC, and DOCX files are allowed.");
      setFile(null);
      return;
    }

    setFileError("");
    setFile(selected);
  };
  const prevFilename = formData.file
    ? decodeURIComponent(formData.file.split("/").pop().split("_")[0])
    : null;

  const handleUpload = async () => {
    if (fileUpdateForbidden())
      return setError(
        "This is not editable at this point. A manuscript can only be reuploaded under screening (by the author) and after payment (by the editorial board). This is to ensure responsibility and accountability"
      );
    if (!file) return setError("Please select a file");
    if (formData.file && !showConfirm) {
      setShowConfirm(true);
      return;
    }
    setError("");
    setUploadMsg("");

    if (formData.file) {
      try {
        setUploadMsg("checking access to file upload");
        setUploadMsg("Discarding previous file...");

        setUploading(true);
        const fileData = new FormData();
        fileData.append("file", file);
        const deleteRes = await axios.delete(
          `/files/delete?url=${formData.file}`
        );
        setFormData((prev) => ({ ...prev, file: "" }));

        console.log(deleteRes);
      } catch (err) {
        console.log(err);
        setUploadMsg("");
        setError(
          `Error deleting file: ${err?.response?.data?.error}` ||
            "File upload failed."
        );
      }
    }

    try {
      const fileData = new FormData();
      fileData.append("file", file);
      setUploadMsg("Uploading file...");

      const uploadRes = await axios.post("/files/manuscript", fileData);

      const fileUrl = uploadRes.data?.url;

      if (!fileUrl) throw new Error("File upload failed.");
      setFormData((prev) => ({ ...prev, file: fileUrl }));
      setUploadMsg("File uploaded successfully.");
      fileInputRef.current.value = "";
    } catch (err) {
      setUploadMsg("");
      setError(
        `Error uploading file: ${err?.response?.data?.error}` ||
          "File upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <section style={{ width: "100%" }}>
      <h2>Upload Your Manuscript</h2>
      <ConfirmModal
        open={showConfirm}
        message={`You have already uploaded a file named "${prevFilename}". Do you want to discard it and upload a new one?`}
        onConfirm={() => {
          setShowConfirm(false);
          handleUpload();
        }}
        cancel={true}
        onCancel={() => {
          setFile(undefined);
          fileInputRef.current.value = "";
          setShowConfirm(false);
        }}
      />

      <div>
        <label htmlFor="file">
          Select manuscript file (.pdf, .doc, .docx):
        </label>
        <input
          disabled={fileUpdateForbidden()}
          ref={fileInputRef}
          type="file"
          id="file"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx"
        />
        {formData.file && (
          <p>
            Already selected:
            <a
              href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                formData.file
              )}&embedded=true`}
              target="_blank"
            >
              View
            </a>
          </p>
        )}
        {fileError && <p style={{ color: "crimson" }}>{fileError}</p>}
        {uploadMsg && <p style={{ color: "green" }}>{uploadMsg}</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </div>
      <p>Please ensure you have selected the right file before uploading</p>
      <br />
      <button
        disabled={uploading}
        onClick={handleUpload}
        style={{
          backgroundColor: "#659377",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
        }}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button type="button" onClick={prevStage}>
          Back
        </button>
        {formData.file && (
          <button type="button" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default Stage4;
