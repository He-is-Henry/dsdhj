import { Metadata } from "next";
import ReviewsClient from "./page.client";

export const metadata: Metadata = {
  title: "Submit a Review – Delta State Dental And Health Journal",
  description:
    "Reviewers can submit their evaluations of manuscripts assigned to them for the Delta State Dental And Health Journal. Please ensure all feedback is thorough and constructive.",
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
