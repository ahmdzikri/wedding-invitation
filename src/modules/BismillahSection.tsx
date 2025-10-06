"use client";
import { motion } from "motion/react";

interface BismillahSectionProps {
  className?: string;
}

export default function BismillahSection({ className = "" }: BismillahSectionProps) {
  return (
    <section className={`py-12 px-6 text-center bg-white ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-amiri text-[#8E7151] mb-8">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </h2>
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">
          Bismillahirrahmanirrahim
        </p>
        <p className="text-[#8E7151] mb-6 max-w-md mx-auto">
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami
          bermaksud menyelenggarakan pernikahan kami:
        </p>
      </motion.div>
    </section>
  );
}