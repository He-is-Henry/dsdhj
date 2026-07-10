import { Metadata } from "next";
import ManuscriptPreview from "@/components/manuscript/ManuscriptPreview";
import ArchiveDetails from "@/components/manuscript/ArchiveDetails";

const backendBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

type LatestArchive = Archive & { _id: string };

async function getData() {
  const [manuscriptsRes, issueRes, archiveRes] = await Promise.all([
    fetch(`${backendBase}/published`, { next: { revalidate: 60 } }),
    fetch(`${backendBase}/issues`, { next: { revalidate: 60 } }),
    fetch(`${backendBase}/archives/current`, { next: { revalidate: 60 } }),
  ]);

  const manuscripts: Manuscript[] = manuscriptsRes.ok ? await manuscriptsRes.json() : [];
  const issueData: { active: boolean; issue: number } | null = issueRes.ok ? await issueRes.json() : null;
  const archive: LatestArchive | null = archiveRes.ok ? await archiveRes.json() : null;

  return { manuscripts, issueData, archive };
}

export async function generateMetadata(): Promise<Metadata> {
  const { issueData } = await getData();
  return {
    title: "Current Issue – Delta State Dental And Health Journal",
    description: `Explore the latest articles and research published in the current issue of the Delta State Dental And Health Journal. Authors are welcome to submit their manuscripts to our volume ${
      new Date().getFullYear() - 2022
    } Issue ${issueData?.issue ?? ""}`,
  };
}

export default async function CurrentIssuePage() {
  const { manuscripts, issueData, archive } = await getData();

  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <h2>
        <u>Current Issue</u>
      </h2>
      <p>
        {issueData?.active
          ? `Authors are welcome to submit their manuscripts to our volume ${
              new Date().getFullYear() - 2022
            } Issue ${issueData.issue} `
          : "We are currently not accepting manuscripts"}
      </p>
      {manuscripts.map((m) => (
        <ManuscriptPreview key={m._id} manuscript={m} />
      ))}

      <h2 style={{ color: "#1565c0" }}>View most recent issue</h2>
      <h3 className="archive-header">
        Volume {archive?.volume} - Issue {archive?.issue} - {(archive?.volume ?? 0) + 2022}
      </h3>
      <ArchiveDetails file={archive?.file} />
    </div>
  );
}
