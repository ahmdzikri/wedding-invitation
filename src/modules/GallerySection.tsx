"use client";
import { motion } from "motion/react";
import Image from "next/image";

interface GallerySectionProps {
  className?: string;
}

export default function GallerySection({ className = "" }: GallerySectionProps) {
  return (
    <section className={`py-20 px-6 text-center bg-[#F9F3E9] ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">
          Galeri Foto
        </p>
        <h2 className="text-2xl font-serif text-[#8E7151] mb-8">
          Momen Bahagia Kami
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="aspect-square overflow-hidden rounded-md shadow-sm"
          >
            <Image
              src={`/placeholder.svg?height=300&width=300&text=Photo ${i}`}
              alt={`Foto pasangan ${i}`}
              width={300}
              height={300}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}