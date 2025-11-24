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
        className={`fixed bottom-0 h-dvh w-full flex flex-col items-center justify-center text-center ${className}`}
      >
        <div className="relative flex max-w-lg mx-auto aspect-[600/1039] bg-frame-flower bg-no-repeat bg-center bg-contain p-4">
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col gap-2 items-center justify-center px-10 text-center"
            >
              <p className="text-primary text-sm tracking-widest uppercase -mb-2">
                Undangan Pernikahan
              </p>
              <h1 className="text-5xl font-hello-paris font-bold text-primary tracking-tighter mb-1">
                {config.couple.brideName} & {config.couple.groomName}
              </h1>
              <p className="text-primary/80 text-sm tracking-widest">
                {formatHeaderDate()}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="animate-bounce mt-10">
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
          </div>
        </div>
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-[50dvh] [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_70%,rgba(0,0,0,.85)_82%,rgba(0,0,0,.6)_92%,rgba(0,0,0,.35)_98%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,rgba(0,0,0,1)_50%,rgba(0,0,0,.85)_62%,rgba(0,0,0,.6)_72%,rgba(0,0,0,.35)_82%,transparent_100%)] [mask-repeat:no-repeat][-webkit-mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-size:100%_100%]">
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
      </div>
    </motion.div>
  );
}
