import HelpButton from "@/components/HelpButton.jsx"
import "./globals.css"
import Footer from "@/components/Footer.jsx"
import { AuthProvider } from "./auth/AuthContext.jsx"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-title" content="OceanSavers" />
      </head>
      <body className="flex flex-col min-h-screen w-full">
        <AuthProvider>

        {/* Contenu principal qui s'étend */}
        <main className="flex-grow w-full">
          {children}
        </main>
        <HelpButton />
        {/* Footer en bas */}
        <Footer />

        </AuthProvider>
      </body>
    </html>
  )
}