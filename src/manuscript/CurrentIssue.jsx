import { useEffect, useState } from "react";
import axios from "../api/axios";
import ManuscriptPreview from "./ManuscriptPreview";
import ArchiveDetails from "./ArchiveDetails";
import SEO from "../components/Seo";

const CurrentIssue = () => {
  const [active, setActive] = useState(undefined);

  const [currentIssue, setCurrentIssue] = useState([]);
  const [currentIssueManuscripts, setCurrentIssueManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState(null);
  useEffect(() => {
    const getCurrentIssueManuscripts = async () => {
      const { data } = await axios.get("published");
      setCurrentIssueManuscripts(data);
      setLoading(false);
    };

    const getLastArchive = async () => {
      const { data } = await axios.get("/archives/current");
      setIssue(data);
      console.log(data);
      setLoading(false);
    };
    const getCurrentIssue = async () => {
      const { data } = await axios.get("/issues");
      console.log(data);
      setActive(data.active);
      setCurrentIssue(data.issue);
    };
    getCurrentIssueManuscripts();
    getCurrentIssue();
    getLastArchive();
  }, []);
  if (loading) return <p>Loading...</p>;
  
  return (
    <>
      <SEO
        title="Current Issue – Delta State Dental And Health Journal"
        path="/issue"
        description={`Explore the latest articles and research published in the current issue of the Delta State Dental And Health Journal. Authors are welcome to sumit their manuscripts to our volume ${
          new Date().getFullYear() - 2022
        } Issue ${currentIssue} `}
      />
      <div style={{ padding: "20px", textAlign: "left" }}>
        <h2>
          <u>Current Issue</u>
        </h2>
        <p>
          {active
            ? `Authors are welcome to sumit their manuscripts to our volume ${
                new Date().getFullYear() - 2022
              } Issue ${currentIssue} `
            : "We are currently not accepting manuscripts"}
        </p>
        {currentIssueManuscripts.map((m) => (
          <ManuscriptPreview key={m._id} manuscript={m} />
        ))}

        <h2 style={{ color: "#1565c0" }}>View most recent issue</h2>
        <h3 className="archive-header">
          Volume {issue?.volume} • Issue {issue?.issue} • {issue?.volume + 2022}
        </h3>
        <ArchiveDetails file={issue?.file} />
      </div>
    </>
  );
};

export default CurrentIssue;
