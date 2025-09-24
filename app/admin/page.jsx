"use client";

import AdminHomeHero from "@/components/AdminHomeHero.jsx";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthContext.jsx";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Pendant le chargement/redirect, tu peux afficher rien ou un loader
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <AdminHomeHero />
    </div>
  );
}
