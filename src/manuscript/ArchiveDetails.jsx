import React from "react";
import { getPdfUrl } from "../components/supabaseUpload";
const backendBase = "https://dsdhj-api.onrender.com";
const ArchiveDetails = ({ file }) => {
  if (!file) return null;

  const fullUrl = getPdfUrl(file);
  const downloadUrl = `${backendBase}/files/download?url=${encodeURIComponent(
    fullUrl
  )}`;

  console.log(fullUrl);

  return (
    <div className="file-links">
      <a
        style={{ margin: "10px" }}
        href={downloadUrl}
        target="_blank"
        download
        rel="noopener noreferrer"
      >
        Download Full Issue
      </a>
      <a href={fullUrl} target="_blank" rel="noopener noreferrer">
        View
      </a>
    </div>
  );
};

export default ArchiveDetails;
