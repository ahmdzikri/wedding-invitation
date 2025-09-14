"use client";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";

interface SaveTheDateSectionProps {
  className?: string;
}

export default function SaveTheDateSection({ className = "" }: SaveTheDateSectionProps) {
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
          Save the Date
        </p>
        <h2 className="text-2xl font-serif text-[#8E7151] mb-8">
          Insya Allah akan diselenggarakan pada:
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white p-6 rounded-md shadow-sm"
        >
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-[#C4A77D] mr-2" />
          </div>
          <h3 className="text-xl font-serif text-[#8E7151] mb-2">
            Akad Nikah
          </h3>
          <div className="space-y-1 mb-4">
            <p className="text-[#8E7151]">Sabtu, 15 Juni 2025</p>
            <p className="text-[#8E7151]">08:00 - 10:00 WIB</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#8E7151]">Masjid Al-Hidayah</p>
            <p className="text-[#8E7151]">Jl. Pernikahan No. 123</p>
            <p className="text-[#8E7151]">Jakarta Selatan</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white p-6 rounded-md shadow-sm"
        >
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-[#C4A77D] mr-2" />
          </div>
          <h3 className="text-xl font-serif text-[#8E7151] mb-2">Resepsi</h3>
          <div className="space-y-1 mb-4">
            <p className="text-[#8E7151]">Sabtu, 15 Juni 2025</p>
            <p className="text-[#8E7151]">11:00 - 15:00 WIB</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#8E7151]">Ballroom Grand Hotel</p>
            <p className="text-[#8E7151]">Jl. Pernikahan No. 123</p>
            <p className="text-[#8E7151]">Jakarta Selatan</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 max-w-md mx-auto text-center"
      >
        <p className="text-[#8E7151] italic">
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada
          kami."
        </p>
      </motion.div>
    </section>
  );
}