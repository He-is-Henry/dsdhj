import { FaUserCircle } from "react-icons/fa";

const ReviewItem = ({ review }) => {
  const { text, user } = review;

  return (
    <div className="review-item">
      <div className="review-user">
        {user?.avatar ? (
          <img src={user.avatar} alt="User avatar" className="review-avatar" />
        ) : (
          <FaUserCircle size={32} />
        )}
        <span className="review-name">
          {`${user?.firstname} ${user?.lastname}` || "Anonymous"}
        </span>
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
};

export default ReviewItem;
