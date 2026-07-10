"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import ConfirmModal from "../ui/ConfirmModal";
import { uploadPdf, deletePdf } from "../../lib/supabaseUpload";
import { AxiosError } from "axios";

const SubmitArchive = () => {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [volume, setVolume] = useState<number>(currentYear);
  const [issue, setIssue] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [archives, setArchives] = useState<Archives>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [existingArchive, setExistingArchive] = useState<Archive | null>(null);

  const fetchArchives = async () => {
    try {
      const res = await axios.get("/archives");
      setArchives(res.data);
    } catch (e) {
      const err = e as AxiosError<{ error: string }>
      toast.error(err?.response?.data.error || "Failed to load archives");
    }
  };

  useEffect(() => {
    (async () => {
      fetchArchives()
    })()
  }, []);

  const handleUpload = async () => {
    if (isNaN(issue) || isNaN(volume))
      return toast.error("Invalid issue or volume entry");
    if (!file || !issue) return toast.error("Issue and file required");

    const existing = archives.find(
      (a) =>
        Number(a.volume) === Number(volume) &&
        Number(a.issue) === Number(issue),
    );

    if (existing) {
      setExistingArchive(existing);
      setOpen(true);
    } else {
      doUpload(null);
    }
  };

  const currentVolume = new Date().getFullYear() - 2022;
  const volumeArray: (number | null)[] = Array.from(
    { length: currentVolume },
    (_, i) => currentVolume - i,
  );

  volumeArray.unshift(null);

  const doUpload = async (existing: Archive | null) => {
    setUploading(true);
    setStatusText("Uploading file..., this might take a while");

    try {
      if (existing?.file) {
        await deletePdf(existing.file);
      }

      if (!file) return toast.error("Please add a file first")

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
      setIssue(0);
      setFile(null);
      if (fileInputRef.current?.value) fileInputRef.current.value = "";
      fetchArchives();
    } catch (e) {
      const err = e as AxiosError<{ message: string, error: string }>
      toast.error(err.response?.data?.error || err.message || "Upload failed");
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
          onChange={(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => setVolume(Number(e.target.value))}
        >
          {volumeArray.map((v) => {
            if (v)
              return (<option key={v} value={v}>
                {v}
              </option>)
          }
          )}
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
          onChange={(e) => setIssue(Number(e.target.value))}
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
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
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
