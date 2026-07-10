import { useAuth } from "../../context/UserContext";

type Props = {
  data: InitialManuscript,
  updateForm: (field: Field, value: Value) => void,
  nextStage: () => void,
  prevStage: () => void
}

const Stage3 = ({ data, updateForm, nextStage, prevStage }: Props) => {
  const { user } = useAuth();

  type CoAuthors = {
    name: string,
    email: string
  }[]
  type CoAuthor = CoAuthors[number];
  type Field = keyof CoAuthor;
  type Value = CoAuthor[Field]


  const handleChange = (index: number, field: Field, value: Value) => {
    const updated = data.coAuthors ? [...data.coAuthors] : [];
    updated[index][field] = value;
    updateForm("coAuthors", updated);
  };
  const isReadOnly =
    !!(!user?.roles.includes("admin") && data._id && data?.author?.toString() !== user?._id.toString());

  // is not an admin, only admins and editors are allowed, therefore, this is an editor
  // data has an id, meaning, they're currently about to edit
  //user doesn't own the manuscript

  const addCoAuthor = () => {
    const newAuthor = { name: "", email: "" };
    const allAuthors = data.coAuthors ? [...data.coAuthors] : [];

    updateForm("coAuthors", [
      ...allAuthors
      , newAuthor
    ]);
  };

  const removeCoAuthor = (index: number) => {
    const updated = data?.coAuthors?.filter((_, i) => i !== index) ?? [];
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

      {data?.coAuthors?.length === 0 && <p>No co-authors added yet.</p>}

      {data?.coAuthors?.map((co, index) => (
        <div
          key={index}
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <div
            style={{
              margin: 20,
            }}
          >
            <label>Name: </label>
            <input
              readOnly={isReadOnly}
              type="text"
              value={co.name}
              required
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>

          <div>
            <label>Email: </label>
            <input
              readOnly={isReadOnly}
              type="email"
              value={co.email}
              required
              onChange={(e) => handleChange(index, "email", e.target.value)}
            />
          </div>

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
