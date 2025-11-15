"use client";

import { MailOpenIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import Smoke from "~/components/ui/shadcn-io/smoke";
import config from "~/config/config";
import { formatWeddingDate } from "~/lib/wedding-functions";

interface IntroSectionProps {
  useGuestName?: boolean;
  decodedGuestName?: string;
  onOpenInvitation?: () => void;
}

export default function IntroSection({
  useGuestName = true,
  decodedGuestName,
  onOpenInvitation,
}: IntroSectionProps) {
  const searchParams = useSearchParams();
  const guestName =
    decodedGuestName ?? (searchParams.get("to") || "Tamu Terhormat");
  const displayGuestName = decodeURIComponent(guestName.replace(/\+/g, " "));

  return (
    <div className="h-dvh w-full mx-auto bg-primary flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 mask-b-from-30% mask-b-to-90%">
        <Smoke
          density={20}
          opacity={0.4}
          enableRotation={false}
          enableWind={false}
          enableTurbulence={false}
          color="#ffffff"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 3,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="absolute bottom-10 w-[min(100%,800px)] max-h-[calc(100dvh-80px)] left-1/2 -translate-x-1/2 flex items-center justify-center"
      >
        <div
          className="relative w-full"
          style={{ maxHeight: "calc(100dvh - 80px)" }}
        >
          <Image
            src="/background.webp"
            alt="Background"
            width={890}
            height={1285}
            className="w-full h-auto object-contain"
            style={{
              maxHeight: "calc(100dvh - 80px)",
            }}
            priority
          />
          <motion.div
            initial={{ y: 600 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              delay: 2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="absolute left-0 right-0 -bottom-10 h-[35%] bg-rumah-gadang bg-contain bg-bottom bg-no-repeat"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute z-10 flex flex-col gap-6 items-center text-center px-6 max-w-md"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-primary font-be-vietnam-pro text-xs lg:text-base tracking-widest uppercase">
              Undangan Pernikahan
            </p>
            <h1 className="text-5xl md:text-7xl font-hello-paris font-bold text-primary tracking-tighter mb-2">
              {config.couple.brideName} & {config.couple.groomName}
            </h1>
            <p className="text-primary text-sm lg:text-base tracking-widest">
              {formatWeddingDate(config.event.date)}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {useGuestName && (
              <div className="flex flex-col items-center justify-center gap-1 mb-2 px-4">
                <span className="text-primary">
                  Kepada Bapak/Ibu/Saudara/i{" "}
                </span>
                <span className="font-semibold text-primary">
                  {displayGuestName}
                </span>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onOpenInvitation ?? (() => {})}
                className="bg-primary hover:bg-primary/70 text-muted font-semibold !px-7 py-5 rounded-full text-sm md:text-md tracking-wider"
              >
                <MailOpenIcon color="var(--muted)" />
                Buka Undangan
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* <motion.div
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          delay: 2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="absolute left-0 right-0 bottom-0 h-[30dvh] bg-[url('/rumah-gadang.webp')] bg-contain bg-bottom bg-no-repeat"
      /> */}
    </div>
  );
}
