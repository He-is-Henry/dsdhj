import RequireAuth from "@/components/auth/RequireAuth"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function AdminAuthLayout({ children }: Props) {
  return (
    <RequireAuth allowedRoles={["admin"]}>
      {children}
    </RequireAuth>
  )
}