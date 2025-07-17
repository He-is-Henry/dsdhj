import { useEffect, useState } from "react";
import axios from "../api/axios";
import ManuscriptPreview from "./ManuscriptPreview";

const CurrentIssue = () => {
  const [currentIssue, setCurrentIssue] = useState([]);
  useEffect(() => {
    const getCurrentIssue = async () => {
      const { data } = await axios.get("published");
      console.log(data);
      setCurrentIssue(data);
    };
    getCurrentIssue();
  }, []);
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
