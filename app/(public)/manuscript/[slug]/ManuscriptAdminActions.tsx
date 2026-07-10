"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { useAuth } from "@/context/UserContext";

type Props = {
  slug: string;
  manuscriptId: string;
};

const ManuscriptAdminActions = ({ slug, manuscriptId }: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const isAdmin = user?.roles?.includes("admin");
  if (!isAdmin) return null;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this manuscript? This cannot be undone.")) return;

    setDeleting(true);
    try {
      await axios.delete(`/published/${manuscriptId}`);
      router.push("/recent-uploads");
    } catch (e) {
      const err = e as AxiosError<{ error: string }>;
      setErrMsg(err?.response?.data?.error || "Failed to delete manuscript.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button className="blue-button" onClick={() => router.push(`/edit-manuscript/${slug}`)}>
        Edit
      </button>
      <button className="blue-button cancel-button" onClick={handleDelete} disabled={deleting}>
        {deleting ? "Deleting..." : "Delete"}
      </button>
      {errMsg && <p style={{ color: "crimson" }}>{errMsg}</p>}
    </>
  );
};

export default ManuscriptAdminActions;