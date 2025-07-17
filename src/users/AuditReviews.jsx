import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/UserContext";
import { FaCheck, FaTrash } from "react-icons/fa";

const AuditReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("unverified");

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/reviews/audit");
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching audit reviews", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const verify = async (id) => {
    await axios.patch(`/reviews/${id}`);
    fetchReviews();
  };

  const remove = async (id) => {
    await axios.delete(`/reviews/${id}`);
    fetchReviews();
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "verified") return r.verified === true;
    if (filter === "unverified") return r.verified === false;
    return true;
  });

  return (
    <div className="audit-page">
      <h2>🛡️ Review Moderation</h2>

      {/* Tabs */}
      <div className="tabs">
        {["all", "verified", "unverified"].map((tab) => (
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
              <img
                src={r.user?.avatar}
                alt="avatar"
                className="review-avatar"
              />
              <span>
                {`${r.user?.firstname} ${r.user.lastname}` || "Anonymous"}
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
