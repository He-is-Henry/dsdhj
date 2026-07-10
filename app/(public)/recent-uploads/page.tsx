import { Metadata } from "next";
import ManuscriptList from "./page.client";

export const metadata: Metadata = {
  title: "Recent Uploads & Published Research | Delta State Dental And Health Journal",
  description: "Browse the latest peer-reviewed dentistry and health research articles, case reports, and medical studies published in the Delta State Dental And Health Journal.",
  keywords: ["dental journal", "health research", "medical articles", "recent uploads", "dentistry publications", "Delta State"],
  openGraph: {
    title: "Recent Uploads & Published Research",
    description: "Browse the latest peer-reviewed dentistry and health research articles.",
    type: "website",
  },
};

export default function RecentUploads() {
  return <ManuscriptList />;
}
