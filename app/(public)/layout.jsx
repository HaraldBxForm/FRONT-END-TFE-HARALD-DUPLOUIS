import Header from "@/components/Navbar.jsx"


export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-grow">
        
        {children}
      </main>
    </div>
  )
}