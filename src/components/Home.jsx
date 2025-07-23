import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import About from "./About";
import Header from "./Header";
import EditorialBoard from "./EditorialBoard";
import NewsletterSignup from "./NewsletterSignup";
import JournalNote from "./JournalNote";
import Contact from "./Contact";
import Explore from "./Explore";
import SEO from "./Seo";
const Home = () => {
  return (
    <>
      <SEO
        title="Delta State Dental And Health Journal – Open Access Research"
        path="/"
        description="Delta State Dental And Health Journal publishes peer-reviewed open access research in dental, medical, and health sciences. Explore current issues, archives, and submission guidelines."
      />
      <div>
        <div style={{ position: "relative" }}>
          <img
            src="/hero.jpg"
            alt="Hero Image"
            style={{
              width: "100vw",
              marginTop: "-30px",
              marginLeft: "-20px",
              marginRight: "-20px",
              objectFit: "cover",
              maxHeight: "100vh",
            }}
          />
          <span
            style={{
              fontFamily: "Times New Roman, serif",
              position: "absolute",
              bottom: "5px",
              right: "0",
              color: "#1D53A0",
            
            }}
          >
            <b>ISSN: 0189-0786</b>
          </span>
        </div>
        <h2>
          <b>Delta State Dental And Health Journal</b>
        </h2>
        <About />
        <Explore />
        <NewsletterSignup />
        <JournalNote />
        <Contact home={true} />
      </div>
    </>
  );
};

export default Home;
