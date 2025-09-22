"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { getCoupleData } from "~/lib/wedding-functions";

interface CoupleSectionProps {
  className?: string;
}

export default function CoupleSection({ className = "" }: CoupleSectionProps) {
  const data = getCoupleData();
  return (
    <section className={`py-20 px-6 text-center bg-[#F9F3E9] h-[100dvh] ${className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">
            Mempelai
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-[#E8D4B9]">
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Pengantin Wanita"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif text-[#8E7151] mb-2">
              {data.bride.fullName}
            </h3>
            <p className="text-[#C4A77D] mb-4 text-sm">Putri dari</p>
            <p className="text-[#8E7151]">`Bapak {data.bride.parents.father} & Ibu {data.bride.parents.mother}`</p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-[#E8D4B9]">
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Pengantin Pria"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif text-[#8E7151] mb-2">
              {data.groom.fullName}
            </h3>
            <p className="text-[#C4A77D] mb-4 text-sm">Putra dari</p>
            <p className="text-[#8E7151]">`Bapak {data.groom.parents.father} & Ibu {data.groom.parents.mother}`</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}