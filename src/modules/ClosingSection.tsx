"use client";
import { motion } from "motion/react";
import Image from "next/image";

interface ClosingSectionProps {
  className?: string;
}

export default function ClosingSection({ className = "" }: ClosingSectionProps) {
  return (
    <section className={`py-20 px-6 text-center bg-[#F9F3E9] ${className}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-6"
      >
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Ornament"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-8 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-serif text-[#8E7151] mb-4">
          Terima Kasih
        </h2>
        <p className="text-[#8E7151] mb-6">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <p className="text-xl font-serif text-[#8E7151] mb-8">Rina & Dimas</p>

        <div className="mt-8 pt-8 border-t border-[#E8D4B9]">
          <p className="text-[#8E7151] italic">
            "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu
            mengingat kebesaran Allah."
          </p>
          <p className="text-[#C4A77D] text-sm mt-2">
            (QS. Adz-Dzariyat: 49)
          </p>
        </div>
      </motion.div>
    </section>
  );
}