import React from "react";

const AuthorGuidelines = () => {
  return (
    <section
      className="author-guidelines"
      style={{ maxWidth: "900px", margin: "auto", padding: "2rem" }}
    >
      <h2>Author Guidelines</h2>

      <p>
        The Delta State Dental and Health Journal publishes high-quality,
        peer-reviewed original research, review articles, short communications,
        and case reports in fields including Dentistry, Medicine, Anatomy,
        Physiology, Nursing, and related health sciences.
      </p>

      <h3>Submission Process</h3>
      <p>
        Manuscripts should be submitted via email to:{" "}
        <strong>deltadentalhealthjournal@gmail.com</strong>. Ensure that all
        listed authors have reviewed and approved the final version of the
        manuscript. Authors must have made significant contributions to the
        conception, design, data analysis, or manuscript drafting.
      </p>

      <h3>Article Format</h3>
      <ul>
        <li>Typed, double-spaced, on A4 paper with 2.5cm margins.</li>
        <li>
          Include: Title Page, Abstract, Main Text, Acknowledgements,
          References, Tables, Figure Legends, and Figures.
        </li>
        <li>
          Use page numbers (bottom-center), and begin each section on a new
          page.
        </li>
      </ul>

      <h3>Title Page</h3>
      <p>
        The title page must include the article title, authors’ full names with
        degrees and affiliations (including email), and contact details of the
        corresponding author.
      </p>

      <h3>Abstract</h3>
      <p>
        Abstracts should be no more than 400 words. For original research,
        structure into: Objectives, Materials and Methods, Results, and
        Conclusions. Include 4–5 keywords and a short running title.
      </p>

      <h3>Peer Review & Charges</h3>
      <p>
        All manuscripts undergo peer review. A publication fee of ₦30,000 (or
        $50 for foreign authors) applies upon acceptance.
      </p>

      <h3>Note</h3>
      <p>
        Technical innovations, letters to the editor, and teaching techniques
        may also be considered. Ensure that all authors meet authorship
        requirements; financial support alone does not justify authorship.
      </p>
    </section>
  );
};

export default AuthorGuidelines;
