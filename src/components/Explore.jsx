import { useEffect, useState } from "react";
import axios from "../api/axios";
import ManuscriptPreview from "../manuscript/ManuscriptPreview";

const Explore = () => {
  const [recentManuscripts, setRecentManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRecentManuscripts = async () => {
      const { data } = await axios.get("published/recent");
      setRecentManuscripts(data);
      setLoading(false);
    };

    getRecentManuscripts();
  }, []);
  return (
    <div style={{ textAlign: "left" }}>
      <h3 className="custom-heading">Explore Articles</h3>
      {loading && <p>Loading recent articles...</p>}
      {!recentManuscripts.length && !loading && <p>Nothing to show </p>}
      {recentManuscripts.map((m) => (
        <ManuscriptPreview key={m._id} manuscript={m} />
      ))}
    </div>
  );
};

export default Explore;
