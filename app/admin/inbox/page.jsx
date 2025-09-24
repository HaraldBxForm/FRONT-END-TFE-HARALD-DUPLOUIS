"use client";

import AdminInbox from "@/components/AdminInbox.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InboxPage() {
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
      <AdminInbox />
    </>
  );
}
