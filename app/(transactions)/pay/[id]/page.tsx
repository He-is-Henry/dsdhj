import PaymentPage from "./page.client"

type Props = {
  params: {
    id: string
  }
}

async function PaymentDetailsPage({ params }: Props) {
  const { id } = await params;
  return (
    <PaymentPage id={id} />
  )
}

export default PaymentDetailsPage