import { Metadata } from 'next'
import { Suspense } from 'react'
import Login from './page.client'

export const metadata: Metadata = {
  title: "Login – Delta State Dental And Health Journal",
  description: "Access your dashboard, manage manuscript submissions, and read peer-reviewed dentistry articles at Delta State Dental And Health Journal.",
}

function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      <Login />
    </Suspense>
  )
}

export default LoginPage
