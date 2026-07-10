import { ChangeEvent, SubmitEvent, useEffect, useRef, useState } from "react";
import TagInput from "../ui/TagInput";
import { useAuth } from "../../context/UserContext";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isValidSlug = (slug: string) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);



type Props = {
  data: InitialManuscript,
  updateForm: (field: Field, value: Value) => void,
  nextStage: () => void,
  prevStage: () => void
}


const Stage2 = ({ data, updateForm, nextStage, prevStage }: Props) => {
  const { user } = useAuth();
  const isAdmin = user?.roles.includes("admin");
  const [slugError, setSlugError] = useState("");
  const slugTouched = useRef(!!data.slug); // if editing an existing one, don't auto-overwrite

  // Keep slug in sync with title until the admin manually edits it
  useEffect(() => {
    if (!isAdmin || slugTouched.current) return;
    updateForm("slug", slugify(data.title || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.title]);

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    slugTouched.current = true;
    const value = e.target.value;
    updateForm("slug", value);
    if (!value.trim()) {
      setSlugError("Slug is required");
    } else if (!isValidSlug(slugify(value))) {
      setSlugError("Use lowercase letters, numbers, and hyphens only");
    } else {
      setSlugError("");
    }
  };

  const handleSlugBlur = () => {
    if (data.slug) updateForm("slug", slugify(data.slug));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAdmin) {
      const cleaned = slugify(data.slug || "");
      if (!cleaned) {
        setSlugError("Slug is required");
        return;
      }
      if (!isValidSlug(cleaned)) {
        setSlugError("Use lowercase letters, numbers, and hyphens only");
        return;
      }
      if (cleaned !== data.slug) updateForm("slug", cleaned);
    }
    nextStage();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Article Details</h2>

      <label htmlFor="title">Title:</label>
      <input
        required
        type="text"
        id="title"
        value={data.title}
        onChange={(e) => updateForm("title", e.target.value)}
      />

      <label htmlFor="articletype">Article Type:</label>
      <select
        required
        id="articletype"
        className="form-select"
        value={data.type}
        onChange={(e) => updateForm("type", e.target.value)}
      >
        <option value="">-- Select Type --</option>
        <option value="Editorial">Editorial</option>
        <option value="Research Article">Research Article</option>
        <option value="Case Report">Case Report</option>
        <option value="Review Article">Review Article</option>
        <option value="Short Article">Short Article</option>
        <option value="Short Communication">Short Communication</option>
        <option value="Letter to Editor">Letter to Editor</option>
        <option value="Commentary">Commentary</option>
        <option value="Conference Proceeding">Conference Proceeding</option>
        <option value="Rapid Communication">Rapid Communication</option>
        <option value="Special Issue Article">Special Issue Article</option>
        <option value="Annual Meeting Abstract">Annual Meeting Abstract</option>
        <option value="Meeting Report">Meeting Report</option>
        <option value="Proceedings">Proceedings</option>
        <option value="Expert Review">Expert Review</option>
      </select>

      {isAdmin && (
        <>
          <label>Volume:</label>
          <input
            type="number"
            id="volume"
            value={data.volume}
            onChange={(e) => updateForm("volume", e.target.value)}
          />

          <label>Issue:</label>
          <input
            type="number"
            id="issue"
            value={data.issue}
            onChange={(e) => updateForm("issue", e.target.value)}
          />

          <label>Slug:</label>
          <input
            type="text"
            id="slug"
            value={data.slug ?? ""}
            onChange={handleSlugChange}
            onBlur={handleSlugBlur}
          />
          {slugError && (
            <p
              style={{
                color: "crimson",
                fontSize: "0.9rem",
                margin: "0.25rem 0",
              }}
            >
              {slugError}
            </p>
          )}
          {data.slug && !slugError && (
            <p
              style={{
                color: "#555",
                fontSize: "0.85rem",
                margin: "0.25rem 0",
              }}
            >
              /manuscript/{slugify(data.slug)}
            </p>
          )}
        </>
      )}

      <label>Keywords</label>
      <TagInput
        value={data.keywords ?? []}
        onChange={(newKeywords) => updateForm("keywords", newKeywords)}
      />

      <label>Abstract:</label>
      <textarea
        required
        rows={6}
        value={data.abstract}
        onChange={(e) => updateForm("abstract", e.target.value)}
      />

      <label>References:</label>
      <textarea
        required
        rows={6}
        value={data.references}
        onChange={(e) => updateForm("references", e.target.value)}
      />

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button type="button" onClick={prevStage}>
          Back
        </button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Stage2;
