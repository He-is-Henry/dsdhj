import ManuscriptDetails from './ManuscriptDetails'

type Props = {
  params: {
    manuscriptId: string
  }
}

async function ManuscriptViewPage({ params }: Props) {
  const { manuscriptId } = await params;
  return (
    <ManuscriptDetails manuscriptId={manuscriptId} />
  )
}

export default ManuscriptViewPage