"use client";
import { motion } from "motion/react";
import Image from "next/image";

interface QuranVerseSectionProps {
  className?: string;
}

export default function QuranVerseSection({ className = "" }: QuranVerseSectionProps) {
  return (
    <section className={`py-20 px-6 text-center bg-white ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Ornament"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </div>

        <div className="bg-[#F9F3E9] p-8 rounded-md">
          <p className="text-xl font-amiri text-[#8E7151] mb-6 leading-loose">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا
            لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ
            إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
          </p>

          <p className="text-[#8E7151] mb-4 italic">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa
            kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar
            terdapat tanda-tanda bagi kaum yang berfikir."
          </p>

          <p className="text-[#C4A77D] text-sm">(QS. Ar-Rum: 21)</p>
        </div>
      </motion.div>
    </section>
  );
}