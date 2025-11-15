"use client";
import { motion } from "motion/react";
import Image from "next/image";
import config from "~/config/config";

interface CoupleSectionProps {
  className?: string;
}

export default function CoupleSection({ className = "" }: CoupleSectionProps) {
  const couple = config.couple;
  return (
    <section className={`px-6 py-12 text-center bg-muted ${className}`}>
      <div className="p-6 rounded-[32px] border relative overflow-hidden">
        <div 
          className="absolute inset-0 rounded-[32px] bg-pattern-flower bg-contain bg-repeat mask-t-to-90% pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl pt-4 pb-6 font-amiri text-accent">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </h2>
          <p className="text-sm text-secondary mb-6 max-w-md mx-auto">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami
            bermaksud menyelenggarakan pernikahan kami:
          </p>
        </motion.div>
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
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
              <h3 className="text-2xl text-[#8E7151] mb-2">
                {couple.brideFullname}
              </h3>
              <p className="text-[#C4A77D] mb-2 text-sm">
                Putri Ke-{couple.bridePosition} dari
              </p>
              <p className="text-[#8E7151]">
                Bapak {couple.brideFather} & Ibu {couple.brideMother}
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
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
                {couple.groomFullname}
              </h3>
              <p className="text-[#C4A77D] mb-2 text-sm">
                Putra Ke-{couple.groomPosition} dari
              </p>
              <p className="text-[#8E7151]">
                Bapak {couple.groomFather} & Ibu {couple.groomMother}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
