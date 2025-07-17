import { useEffect, useState } from "react";
import axios from "../api/axios";
import ManuscriptExcerpt from "./ManuscriptExcerpt";

const Dashboard = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserManuscripts = async () => {
      try {
        const response = await axios.get("/manuscripts");
        console.log(response.data);
        setManuscripts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getUserManuscripts();
  }, []);

  const content = loading ? (
    <p>Loading...</p>
  ) : manuscripts.length ? (
    manuscripts
      .slice()
      .reverse()
      .map((manuscript, i) => (
        <ManuscriptExcerpt key={i} manuscript={manuscript} />
      ))
  ) : (
    <p>No Submissions Yet</p>
  );
  console.log(content);
  return (
    <div>
      <h2>Submissions</h2>
      {content}
    </div>
  );
};

export default Dashboard;
