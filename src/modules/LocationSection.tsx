"use client";
import { MapPinned } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";

interface LocationSectionProps {
  className?: string;
}

export default function LocationSection({ className = "" }: LocationSectionProps) {
  return (
    <section className={`py-20 px-6 text-center bg-white p-6 rounded-t-4xl shadow-sm ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">
          Lokasi Acara
        </p>
        <h2 className="text-2xl font-serif text-[#8E7151] mb-1">
          Rumah Gadang Gebu Minang
        </h2>
        <p className="text-[#8E7151]">
          Jl. Gayung Kebonsari No.64, Ketintang, Kec. Gayungan, Surabaya
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto w-full aspect-video rounded-md overflow-hidden shadow-md border-4 border-[#F9F3E9]"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.8262579853263!2d112.72715977582013!3d-7.3300140720924185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb5d91126c39%3A0x32917d51ab54dda3!2sRumah%20Gadang%20Gebu%20Minang!5e0!3m2!1sen!2sid!4v1758439594270!5m2!1sen!2sid"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Acara - Gebu Minang, Gayungan, Surabaya"
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-8 max-w-md mx-auto"
      >
        <div className="mt-6">
          <Button
            className="bg-[#C4A77D] hover:bg-[#B39B74] text-white px-6 py-2 rounded-md text-sm tracking-wider"
            onClick={() => window.open("https://maps.app.goo.gl/upJDdHfoa33fBjoD8", "_blank")}
          >
            <MapPinned className="h-4 w-4" />
            Buka Google Maps
          </Button>
        </div>
      </motion.div>
    </section>
  );
}