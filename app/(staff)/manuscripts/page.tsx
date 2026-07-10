"use client"

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import ManuscriptExcerpt from "@/components/users/ManuscriptExcerpt";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const tabs = [
  { label: "All", value: "all" },
  { label: "Screening", value: "screening" },
  { label: "Under Review", value: "under-review" },
  { label: "Accepted", value: "accepted" },
  { label: "Paid", value: "paid" },
  { label: "Rejected", value: "rejected" },
];

const Review = () => {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const router = useRouter();

  useEffect(() => {
    const getManuscripts = async () => {
      try {
        const response = await axios.get("/manuscripts/all");
        setManuscripts(response.data);
      } catch (e) {
        const err = e as AxiosError<{ error: string }>
        setErrMsg(err?.response?.data?.error || "Fetching failed");
      } finally {
        setLoading(false);
      }
    };
    getManuscripts();
  }, []);

  const filtered =
    activeTab === "all"
      ? manuscripts
      : manuscripts.filter((m) => m.status === activeTab);

  const content = errMsg ? (
    errMsg
  ) : loading ? (
    <p>Loading...</p>
  ) : filtered.length ? (
    filtered
      .slice()
      .reverse()
      .map((manuscript, i) => (
        <ManuscriptExcerpt key={i} manuscript={manuscript} />
      ))
  ) : (
    <p>No Manuscripts found</p>
  );

  return (
    <div className="review-wrapper">
      <div className="review-header">
        <h2>Review Manuscripts</h2>
        <button
          className="blue-button add-button"
          onClick={() => router.push("/admin/submit")}
          aria-label="Add manuscript"
        >
          <FaPlus />
        </button>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`tab-btn ${activeTab === tab.value ? "active" : ""}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {content}
    </div>
  );
};

export default Review;
