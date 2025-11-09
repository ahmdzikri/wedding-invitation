"use client";

import { MailOpenIcon } from "lucide-react";
import { motion } from "motion/react";
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
        className="absolute inset-0 bg-[url('/background.webp')] bg-[length:360px_auto] bg-[position:center_calc(100%_-_100px)] bg-no-repeat"
      />
      <motion.div
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          delay: 2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="absolute left-0 right-0 bottom-0 h-[250px] bg-[url('/rumah-gadang.webp')] bg-[length:400px_auto] bg-center bg-bottom bg-no-repeat"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute w-full z-10 flex flex-col gap-4 items-center text-center px-6 max-w-md"
        style={{ 
          bottom: '17em',
          left: '50%',
          transform: 'translateX(-50%)',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-primary font-be-vietnam-pro text-xs tracking-widest uppercase">
            Undangan Pernikahan
          </p>
          <h1 className="text-5xl font-hello-paris font-bold text-primary tracking-tighter mb-2">
            {config.couple.brideName} & {config.couple.groomName}
          </h1>
          <p className="text-primary text-sm tracking-widest">
            {formatWeddingDate(config.event.date)}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {useGuestName && (
            <div className="flex flex-col items-center justify-center gap-1 mb-2">
              <span className="text-primary">
                Kepada Bapak/Ibu/Saudara/i{" "}
              </span>
              <span className="font-semibold text-primary">{displayGuestName}</span>
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
    </div>
  );
}