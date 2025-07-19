import { useEffect, useState } from "react";
import axios from "../api/axios";
import ManuscriptPreview from "./ManuscriptPreview";

const CurrentIssue = () => {
  const [active, setActive] = useState(undefined);

  const [currentIssue, setCurrentIssue] = useState([]);
  const [currentIssueManuscripts, setCurrentIssueManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCurrentIssueManuscripts = async () => {
      const { data } = await axios.get("published");
      setCurrentIssueManuscripts(data);
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
  }, []);
  if (loading) return <p>Loading...</p>;
  if (!currentIssueManuscripts.length) return <p>Nothing to show </p>;
  return (
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
    </div>
  );
};

export default CurrentIssue;
