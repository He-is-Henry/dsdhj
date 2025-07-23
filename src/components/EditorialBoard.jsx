import SEO from "./Seo";

const EditorialBoard = () => {
  const sectionStyle = {
    backgroundColor: "#f0f8ff",
    padding: "2rem",
    borderRadius: "1rem",
    color: "#093238",
    marginBottom: "2rem",
    textAlign: "left",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#1e3a8a",
  };

  const subheadingStyle = {
    fontSize: "1.3rem",
    color: "#3b82f6",
    marginBottom: "0.8rem",
    marginTop: "1.5rem",
  };

  const paragraphStyle = {
    lineHeight: "1.6",
    marginBottom: "1rem",
  };

  const ulStyle = {
    paddingLeft: "1.5rem",
    listStyle: "none",
    marginBottom: "1rem",
  };

  const liStyle = {
    marginBottom: "0.75rem",
    lineHeight: "1.6",
  };

  return (
    <>
      <SEO
        title="Editorial Board – Delta State Dental And Health Journal"
        path="/editorial-board"
        description="Meet the distinguished editorial board of the Delta State Dental And Health Journal, featuring experts in dental and health sciences committed to academic excellence."
      />
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Editorial Board</h2>

        <div>
          <h3 style={subheadingStyle}>Editor-in-Chief</h3>
          <p style={paragraphStyle}>
            <strong>Prof. (Mrs.) Ese Anibor</strong>
            <br />
            Department of Human Anatomy and Cell Biology,
            <br />
            Faculty of Basic Medical Sciences,
            <br />
            Delta State University, Abraka, Delta State, Nigeria
          </p>
        </div>

        <div>
          <h3 style={subheadingStyle}>Associate Editors</h3>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong>Prof. Charles Chukwuemeka Ofili</strong> — Department of
              Public and Community Health, Novena University, Ogume, Delta State
            </li>
            <li style={liStyle}>
              <strong>Prof. Ozo Obuekwe</strong> — School of Dentistry,
              University of Benin, Edo State
            </li>
            <li style={liStyle}>
              <strong>Prof. Dennis Erhisenebe O. Eboh</strong> — Human Anatomy
              and Cell Biology, Delta State University, Abraka
            </li>
            <li style={liStyle}>
              <strong>Dr. (Mrs.) Yvonne Osaretin Mabiaku</strong> — Restorative
              Dentistry, DELSU Teaching Hospital, Oghara
            </li>
          </ul>
        </div>

        <div>
          <h3 style={subheadingStyle}>Editorial Board Members</h3>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong>Dr. Mamodesan T. Okumagba</strong> — Community Medicine,
              DELSU Teaching Hospital, Oghara
            </li>
            <li style={liStyle}>
              <strong>Dr. Emmanuel A. Ugorji</strong> — Human Physiology, DELSU,
              Abraka
            </li>
            <li style={liStyle}>
              <strong>Dr. Jude Odiase</strong> — Oral/Maxillofacial Surgery,
              DELSU Teaching Hospital, Oghara
            </li>
          </ul>
        </div>

        <div>
          <h3 style={subheadingStyle}>Editorial Advisors</h3>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong>Dr. Osarobo Ehigiator</strong> — Smile Forever LLC, New
              Mexico, USA
            </li>
            <li style={liStyle}>
              <strong>Dr. Emmanuel Eberechukwu Iwu</strong> — My Dentist Dental
              Practice, Doncaster, UK
            </li>
            <li style={liStyle}>
              <strong>Dr. Chinyere Mabel Okoro</strong> — American Dental
              Association, Southern Maryland Dental Association
            </li>
            <li style={liStyle}>
              <strong>Dr. (Mrs.) Faith Iwu</strong> — My Dentist Dental Practice,
              Doncaster, UK
            </li>
          </ul>
        </div>

        <div>
          <h3 style={subheadingStyle}>Editorial Assistants</h3>
          <p style={paragraphStyle}>
            <strong>Jones - Dibie Brenmound</strong>
            <br />
            Human Anatomy & Cell Biology, Delta State University, Abraka
          </p>
          
            <p style={paragraphStyle}>
            <strong>Nelson Ogboru Ejumedia</strong>
            <br />
            Human Anatomy & Cell Biology, Delta State University, Abraka
          </p>
        </div>
      </section>
    </>
  );
};

export default EditorialBoard;
