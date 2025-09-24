"use client";

import AdminArticlesList from "@/components/AdminArticlesList";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminArticles() {
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
    <>
      <AdminArticlesList />
    </>
  );
}
