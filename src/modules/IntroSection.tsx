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
    <div className="min-h-screen h-dvh w-full mx-auto bg-primary flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <Smoke density={25} enableTurbulence={false} color="#f8efef" />
      </div>
      {/* Background pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          scale: { type: "spring", visualDuration: 0.8 },
        }}
        className="absolute inset-0 bg-[url('/bg.webp')] bg-[length:360px_auto] bg-center bg-no-repeat"
      />

      {/* Backdrop image in the middle */}
      {/* <div className="absolute inset-0 flex items-start justify-center py-6 px-6 pointer-events-none">
        <div className="w-[clamp(360px,90vw,900px)] max-h-[calc(100vh-3rem)] aspect-[835/1712]">
          <img
            src="/backdrop.svg"
            alt="Backdrop ornament"
            width={835}
            height={1712}
            loading="eager"
            className="w-full h-full object-contain"
          />
        </div>
      </div> */}

      {/* Decorative elements */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-1 rotate-90">
          <Image
            src="/ornamen-1.webp"
            alt="Ornament 1"
            width={220}
            height={220}
            className="object-contain pointer-events-none"
            priority
          />
        </div>
        <div className="absolute -top-1 -left-1.5 rotate-270" aria-hidden>
          <Image
            src="/flower.webp"
            alt="Flower ornament"
            width={220}
            height={220}
            className="object-contain pointer-events-none"
            priority
          />
        </div>
        <div className="absolute bottom-0 right-0 rotate-180">
          <Image
            src="/flower-ornamen.png"
            alt="Flower ornament"
            width={220}
            height={220}
            className="object-contain pointer-events-none"
            priority
          />
        </div>
      </div> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col justify-center gap-4 items-center text-center px-6 max-w-md"
      >
        {/* <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative flex items-center justify-center font-hello-paris mt-[-10rem] text-center"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src="/flower-outline.png"
              alt=""
              className="object-contain w-[280px] h-[287.9px]"
            />
          </div>
          <h2 className="relative z-10 text-8xl text-foreground -translate-y-4">
            {config.couple.brideName.charAt(0).toUpperCase()}
          </h2>
          <h2 className="relative z-10 text-8xl text-foreground">
            {config.couple.groomName.charAt(0).toUpperCase()}
          </h2>
        </motion.div> */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="-mt-12"
        >
          <p className="text-primary font-be-vietnam-pro text-xs tracking-widest uppercase mb-4">
            Undangan Pernikahan
          </p>
          <h1 className="text-5xl font-tangerine font-bold text-primary mb-2">
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
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <span className="text-secondary">
                Kepada Bapak/Ibu/Saudara/i{" "}
              </span>
              <span className="font-semibold">{displayGuestName}</span>
            </div>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onOpenInvitation ?? (() => {})}
              className="bg-primary hover:bg-primary/70 text-muted font-semibold !px-7 py-5 rounded-xl text-sm md:text-md tracking-wider"
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
