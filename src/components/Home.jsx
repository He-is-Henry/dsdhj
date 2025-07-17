import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import About from "./About";
import Header from "./Header";
import EditorialBoard from "./EditorialBoard";
import NewsletterSignup from "./NewsletterSignup";
import JournalNote from "./JournalNote";
import Contact from "./Contact";
const Home = () => {
  return (
    <div>
      <About />
      <EditorialBoard />
      <NewsletterSignup />
      <JournalNote />
      <Contact />
    </div>
  );
};

export default Home;
