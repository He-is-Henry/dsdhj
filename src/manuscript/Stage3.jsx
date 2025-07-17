import { useAuth } from "../context/UserContext";

const Stage3 = ({ data, updateForm, nextStage, prevStage }) => {
  const { user } = useAuth();
  const handleChange = (index, field, value) => {
    const updated = [...data.coAuthors];
    updated[index][field] = value;
    updateForm("coAuthors", updated);
  };
  const isReadOnly =
    !user?.roles.includes("admin") && //is not an admin, only admins and editors are allowed, therefore, this is an editor
    data._id && //data has an id, meaning, they're currently about to edit
    data.author.toString() !== user?._id.toString(); //user doesn't own the manuscript

  const addCoAuthor = () => {
    updateForm("coAuthors", [
      ...data.coAuthors,
      { name: "", email: "", affiliation: "" },
    ]);
  };

  const removeCoAuthor = (index) => {
    const updated = data.coAuthors.filter((_, i) => i !== index);
    updateForm("coAuthors", updated);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        nextStage();
      }}
      className="form-wrapper"
    >
      <h2>Co-Authors</h2>

      {data.coAuthors.length === 0 && <p>No co-authors added yet.</p>}

      {data.coAuthors.map((co, index) => (
        <div
          key={index}
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <label>Name:</label>
          <input
            readOnly={isReadOnly}
            type="text"
            value={co.name}
            required
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />

          <label>Email:</label>
          <input
            readOnly={isReadOnly}
            type="email"
            value={co.email}
            required
            onChange={(e) => handleChange(index, "email", e.target.value)}
          />

          <button
            type="button"
            disabled={isReadOnly}
            onClick={() => removeCoAuthor(index)}
            style={{ background: "#c62828", marginTop: "0.5rem" }}
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" disabled={isReadOnly} onClick={addCoAuthor}>
        + Add Co-Author
      </button>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button type="button" onClick={prevStage}>
          Back
        </button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Stage3;
