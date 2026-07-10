import RequireAuth from "@/components/auth/RequireAuth"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function StaffAuthLayout({ children }: Props) {
  return (
    <RequireAuth allowedRoles={[
      "author", "admin", "editor"]}>
      {children}
    </RequireAuth>
  )
}