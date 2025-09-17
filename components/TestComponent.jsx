'use client';

import { motion } from "framer-motion";


export default function TestComponent({ title, image, text }) {
  return (
    <div className="container mx-auto ">
        <motion.article initial={{opacity :0, y :20}} whileInView={{opacity : 1,y : 0}} transition={{duration : 3}} className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          {/* Image de l'article */}
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-64 object-cover"
            />
          )}
          {/* Contenu */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-700">{text}</p>
          </div>
        </motion.article>
    </div>
  );
}
