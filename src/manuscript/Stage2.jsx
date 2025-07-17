import TagInput from "../components/TagInput";

const Stage2 = ({ data, updateForm, nextStage, prevStage }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        nextStage();
      }}
    >
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

      <label>Keywords</label>
      <TagInput
        value={data.keywords}
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
