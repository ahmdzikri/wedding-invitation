"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface HeaderSectionProps {
  className?: string;
}

export default function HeaderSection({ className = "" }: HeaderSectionProps) {
  return (
    <section className={`h-dvh flex flex-col items-center justify-center text-center px-6 relative ${className}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=800')] bg-cover bg-center opacity-10" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <p className="text-[#C4A77D] text-sm tracking-widest uppercase mb-2">
            Undangan Pernikahan
          </p>
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Wedding ornament"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-great-vibes text-[#8E7151] mb-2">
            Nisa & Reza
          </h1>
          <p className="text-[#C4A77D] text-lg tracking-widest">
            15 • 05 • 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8"
        >
          <div className="animate-bounce mt-16">
            {/* Desktop: ChevronDown, Mobile/Tablet: ChevronUp */}
            <ChevronDown 
              className="mx-auto text-[#C4A77D] hidden md:block" 
              size={24}
              aria-label="Scroll down indicator"
            />
            <ChevronUp 
              className="mx-auto text-[#C4A77D] md:hidden" 
              size={24}
              aria-label="Swipe up indicator"
            />
            <p className="text-xs text-[#C4A77D] mt-2 tracking-widest">
              <span className="hidden md:inline">SCROLL</span>
              <span className="md:hidden">SWIPE</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}