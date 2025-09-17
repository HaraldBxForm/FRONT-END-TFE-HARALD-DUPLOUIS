import ArticlesList from "@/components/ArticlesList.jsx";

export default function News() {
  return (
    <div className="relative min-h-screen w-full">

      {/* Image de fond fixe */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0 blur-md"
        style={{ backgroundImage: "url('/images/medias-remixes-esthetiques-de-fond-de-nature-etoilee-de-l-ocean.jpg')" }}
      />

      {/* Overlay sombre */}
      <div className="fixed inset-0 bg-black/30 z-10" />

      {/* Contenu */}
      <div className="relative z-20 px-4 py-8 min-h-screen">
        <ArticlesList />
      </div>
    </div>
  );
}
