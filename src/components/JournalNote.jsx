import { Link } from "react-router-dom";

const styles = {
  section: {
    marginTop: "2rem",
  },
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.6",
  },
  link: {
    color: "#1e3a8a", // or "#1e9965" if that's your green-blue
    fontWeight: "600",
    textDecoration: "none",
  },
};

const JournalNote = () => {
  return (
    <section style={styles.section}>
      <p style={styles.paragraph}>
        We are committed to upholding the highest standards in research
        publishing. All submitted manuscripts are carefully reviewed for ethical
        compliance, author responsibility, and confidentiality. <br />
        <Link to="/ethics" style={styles.link}>
          Ethical policy
        </Link>{" "}
        |{" "}
        <Link to="/author-guidelines" style={styles.link}>
          Author guidelines
        </Link>{" "}
        |{" "}
        <Link to="/privacy" style={styles.link}>
          Privacy statement
        </Link>
        .
      </p>
    </section>
  );
};

export default JournalNote;
