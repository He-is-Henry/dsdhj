import { Metadata } from "next";
import ArchiveDetails from "@/components/manuscript/ArchiveDetails";

const backendBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

type ArchiveEntry = Archive & { _id: string };

async function getArchives(): Promise<ArchiveEntry[]> {
  try {
    const res = await fetch(`${backendBase}/archives`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Archives – Delta State Dental And Health Journal",
  description:
    "Browse through past issues and articles of the Delta State Dental And Health Journal. Access previous volumes of dental and health research.",
};

export default async function ArchivePage() {
  const archive = await getArchives();

  const sorted = [...archive].sort((a, b) => {
    if (b.volume !== a.volume) return a.volume - b.volume;
    return a.issue - b.issue;
  });

  if (!archive.length) return <p>Nothing to show</p>;

  return (
    <div className="archive-flat">
      <h2>
        <u>Archive</u>
      </h2>
      {sorted.map((archive) => {
        const { _id, volume, issue } = archive;
        const year = 2022 + (volume ?? 0);
        return (
          <section key={_id} className="archive-entry">
            <h3 className="archive-header">
              Volume {volume} - Issue {issue} - {year}
            </h3>
            <ArchiveDetails file={archive.file} />
          </section>
        );
      })}
    </div>
  );
}
