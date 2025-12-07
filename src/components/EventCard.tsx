"use client";
import { CalendarPlus, MapPinned } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

type EventCardProps =
  | {
      type: "event";
      title: string;
      date: string;
      startTime: string;
      endTime: string;
      onAddToCalendar: () => void;
      delay?: number;
    }
  | {
      type: "location";
      title: string;
      locationName: string;
      address: string;
      embedGoogleMaps: string;
      linkGoogleMaps: string;
      delay?: number;
    };

export default function EventCard(props: EventCardProps) {
  const { title, delay = 0 } = props;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-background pt-9 pb-6 px-6 rounded-2xl shadow-lg shadow-black hover:shadow-xl transition-shadow duration-300 relative overflow-hidden text-primary"
    >
      <div className="absolute left-0 right-0 bottom-0 h-full pointer-events-none">
        <Image
          src="/bg-rumah-gadang.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-bottom"
          loading="lazy"
        />
      </div>

      <h3 className="text-3xl font-hello-paris font-bold mb-10 text-center relative z-10">
        <span className="inline-block relative">
          {title}
          <Image
            src="/flower.png"
            alt=""
            width={80}
            height={80}
            className="absolute -top-5 -right-8 w-20 h-20"
            loading="lazy"
          />
        </span>
      </h3>

      {props.type === "event" ? (
        <>
          <div className="space-y-2 mb-4 text-center relative z-10">
            <p className="font-medium">{props.date}</p>
            <p className="text-sm">
              {props.startTime} - {props.endTime}
            </p>
          </div>
          <div className="text-center relative z-10">
            <Button
              onClick={props.onAddToCalendar}
              className="bg-primary hover:bg-primary/70 text-primary-foreground px-6 py-3 rounded-lg text-sm flex items-center gap-2 mx-auto"
            >
              <CalendarPlus color="var(--muted)" className="h-4 w-4" />
              Add to Calendar
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2 mb-4 text-center relative z-10">
            <p className="md:text-xl font-medium">{props.locationName}</p>
            <p className="text-xs md:text-sm">{props.address}</p>
          </div>
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto w-full aspect-video rounded-md overflow-hidden z-20 shadow-xl/20 border border-white"
            >
              <iframe
                src={props.embedGoogleMaps}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Lokasi Acara - ${props.locationName}`}
              />
            </motion.div>
            <div className="text-center relative z-10">
              <Button
                onClick={() => window.open(props.linkGoogleMaps, "_blank")}
                className="bg-primary hover:bg-primary/70 text-primary-foreground px-6 py-3 rounded-lg text-sm flex items-center gap-2 mx-auto"
              >
                <MapPinned color="var(--muted)" className="h-4 w-4" />
                Buka Google Maps
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
