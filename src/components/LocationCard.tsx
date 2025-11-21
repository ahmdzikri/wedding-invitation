"use client";
import { MapPinned } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

interface LocationCardProps {
  title: string;
  locationName: string;
  address: string;
  embedGoogleMaps: string;
  linkGoogleMaps: string;
  delay?: number;
}

export default function LocationCard({
  title,
  locationName,
  address,
  embedGoogleMaps,
  linkGoogleMaps,
  delay = 0,
}: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8 }}
      className="bg-muted pt-9 pb-6 px-6 rounded-2xl shadow-lg shadow-black hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
    >
      <div className="absolute left-0 right-0 bottom-0 h-full bg-[url('/bg-rumah-gadang.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none" />

      <h3 className="text-3xl font-hello-paris font-bold mb-10 text-center relative z-10">
        <span className="inline-block relative">
          {title}
          <Image
            src="/flower.png"
            alt="flower"
            width={400}
            height={400}
            className="absolute -top-5 -right-8 w-20 h-20"
          />
        </span>
      </h3>
      <div className="space-y-2 mb-4 text-center relative z-10">
        <p className="font-medium">{locationName}</p>
        <p className="text-sm">{address}</p>
      </div>
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto w-full aspect-video rounded-md overflow-hidden z-20 shadow-xl/20 border border-white"
        >
          <iframe
            src={embedGoogleMaps}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Lokasi Acara - ${locationName}`}
          />
        </motion.div>
        <div className="text-center relative z-10">
          <Button
            onClick={() => window.open(linkGoogleMaps, "_blank")}
            className="bg-primary hover:bg-primary/70 text-primary-foreground px-6 py-3 rounded-lg text-sm flex items-center gap-2 mx-auto"
          >
            <MapPinned color="var(--muted)" className="h-4 w-4" />
            Buka Google Maps
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
