import { useEffect, useState } from "react";
import axios from "../api/axios";
import ManuscriptPreview from "./ManuscriptPreview";

const CurrentIssue = () => {
  const [currentIssue, setCurrentIssue] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCurrentIssue = async () => {
      const { data } = await axios.get("published");
      console.log(data);
      setCurrentIssue(data);
      setLoading(false);
    };
    getCurrentIssue();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (!currentIssue.length) return <p>Nothing to show </p>;
  return (
    <div>
      <h2>Current Issue</h2>
      {currentIssue.map((m) => (
        <ManuscriptPreview key={m._id} manuscript={m} />
      ))}
    </div>
  );
};

export default CurrentIssue;
