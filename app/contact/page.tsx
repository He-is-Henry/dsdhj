import Contact from "@/components/home/Contact"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Contact Us – Delta State Dental And Health Journal",
  description: "Get in touch with the Delta State Dental And Health Journal editorial team. We welcome inquiries from authors, reviewers, and readers."

}

const ContactPage = () => {
  return <Contact />
}

export default ContactPage