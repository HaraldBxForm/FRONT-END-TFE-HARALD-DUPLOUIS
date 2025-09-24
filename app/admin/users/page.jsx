"use client";

import { useEffect } from "react";
import WorkInProgress from "@/components/WorkInProgress.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Si pas connecté → login, sinon si pas admin → /admin
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "admin") {
      router.push("/admin");
    }
  }, [isAuthenticated, user, router]);

  // Pendant le chargement/redirect, on n'affiche rien
  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <>
      <WorkInProgress />
    </>
  );
}
