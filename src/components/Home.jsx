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
const Home = () => {
  return (
    <div>
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
      <h2>
        <b>Delta State Dental And Health Journal</b>
      </h2>
      <About />
      <Explore />
      <NewsletterSignup />
      <JournalNote />
      <Contact />
    </div>
  );
};

export default Home;
