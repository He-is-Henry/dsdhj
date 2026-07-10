import CompleteInvite from "./page.client";

type Props = {
  params: {
    token: string
  }
}

export default async function CompleteInvitePage({ params }: Props) {
  const { token } = await params;

  return <CompleteInvite token={token} />
}