"use client";
import { MapPinned } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import config from "~/config/config";

interface LocationSectionProps {
  className?: string;
}

export default function LocationSection({ className = "" }: LocationSectionProps) {
  const data = config.event;
  return (
    <section className={`py-20 px-6 text-center bg-white p-6 rounded-t-4xl shadow-sm ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        
        className="mb-12 max-w-4xl mx-auto"
      >
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">
          Lokasi Acara
        </p>
        <h2 className="text-2xl font-serif text-[#8E7151] mb-1">
          {data.eventDetails.resepsi.location.name}
        </h2>
        <p className="text-[#8E7151]">
          {data.eventDetails.resepsi.location.address}
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        
        className="max-w-2xl mx-auto w-full aspect-video rounded-md overflow-hidden shadow-md border-4 border-[#F9F3E9]"
      >
        <iframe 
          src={data.eventDetails.resepsi.location.embedGoogleMaps}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title={`Lokasi Acara - ${data.eventDetails.resepsi.location.name}`}
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        
        className="mt-8 max-w-md mx-auto"
      >
        <div className="mt-6">
          <Button
            className="bg-[#C4A77D] hover:bg-[#B39B74] text-white px-6 py-2 rounded-md text-sm tracking-wider"
            onClick={() => window.open(data.eventDetails.resepsi.location.linkGoogleMaps, "_blank")}
          >
            <MapPinned className="h-4 w-4" />
            Buka Google Maps
          </Button>
        </div>
      </motion.div>
    </section>
  );
}