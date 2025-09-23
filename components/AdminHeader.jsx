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
          <Link href="/admin" className="flex items-center">
            <img
              src="/images/logo-white.png"
              alt="OceanSavers Logo"
              className="h-8 w-auto max-w-full mr-2"
            />
            <span className="text-lg md:text-xl">OceanSavers</span>
          </Link>
        </div>

        {/* Menu desktop */}
        <nav className="hidden lg:block">
          <ul className={`flex space-x-6 text-md font-medium ${styles.gap}`}>
            <li><Link href="/admin" className="hover:text-yellow-400">Home</Link></li>
            <li><Link href="/admin/new-article" className="hover:text-yellow-400"><span className="text-[#2a6aa6] font-bold">+</span> New Article</Link></li>
            <li><Link href="/admin/articles" className="hover:text-yellow-400">Articles</Link></li>
            <li><Link href="/admin/newsletter" className="hover:text-yellow-400">Newsletter</Link></li>
            <li><Link href="/admin/inbox" className="hover:text-yellow-400">Inbox</Link></li>
            <li><Link href="/admin/users" className="hover:text-yellow-400">Users</Link></li>
          </ul>
        </nav>
            <div className={`flex space-x-6 text-md font-medium items-center`}>
              <p className="text-red-500 font-bold py-1rounded-xl">● Admin</p>
              <button className="bg-[#2a6aa6] border-white/20 hover:bg-[#164477] cursor-pointer py-1 px-3 rounded-md">Log Out</button>
            </div>

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
            <Link href="/admin" onClick={() => setIsOpen(false)} className="w-full">
              <li className="border-b w-full p-2 text-center hover:bg-white/40 hover:text-white transition">
                Home
              </li>
            </Link>
            <Link href="/admin/new-article" onClick={() => setIsOpen(false)} className="w-full">
              <li className="border-b w-full p-2 text-center hover:bg-white/40 hover:text-white transition">
                + New Article
              </li>
            </Link>
            <Link href="/admin/articles" onClick={() => setIsOpen(false)} className="w-full">
              <li className="border-b w-full p-2 text-center hover:bg-white/40 hover:text-white transition">
                Articles
              </li>
            </Link>
            <Link href="/admin/newsletter" onClick={() => setIsOpen(false)} className="w-full">
              <li className="border-b w-full p-2 text-center hover:bg-white/40 hover:text-white transition">
                Newsletter
              </li>
            </Link>
            <Link href="/admin/inbox" onClick={() => setIsOpen(false)} className="w-full">
              <li className="border-b w-full p-2 text-center hover:bg-white/40 hover:text-white transition">
                Inbox
              </li>
            </Link>
            <Link href="/admin/users" onClick={() => setIsOpen(false)} className="w-full">
              <li className="border-b w-full p-2 text-center hover:bg-white/40 hover:text-white transition">
                Users
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </header>
  );
}
