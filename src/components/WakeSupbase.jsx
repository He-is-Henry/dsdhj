"use client";
import { useEffect, useState } from "react";
import { wakeSupabase } from "./supabaseUpload";

export default function WakeSupbase() {
  const [status, setStatus] = useState("idle");

  const wake = async () => {
    setStatus("waking...");
    const res = await wakeSupabase();
    if (res?.error) setStatus("error");
    else setStatus("awake");
  };

  useEffect(() => {
    wake();
  }, []);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "300px",
        fontFamily: "sans-serif",
      }}
    >
      <h3>Supabase Status</h3>
      <p>{status}</p>
      <button onClick={wake} style={{ padding: "6px 12px", cursor: "pointer" }}>
        Wake Supabase
      </button>
    </div>
  );
}
