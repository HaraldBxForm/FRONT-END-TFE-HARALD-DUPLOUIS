import Image from "next/image";
import HomeHero from "@/components/HomeHero.jsx";
import HomeArticle from "@/components/HomeArticle.jsx";
import NewsletterForm from "@/components/NewsLetterForm.jsx"

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeArticle />
    </>
  );
}
