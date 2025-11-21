"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import Smoke from "~/components/ui/shadcn-io/smoke";
import config from "~/config/config";
import { formatHeaderDate } from "~/lib/wedding-functions";

interface HeaderSectionProps {
  className?: string;
}

export default function HeaderSection({ className = "" }: HeaderSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container-box bg-primary [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] h-dvh"
    >
      <div
        className={`fixed bottom-0 h-dvh w-full flex flex-col items-center justify-center text-center px-6 ${className}`}
      >
        <div className="absolute inset-0 bg-[url('/bg-header.webp')] max-w-[800px] mx-auto bg-[length:auto_calc(100dvh-40px)] bg-contain bg-center bg-bottom bg-no-repeat" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 z-20 min-w-[800px]">
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
            className="w-full bg-[url('/flower-bottom.webp')] h-[50dvh] bg-contain  bg-center bg-no-repeat"
          />
        </div>
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-[50dvh] [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_70%,rgba(0,0,0,.85)_82%,rgba(0,0,0,.6)_92%,rgba(0,0,0,.35)_98%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,rgba(0,0,0,1)_50%,rgba(0,0,0,.85)_62%,rgba(0,0,0,.6)_72%,rgba(0,0,0,.35)_82%,transparent_100%)] [mask-repeat:no-repeat][-webkit-mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-size:100%_100%]"
        >
          <Smoke
            className="w-full h-full"
            opacity={0.2}
            density={20}
            enableRotation={false}
            enableWind={false}
            enableTurbulence={false}
            color="#ffffff"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-md"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-8"
          >
            <p className="text-primary text-sm tracking-widest uppercase">
              Undangan Pernikahan
            </p>
            <h1 className="text-5xl font-hello-paris font-bold text-primary tracking-tighter mb-2">
              {config.couple.brideName} & {config.couple.groomName}
            </h1>
            <p className="text-primary/80 text-lg tracking-widest">
              {formatHeaderDate()}
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
                className="mx-auto text-primary hidden md:block"
                size={24}
                aria-label="Scroll down indicator"
              />
              <ChevronUp
                className="mx-auto text-primary md:hidden"
                size={24}
                aria-label="Swipe up indicator"
              />
              <p className="text-xs text-primary mt-2 tracking-widest">
                <span className="hidden md:inline">SCROLL</span>
                <span className="md:hidden">SWIPE</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
