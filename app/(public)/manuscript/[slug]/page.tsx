import { Metadata } from "next";
import { notFound } from "next/navigation";
import ManuscriptAdminActions from "./ManuscriptAdminActions";

const backendBase = process.env.NEXT_PUBLIC_API_URL;

const formatDate = (isoString: string | Date) => {
  try {
    return new Date(isoString).toLocaleDateString("en-GB", { dateStyle: "long" });
  } catch {
    return String(isoString);
  }
};

async function getManuscript(slug: string): Promise<Manuscript | null> {
  try {
    console.log(slug)
    const res = await fetch(`${backendBase}/published/${slug}`, {
      next: { revalidate: 60 }, // cache for 60s, then refetch on next request
    });
    console.log(res)
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const manuscript = await getManuscript(slug);

  if (!manuscript) {
    return { title: "Manuscript not found" };
  }

  const description = manuscript.abstract?.slice(0, 160);

  return {
    title: `${manuscript.title} | Delta State Dental And Health Journal`,
    description,
    alternates: {
      canonical: `https://dsdhj.ng/manuscript/${manuscript.slug}`,
    },
    openGraph: {
      title: manuscript.title,
      description,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const res = await fetch(`${backendBase}/published/all`);
  const manuscripts: Manuscript[] = await res.json();
  return manuscripts.map((m) => ({ slug: m.slug }));
}

export default async function ManuscriptViewPage({ params }: Props) {
  const { slug } = await params;
  const manuscript = await getManuscript(slug);

  if (!manuscript) {
    console.log("No manuscript")
    notFound()
  };

  const {
    _id,
    title,
    name,
    coAuthors,
    affiliation,
    country,
    discipline,
    volume,
    issue,
    createdAt,
    submittedOn,
    abstract,
    keywords,
    references,
    views,
    file,
  } = manuscript;

  const allAuthors = [name, ...(coAuthors?.map((c) => c.name) || [])];
  const authorDisplay =
    allAuthors.length > 10 ? `${allAuthors[0]} et al.` : allAuthors.join(", ");

  const isPdfFile = !/\.\w{3,4}$/.test(file);
  const googleDocsPreviewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(file)}&embedded=true`;

  return (
    <div
      className="manuscript-public"
      style={{ padding: "1.5rem", maxWidth: "800px", margin: "auto", textAlign: "left" }}
    >
      <h2 style={{ marginBottom: "0.5rem" }}>{title}</h2>

      <p>
        <strong>Authors:</strong> {authorDisplay}
      </p>

      {affiliation && (
        <p>
          <strong>Affiliation:</strong> {affiliation}
        </p>
      )}
      {country && (
        <p>
          <strong>Country:</strong> {country}
        </p>
      )}
      {discipline && (
        <p>
          <strong>Discipline:</strong> {discipline}
        </p>
      )}

      {(volume || issue) && (
        <p>
          <strong>Journal Issue:</strong> {volume && `Vol. ${volume}`} {issue && `Issue ${issue}`}
        </p>
      )}

      {keywords?.length ? (
        <p>
          <strong>Keywords:</strong> {keywords.join(", ")}
        </p>
      ) : null}

      <p>
        <strong>Submitted on:</strong> {formatDate(submittedOn)}
      </p>
      <p>
        <strong>Published on:</strong> {formatDate(createdAt)}
      </p>
      <p>
        <strong>Views:</strong> {views}
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        <h4>Abstract</h4>
        <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>{abstract}</p>
      </div>

      {references && (
        <div style={{ marginTop: "1.5rem" }}>
          <h4>References</h4>
          <div
            style={{ lineHeight: "1.6" }}
            dangerouslySetInnerHTML={{ __html: references.replace(/\n/g, "<br/>") }}
          />
        </div>
      )}

      <div style={{ marginTop: "2rem", display: "flex", gap: "20px" }}>

        <a href={isPdfFile ? `${backendBase}/files/download?url=${file}` : file}
          target="_blank"
          rel="noopener noreferrer"
          className="blue-button"
        >
          Download Full Paper
        </a>

        <a href={googleDocsPreviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="blue-button"
          style={{ marginLeft: "1rem", marginBottom: "1rem" }}
        >
          View Online
        </a>

        <ManuscriptAdminActions slug={slug} manuscriptId={_id} />
      </div>
    </div>
  );
}