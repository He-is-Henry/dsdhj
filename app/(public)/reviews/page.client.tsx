"use client";

import { useEffect, useState, FormEvent } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/context/UserContext";
import ReviewItem from "@/components/manuscript/ReviewItem";
import toast from "react-hot-toast";

interface Review {
  _id: string;
  text: string;
  user: User
}

const ReviewsClient = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    (() => fetchReviews())();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length > 300) return toast.error("Character limit exceeded");
    try {
      await axios.post("/reviews", { text });
      toast.success("Review submitted for approval");
      setText("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="reviews-page">
      <h2>User Reviews</h2>

      {user && (
        <form onSubmit={handleSubmit} className="review-form">
          <textarea
            rows={4}
            value={text}
            maxLength={300}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your review..."
          />
          <button type="submit">Submit Review</button>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="review-list">
          {reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsClient;
