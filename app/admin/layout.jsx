'use client';

import AdminHeader from "@/components/AdminHeader.jsx"
import Header from "@/components/Navbar.jsx"
import Link from "next/link.js"
import { redirect } from "next/navigation.js";
import { useAuth } from "../auth/AuthContext.jsx";


export default function DashboardLayout({ children }) {

  const {isAuthenticated} = useAuth();
    // const isAuthenticated = false;
  
    if (!isAuthenticated) {
      redirect("/login");
    }
  
  return (
    <div className="flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}