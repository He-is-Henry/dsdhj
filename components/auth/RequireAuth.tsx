"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../../context/UserContext";

type Props = {
  allowedRoles: Roles[],
  children: ReactNode
}

const RequireAuth = ({ allowedRoles, children }: Props) => {
  const { user, checked } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const authorized = allowedRoles.some((r) => user?.roles?.includes(r));

  useEffect(() => {
    if (!checked) return;
    if (authorized) return;
    router.replace(user ? "/unauthorized" : `/login?from=${encodeURIComponent(pathname)}`);
  }, [checked, authorized, user, pathname, router]);

  if (!checked) return <p>Checking user details...</p>;
  if (!authorized) return null; // avoid flashing gated content before redirect fires

  return children;
};

export default RequireAuth;