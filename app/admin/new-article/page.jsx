"use client";

import PublishingForm from "@/components/PublishingForm.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Publishing() {
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
      <PublishingForm />
    </>
  );
}
