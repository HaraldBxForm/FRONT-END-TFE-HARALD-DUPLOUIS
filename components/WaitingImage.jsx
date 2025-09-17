import Link from "next/link";
import styles from "../styles/Footer.module.css";
import { div } from "framer-motion/client";

export default function WatingImage() {
  return (
    <div className="flex flex-col items-center justify-center w-full rounded-2xl overflow-hidden border border-white/5 backdrop-blur-md">
  <img 
    src="/images/beautiful-photo-sea-waves.jpg" 
    alt="Sea waves" 
    className="w-full h-full object-cover" 
  />
</div>
  );
}
