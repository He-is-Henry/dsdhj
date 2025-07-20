import { useEffect, useState } from "react";
import axios from "../api/axios";
import ManuscriptExcerpt from "./ManuscriptExcerpt";

const Dashboard = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [publishedManuscripts, setPublishedManuscripts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserManuscripts = async () => {
      try {
        console.log("OK");
        const response = await axios.get("/manuscripts");
        console.log(response.data);
        setManuscripts(response.data.manuscripts);
        setPublishedManuscripts(response.data.publishedManuscripts);
      } catch (err) {
        console.error(err);
        console.log(err);
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

  const published = loading ? (
    ""
  ) : publishedManuscripts.length ? (
    publishedManuscripts
      .slice()
      .reverse()
      .map((manuscript, i) => (
        <ManuscriptExcerpt key={i} manuscript={manuscript} />
      ))
  ) : (
    <p>No Publishes Yet</p>
  );
  console.log(content);
  return (
    <div>
      <h2>Submissions</h2>
      {content}
      <h2>Published Manuscripts</h2>
      {published}
    </div>
  );
};

export default Dashboard;
