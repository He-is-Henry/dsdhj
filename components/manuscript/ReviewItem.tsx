import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  review: {
    user: User,
    text: string
  }
}
const ReviewItem = ({ review }: Props) => {
  const { text, user } = review;

  return (
    <div className="review-item">
      <div className="review-user">
        {user?.avatar ? (
          <Image src={user.avatar} width={200} height={200} alt="User avatar" className="review-avatar" />
        ) : (
          <FaUserCircle size={32} />
        )}
        <span className="review-name">
          {user?.firstname
            ? `${user?.firstname} ${user?.lastname}`
            : "Anonymous"}
        </span>
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
};

export default ReviewItem;
