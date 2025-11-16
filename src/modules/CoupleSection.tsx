"use client";
import { motion } from "motion/react";
import config from "~/config/config";
import { PersonCard } from "~/components/PersonCard";

interface CoupleSectionProps {
  className?: string;
}

export default function CoupleSection({ className = "" }: CoupleSectionProps) {
  const couple = config.couple;
  return (
    <section className={`flex flex-col justify-center items-center min-h-screen px-6 py-12 text-center bg-transparent ${className}`}>
      <div className="flex flex-col gap-10 w-full justify-center items-center p-6 rounded-[32px] border relative overflow-hidden">
        <div className="absolute inset-0 rounded-[32px] bg-pattern-flower bg-contain bg-repeat mask-y-from-70% mask-y-to-90% pointer-events-none" />
        <div className="absolute inset-0 bottom-0 top-auto bg-hills bg-no-repeat bg-bottom md:bg-center h-full bg-contain md:bg-cover opacity-30 mask-t-to-30%" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 py-6 justify-center"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-amiri">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </h2>
          <p className="text-sm">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami
            bermaksud menyelenggarakan pernikahan kami:
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-8 py-8 relative z-10">
          <PersonCard
            image={couple.brideImage?.src}
            fullname={couple.brideFullname}
            orderFamily={couple.brideOrderFamily}
            fatherName={couple.brideFather}
            motherName={couple.brideMother}
            gender="bride"
          />

          <PersonCard
            image={couple.groomImage?.src}
            fullname={couple.groomFullname}
            orderFamily={couple.groomOrderFamily}
            fatherName={couple.groomFather}
            motherName={couple.groomMother}
            gender="groom"
          />
        </div>
      </div>
    </section>
  );
}
