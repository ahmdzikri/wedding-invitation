"use client";
import { motion } from "motion/react";
import { CountdownTimer } from "~/components/CountdownTimer";
import config from "~/config/config";
import { getEventDateTime } from "~/lib/wedding-functions";

interface CountdownSectionProps {
  className?: string;
  ref?: React.Ref<HTMLElement>;
}

export default function CountdownSection({
  className = "",
  ref,
}: CountdownSectionProps) {
  return (
    <section
      className={`relative z-10 px-6 pt-32 pb-12 text-center bg-background w-full min-h-screen flex items-start justify-center ${className}`}
      ref={ref}
    >
      <div className="absolute inset-0 bottom-0 top-auto bg-hills bg-no-repeat bg-top h-[60%] md:h-[80%] bg-cover" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0 z-20 min-w-[280px] w-full max-w-[800px]">
        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
          className="w-full bg-rumah-gadang h-[50dvh] bg-contain bg-bottom bg-no-repeat"
        />
      </div>
      <div className="max-w-2xl mx-auto relative">
        <div
          className="absolute inset-0 rounded-4xl z-10 pointer-events-none animated-gradient-border p-[5px]"
          style={{
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          }}
        />
        <CountdownTimer
          targetLocal={getEventDateTime({
            date: config.countdown.targetDate,
            time: config.countdown.targetTime,
          })}
          timeZone={config.countdown.timeZone}
        />
        <div className="relative z-30 p-4 text-primary rounded-2xl bg-white/70 m-4">
          <p className="text-base md:text-xl font-amiri mb-4 leading-loose">
            {config.quranVerse.arabic}
          </p>

          <p className="font-arima text-xs md:text-base mb-4 italic">
            {config.quranVerse.translation}
          </p>

          <p className="font-bold text-xs md:text-sm">
            ({config.quranVerse.source})
          </p>
        </div>
      </div>
    </section>
  );
}
