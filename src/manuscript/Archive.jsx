import { useEffect, useState } from "react";
import ArchiveDetails from "./ArchiveDetails";
import axios from "../api/axios";
import SEO from "../components/Seo";

const Archive = () => {
  const [archive, setArchive] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArchive = async () => {
      const { data } = await axios.get("/archives");
      setArchive(data);
      setLoading(false);
    };
    getArchive();
  }, []);

  const sorted = [...archive].sort((a, b) => {
    if (b.volume !== a.volume) return a.volume - b.volume;
    return a.issue - b.issue;
  });

  if (loading) return <p>Loading...</p>;
  if (!archive.length) return <p>Nothing to show</p>;
  return (
    <>
      <SEO
        title="Archives – Delta State Dental And Health Journal"
        path="/archive"
        description="Browse through past issues and articles of the Delta State Dental And Health Journal. Access previous volumes of dental and health research."
      />
      <div className="archive-flat">
        <h2>
          <u>Archive</u>
        </h2>
        {sorted.map((archive) => {
          const { _id, volume, issue } = archive;
          const year = 2022 + (volume ?? 0);
          return (
            <section key={_id} className="archive-entry">
              <h3 className="archive-header">
                Volume {volume} • Issue {issue} • {year}
              </h3>
              <ArchiveDetails file={archive.file} />
            </section>
          );
        })}
      </div>
    </>
  );
};

export default Archive;
