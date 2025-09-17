import AdminHeader from "@/components/AdminHeader.jsx"
import Header from "@/components/Navbar.jsx"
import Link from "next/link.js"


export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}