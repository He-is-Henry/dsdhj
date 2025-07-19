const Footer = () => {
  const footerStyle = {
    backgroundColor: "#1d53a0",
    color: "#ffffff",
    padding: "1.5rem 1rem",
    textAlign: "center",
    fontSize: "0.95rem",
    marginTop: "4rem",
    marginBottom: "-4rem",
    marginRight: "-20px",
    marginLeft: "-20px",
    width: "100vw",
  };

  return (
    <footer style={footerStyle}>
      <p>
        &copy; {new Date().getFullYear()} Delta State Dental and Health Journal.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
