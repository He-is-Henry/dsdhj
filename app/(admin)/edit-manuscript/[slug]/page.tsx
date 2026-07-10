import AdminUploadManuscript from "@/components/manuscript/AdminUploadManuscript"

type Props = {
  params: {
    slug: string
  }
}

async function AdminEditManuscriptPage({ params }: Props) {
  const { slug } = await params;
  return (
    <AdminUploadManuscript slug={slug} />
  )
}

export default AdminEditManuscriptPage