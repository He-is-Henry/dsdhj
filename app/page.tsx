import About from "../components/home/About";

import NewsletterSignup from "../components/home/NewsletterSignup";
import JournalNote from "../components/home/JournalNote";
import Contact from "@/components/home/Contact";
import Explore from "../components/home/Explore";
import Image from "next/image";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Delta State Dental And Health Journal – Open Access Research",
  description: "Delta State Dental And Health Journal publishes peer-reviewed open access research in dental, medical, and health sciences. Explore current issues, archives, and submission guidelines."
}

const Home = () => {
  return (
    <div>
      <div style={{ position: "relative", width: "100vw", height: "60vh", overflow: "hidden", marginTop: "-30px", marginLeft: "-20px", marginRight: "-20px" }}>
        <Image
          src="/hero.jpg"
          alt="Hero Image"
          fill
          quality={100}
          style={{
            objectFit: "cover",
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
      <Contact />
    </div>
  );
};

export default Home;
