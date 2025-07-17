import React, { useEffect, useState } from "react";
import ManuscriptPreview from "./ManuscriptPreview";
import axios from "../api/axios";

const Archive = () => {
  const [archive, setArchive] = useState([]);
  useEffect(() => {
    const getArchive = async () => {
      const { data } = await axios.get("published/archive");
      setArchive(data);
    };
    getArchive();
  }, []);
  const grouped = archive.reduce((acc, manuscript) => {
    const volume = manuscript.volume ?? 0;
    const issue = manuscript.issue ?? 0;

    if (!acc[volume]) acc[volume] = {};
    if (!acc[volume][issue]) acc[volume][issue] = [];

    acc[volume][issue].push(manuscript);
    return acc;
  }, {});

  const sortedVolumeKeys = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  const structured = sortedVolumeKeys.map((volume) => {
    const issueGroups = grouped[volume];
    const sortedIssues = Object.keys(issueGroups)
      .map(Number)
      .sort((a, b) => a - b);

    return {
      volume,
      year: 2021 + volume,
      issues: sortedIssues.map((issue) => ({
        issue,
        manuscripts: issueGroups[issue],
      })),
    };
  });

  return (
    <div className="archive-grouped">
      {structured.map(({ year, volume, issues }) => (
        <section key={volume} className="volume-group">
          <h2 className="volume-year">{year}</h2>
          {issues.map(({ issue, manuscripts }) => (
            <div key={issue} className="issue-group">
              <h3 className="issue-title">Issue {issue}</h3>
              <div className="manuscript-list">
                {manuscripts.map((manuscript) => (
                  <ManuscriptPreview
                    key={manuscript._id}
                    manuscript={manuscript}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default Archive;
