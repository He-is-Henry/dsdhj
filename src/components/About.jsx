import { Link } from "react-router-dom";

const About = ({ short = false }) => {
  const containerStyle = {
    padding: "1.2rem",
    borderRadius: "1rem",
    color: "#093238",
    lineHeight: "1.6",
    marginBottom: "2rem",
    textAlign: "left",
  };

  const paragraphStyle = {
    marginBottom: "1rem",
  };
  const submitButton = {
    padding: "10px",
    borderRadius: "30px",
  };
  return (
    <section style={containerStyle}>
      <h2 className="custom-heading">About us</h2>

      <p style={paragraphStyle}>
        Delta State Dental and Health Journal is a peer-reviewed, open access
        international academic journal that publishes high-quality and original
        research papers, reviews, and case reports related to all areas in
        Dental, Medical and Health Sciences.
      </p>

      {!short && (
        <>
          <p style={paragraphStyle}>
            Delta State Dental and Health Journal was conceived by the Editorial
            Board and the Executives of the Nigerian Dental Association, Delta
            State Chapter in 2021, and parturition occurred the following year.
            The journal website, designed, executed, and finessed by the
            incredible Editorial Board, targets vivacity, effervescent
            navigation, and Dental Education with Health Education at large via
            writing as the focus.
          </p>

          <p style={paragraphStyle}>
            There is a need to keep an eye on the peak and send articles to the
            journal email where all types of articles will be accepted from
            contributors.
          </p>
        </>
      )}
      <button className="blue-button" style={submitButton}>
        <Link to="/submit">Submit a manuscript</Link>
      </button>
    </section>
  );
};

export default About;
