import Link from "next/link";

const styles = {
  section: {
    marginTop: "2rem",
    padding: "2rem"
  },
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.6",
    textAlign: "center",
    padding: 10

  },
  link: {
    color: "#1e3a8a", // or "#1e9965" if that's your green-blue
    fontWeight: "600",
    textDecoration: "none",
  },
} as const;

const JournalNote = () => {
  return (
    <section style={styles.section}>
      <p style={styles.paragraph}>
        We are committed to upholding the highest standards in research
        publishing. All submitted manuscripts are carefully reviewed for ethical
        compliance, author responsibility, and confidentiality. <br />
        <Link href="/ethics" style={styles.link}>
          Ethical policy
        </Link>{" "}
        |{" "}
        <Link href="/author-guidelines" style={styles.link}>
          Author guidelines
        </Link>{" "}
        |{" "}
        <Link href="/privacy" style={styles.link}>
          Privacy statement
        </Link>
        .
      </p>
    </section>
  );
};

export default JournalNote;
