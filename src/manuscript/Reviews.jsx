import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/UserContext";
import ReviewItem from "./ReviewItem";
import toast from "react-hot-toast";
import SEO from "../components/Seo";

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
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
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.length > 300) return toast.error("Character limit exceeded");
    try {
      const res = await axios.post("/reviews", { text });
      toast.success("Review submitted for approval");
      setText("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <>
      <SEO
        title="Submit a Review – Delta State Dental And Health Journal"
        path="/reviews"
        description="Reviewers can submit their evaluations of manuscripts assigned to them for the Delta State Dental And Health Journal. Please ensure all feedback is thorough and constructive."
      />
      <div className="reviews-page">
        <h2>User Reviews</h2>

        {user && (
          <form onSubmit={handleSubmit} className="review-form">
            <textarea
              rows="4"
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
              <ReviewItem
                key={review._id}
                review={review}
                refresh={fetchReviews}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
