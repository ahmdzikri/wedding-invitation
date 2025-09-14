"use client";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";

interface LocationSectionProps {
  className?: string;
}

export default function LocationSection({ className = "" }: LocationSectionProps) {
  return (
    <section className={`py-20 px-6 text-center bg-white ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">
          Lokasi Acara
        </p>
        <h2 className="text-2xl font-serif text-[#8E7151] mb-8">
          Peta Lokasi
        </h2>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto w-full aspect-video rounded-md overflow-hidden shadow-md border-4 border-[#F9F3E9]"
      >
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <MapPin className="h-12 w-12 text-[#C4A77D] mr-2" />
          <span className="text-[#8E7151]">Peta Lokasi</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-8 max-w-md mx-auto"
      >
        <h3 className="text-xl font-serif text-[#8E7151] mb-2">
          Ballroom Grand Hotel
        </h3>
        <p className="text-[#8E7151]">
          Jl. Pernikahan No. 123, Jakarta Selatan
        </p>
        <div className="mt-6">
          <Button
            className="bg-[#C4A77D] hover:bg-[#B39B74] text-white px-6 py-2 rounded-md text-sm tracking-wider"
            onClick={() => window.open("https://maps.google.com", "_blank")}
          >
            Buka Google Maps
          </Button>
        </div>
      </motion.div>
    </section>
  );
}