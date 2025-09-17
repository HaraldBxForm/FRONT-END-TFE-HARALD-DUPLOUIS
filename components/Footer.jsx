import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={`text-gray-400 py-10 ${styles.footer}`}>
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left */}
        <p className="text-sm md:text-base text-center md:text-left font-light">
          © {new Date().getFullYear()} OceanSavers. All rights reserved.
        </p>

        {/* Center: navigation links */}
        <div className="flex space-x-6 text-sm md:text-base">
          <Link href="/about" className="hover:text-white transition-colors duration-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-300">
            Contact
          </Link>
          <Link href="/donate" className="hover:text-white transition-colors duration-300">
            Donate
          </Link>
        </div>

        {/* Right: developer */}
        <p className="text-xs md:text-sm text-gray-500 text-center md:text-right font-light">
          Developed by <span className="text-white font-medium">Harald Duplouis</span>
        </p>
      </div>
    </footer>
  );
}
