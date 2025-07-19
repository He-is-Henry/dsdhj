import { useAuth } from "../context/UserContext";

const Stage1 = ({ data, updateForm, nextStage }) => {
  const { user } = useAuth();

  const isReadOnly =
    !user?.roles.includes("admin") && //is not an admin, only admins and editors are allowed, therefore, this is an editor
    data._id && //data has an id, meaning, they're currently about to edit
    data?.author?.toString() !== user?._id.toString(); //user doesn't own the manuscript

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        nextStage();
      }}
    >
      <h2>Author Information</h2>
      <label>Name</label>
      <input
        readOnly={isReadOnly}
        type="text"
        value={data.name}
        onChange={(e) => updateForm("name", e.target.value)}
        required
      />

      <label>Email</label>
      <input
        readOnly={isReadOnly}
        type="email"
        value={data.email}
        onChange={(e) => updateForm("email", e.target.value)}
        required
      />

      <label>Affiliation</label>
      <input
        readOnly={isReadOnly}
        type="text"
        value={data.affiliation}
        onChange={(e) => updateForm("affiliation", e.target.value)}
        required
      />

      <label>Institutional Address</label>
      <input
        readOnly={isReadOnly}
        type="text"
        value={data.institutionalAddress}
        onChange={(e) => updateForm("institutionalAddress", e.target.value)}
        required
      />

      <label>Discipline</label>
      <input
        readOnly={isReadOnly}
        type="text"
        value={data.discipline}
        onChange={(e) => updateForm("discipline", e.target.value)}
        required
      />

      <label>Country</label>
      <input
        readOnly={isReadOnly}
        type="text"
        value={data.country}
        onChange={(e) => updateForm("country", e.target.value)}
        required
      />

      <button type="submit">Next</button>
    </form>
  );
};

export default Stage1;
