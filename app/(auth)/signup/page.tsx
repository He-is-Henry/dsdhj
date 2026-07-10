import { Metadata } from "next";
import { Suspense } from "react";
import SignupForm from "./page.client";

export const metadata: Metadata = {
  title: "Create Account – Delta State Dental And Health Journal",
  description: "Create an author account to submit manuscripts to the Delta State Dental And Health Journal.",
};

export default function SignupPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignupForm />
    </Suspense>
  );
}