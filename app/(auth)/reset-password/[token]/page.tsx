import VerifyReset from "./page.client";

type Props = {
  params: {
    token: string
  }
}


export default async function ResetPasswordPage({ params }: Props) {
  const { token } = await params;

  return (
    <VerifyReset token={token} />
  )
}