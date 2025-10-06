"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { CountdownTimer } from "~/components/CountdownTimer";
import config from "~/config/config";
import { getEventDateTime } from "~/lib/wedding-functions";

interface QuranVerseSectionProps {
  className?: string;
  ref?: React.Ref<HTMLElement>;
}

export default function QuranVerseSection({
  className = "", ref }: QuranVerseSectionProps) {
  return (
    <section className={`py-20 px-6 text-center bg-white ${className}`} ref={ref}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8 items-center justify-center flex">
          <Image
            src="/Rumah-Minang.png"
            alt="Ornament"
            width={140}
            height={104}
            className="object-contain"
          />
        </div>
        <CountdownTimer
          targetLocal={getEventDateTime({
            date: config.countdown.targetDate,
            time: config.countdown.targetTime,
          })}
          timeZone={config.countdown.timeZone}
        />
        <div className="bg-[#F9F3E9] p-8 rounded-md">
          <p className="text-xl font-amiri text-[#8E7151] mb-6 leading-loose">
            {config.quranVerse.arabic}
          </p>

          <p className="text-[#8E7151] mb-4 italic">
            {config.quranVerse.translation}
          </p>

          <p className="text-[#C4A77D] text-sm">({config.quranVerse.source})</p>
        </div>
      </motion.div>
    </section>
  );
}
