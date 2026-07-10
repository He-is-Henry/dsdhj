import ManuscriptForm from '@/components/manuscript/ManuscriptForm'

type Props = {
  params: {
    id: string
  }
}

async function EditManuscriptPage({ params }: Props) {
  const { id } = await params;
  return <ManuscriptForm id={id} />
}

export default EditManuscriptPage