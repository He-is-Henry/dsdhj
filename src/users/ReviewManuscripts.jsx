import { useEffect, useState } from "react";
import axios from "../api/axios";
import ManuscriptExcerpt from "./ManuscriptExcerpt";

const tabs = [
  { label: "All", value: "all" },
  { label: "Screening", value: "screening" },
  { label: "Under Review", value: "under-review" },
  { label: "Accepted", value: "accepted" },
  { label: "Paid", value: "paid" },
  { label: "Rejected", value: "rejected" },
];

const Review = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const getManuscripts = async () => {
      try {
        const response = await axios.get("/manuscripts/all");
        setManuscripts(response.data);
      } catch (err) {
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
      <h2>Review Manuscripts</h2>

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
