"use client";

import AdminHeader from "@/components/AdminHeader.jsx"
import Header from "@/components/Navbar.jsx"
import Link from "next/link.js"
import { redirect } from "next/navigation.js";
// import { useAuth } from "../auth/AuthContext.jsx";



export default function DashboardLayout({ children }) {

  // const {isAuthenticated} = useAuth();


  //   if (!isAuthenticated) {
  //     redirect("/login");
  //   }

  // // Pendant le chargement/redirect, tu peux afficher rien ou un loader
  // if (!isAuthenticated) {
  //   return null;
  // }
  
  return (
    <div className="flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}