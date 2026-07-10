"use client"

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import ManuscriptPreview from "@/components/manuscript/ManuscriptPreview";
import Fuse from "fuse.js";
import { FaSearch } from "react-icons/fa";

const ManuscriptList = () => {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Manuscript[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPublished = async () => {
      try {
        const { data } = await axios.get("/published/all");
        const reversed = data.reverse();
        setManuscripts(reversed);
        setResults(reversed);
      } catch (err) {
        console.error("Failed to fetch manuscripts:", err);
      } finally {
        setLoading(false);
      }
    };
    getPublished();
  }, []);

  useEffect(() => {
    (() => {
      if (!query.trim()) {
        setResults(manuscripts);
        return;
      }
    })()

    const fuse = new Fuse(manuscripts, {
      keys: ["title", "keywords", "name", "coAuthors", "abstract"],
      threshold: 0.4,
    });

    const filtered = fuse.search(query).map((res) => res.item);
    (() => setResults(filtered))()
  }, [query, manuscripts]);

  if (loading) return <p>Loading...</p>;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div className="search-container">
        <input
          type="text"
          id="search"
          className="search-input"
          placeholder="SEARCH ARTICLE..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label htmlFor="search">
          <FaSearch />
        </label>
      </div>
      <div className="manuscript-list">
        {manuscripts.length === 0 && !query ? (
          <p>No manuscripts found.</p>
        ) : results.length ? (
          results.map((manuscript) => (
            <ManuscriptPreview key={manuscript._id} manuscript={manuscript} />
          ))
        ) : (
          <p>No matching manuscripts found.</p>
        )}
      </div>
    </div>
  );
};

export default ManuscriptList;
