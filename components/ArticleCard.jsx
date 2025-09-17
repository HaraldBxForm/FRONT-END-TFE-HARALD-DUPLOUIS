import Link from "next/link";

export default function ArticleCard({ article }) {

  //? Formatage de la date 
  // Créer un objet Date depuis la chaîne article.date
  const date = new Date(article.date);

  // Formater la date en anglais
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/news/${article.id}`}
      className="block transform transition-transform duration-300 hover:scale-101"
    >
      <div className="bg-white/0 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-lg hover:shadow-xl transition-shadow">
        {/* Image */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover"
        />

        {/* Contenu */}
        <div className="p-6 flex flex-col flex-1 text-gray-100 bg-gradient-to-t from-black/30 to-transparent">
          <p className="text-gray-400 flex-1 mb-1">{formattedDate}</p>
          <h2 className="text-2xl font-bold mb-1 text-white">{article.title}</h2>
          <p className="text-gray-200 flex-1 mb-4">{article.preview}</p>

          {/* Bouton Learn More */}
          <div className="mt-auto self-start bg-white/20 backdrop-blur-md text-white font-semibold py-2 px-4 rounded-full inline-block transition hover:bg-white/40 hover:scale-105">
            Learn more
          </div>
        </div>
      </div>
    </Link>
  );
}
