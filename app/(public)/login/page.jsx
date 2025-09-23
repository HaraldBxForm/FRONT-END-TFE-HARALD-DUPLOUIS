'use client';
import { redirect } from "next/navigation.js";
import LoginForm from "@/components/LoginForm.jsx";
import { useAuth } from "@/app/auth/AuthContext.jsx";

export default function LoginPage() {

const {isAuthenticated} = useAuth();

  if (isAuthenticated) {
    redirect("/admin");
  }

  return (
    <>
    <LoginForm />
    </>
  );
}