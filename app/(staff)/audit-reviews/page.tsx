"use client"

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { FaCheck, FaTrash } from "react-icons/fa";
import Image from "next/image";


type Review = {
  _id: string,
  verified: boolean,
  text: string

  user: {
    firstname: string,
    lastname: string,
    avatar: string
  }
}

type Filter = "all" | "verified" | "unverified"

const AuditReviews = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<Filter>("unverified");

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/reviews/audit");
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching audit reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (() => fetchReviews())();
  }, []);

  const verify = async (id: string) => {
    await axios.patch(`/reviews/${id}`);
    fetchReviews();
  };

  const remove = async (id: string) => {
    await axios.delete(`/reviews/${id}`);
    fetchReviews();
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "verified") return r.verified === true;
    if (filter === "unverified") return r.verified === false;
    return true;
  });
  if (loading) return <p>Loading...</p>;

  if (!filteredReviews.length) return <p>Nothing to show </p>;
  const tabs: Filter[] = ["all", "verified", "unverified"]
  return (
    <div className="audit-page">
      <h2>🛡️ Review Moderation</h2>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={filter === tab ? "active" : ""}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {filteredReviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        filteredReviews.map((r) => (
          <div key={r._id} className="review-item">
            <div className="review-user">
              <Image
                width={200}
                height={200}
                src={r.user?.avatar}
                alt="avatar"
                className="review-avatar"
              />
              <span>
                {r?.user?.firstname
                  ? `${r.user?.firstname} ${r.user.lastname}`
                  : "Anonymous"}
              </span>
            </div>
            <p className="review-text">{r.text}</p>
            <div className="review-actions">
              {!r.verified && (
                <button onClick={() => verify(r._id)}>
                  <FaCheck /> Verify
                </button>
              )}
              <button onClick={() => remove(r._id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AuditReviews;
