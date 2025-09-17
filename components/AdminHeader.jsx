"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../styles/NavBar.module.css";

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.NavBar}>
      <div className={`container mx-auto px-4 py-6 flex justify-between items-center`}>
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/images/Plan de travail 1.png"
              alt="OceanSavers Logo"
              className="h-8 w-auto max-w-full mr-2"
            />
            <span className="text-lg md:text-xl">OceanSavers</span>
          </Link>
        </div>

        {/* Menu desktop */}
        <nav className="hidden lg:block">
          <ul className={`flex space-x-6 text-md font-medium ${styles.gap}`}>
            <li><Link href="/" className="hover:text-yellow-400">Dashboard</Link></li>
            <li><Link href="/news" className="hover:text-yellow-400">Publishing</Link></li>
          </ul>
        </nav>

        {/* Bouton burger (mobile) */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <nav className="lg:hidden bg-white/30 backdrop-blur-lg border border-white/30 w-full">
          <ul className="flex flex-col items-center text-lg font-medium text-white w-full">
            <Link href="/" onClick={() => setIsOpen(false)} className="w-full">
              <li className="border-b w-full p-2 text-center hover:bg-white/40 hover:text-white transition">
                Dashboard
              </li>
            </Link>
            <Link href="/news" onClick={() => setIsOpen(false)} className="w-full">
              <li className="border-b w-full p-2 text-center hover:bg-white/40 hover:text-white transition">
                Publishing
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </header>
  );
}
