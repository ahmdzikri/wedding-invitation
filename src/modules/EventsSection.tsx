"use client";
import { motion } from "motion/react";
import EventCard from "~/components/EventCard";
import config from "~/config/config";
import { generateGoogleCalendarUrl } from "~/lib/utils";
import { formatWeddingDate, formatWeddingTime } from "~/lib/wedding-functions";

interface EventsSectionProps {
  className?: string;
}

export default function EventsSection({ className = "" }: EventsSectionProps) {
  const events = config.event;
  const couple = config.couple;

  const handleAddToCalendar = (eventType: "akad" | "resepsi") => {
    const eventData = events.eventDetails[eventType];
    const calendarEvents = {
      akad: {
        title: `Akad Nikah - ${couple.brideName} & ${couple.groomName}`,
        startDate:
          eventData.date.replace(/-/g, "") +
          "T" +
          eventData.startTime.replace(":", "") +
          "00",
        endDate:
          eventData.date.replace(/-/g, "") +
          "T" +
          eventData.endTime.replace(":", "") +
          "00",
        location: `${eventData.location.name}, ${eventData.location.address}`,
        description: `Akad Nikah ${couple.brideName} & ${couple.groomName}`,
      },
      resepsi: {
        title: `Resepsi - ${couple.brideName} & ${couple.groomName}`,
        startDate:
          eventData.date.replace(/-/g, "") +
          "T" +
          eventData.startTime.replace(":", "") +
          "00",
        endDate:
          eventData.date.replace(/-/g, "") +
          "T" +
          eventData.endTime.replace(":", "") +
          "00",
        location: `${eventData.location.name}, ${eventData.location.address}`,
        description: `Resepsi Pernikahan ${couple.brideName} & ${couple.groomName}`,
      },
    };

    const calendarUrl = generateGoogleCalendarUrl(calendarEvents[eventType]);
    window.open(calendarUrl, "_blank");
  };
  return (
    <section
      className={`relative pb-12 px-4 text-center bg-background ${className}`}
    >
      <div className="absolute inset-0 bottom-0 top-auto bg-hills bg-no-repeat bg-bottom md:bg-center h-full bg-contain md:bg-cover opacity-30 mask-t-to-90%" />
      <div className="px-4 py-18 bg-primary rounded-4xl relative">
        <div className="absolute inset-0 rounded-4xl bg-pattern-batik bg-auto bg-repeat pointer-events-none opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-xl text-primary-foreground mb-8">
            Insya Allah akan diselenggarakan pada:
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
          {/* Akad Card */}
          <EventCard
            type="event"
            title="Akad Nikah"
            date={formatWeddingDate(events.eventDetails.akad.date)}
            startTime={formatWeddingTime(events.eventDetails.akad.startTime)}
            endTime={formatWeddingTime(events.eventDetails.akad.endTime)}
            onAddToCalendar={() => handleAddToCalendar("akad")}
            delay={0}
          />

          {/* Resepsi Card */}
          <EventCard
            type="event"
            title="Resepsi"
            date={formatWeddingDate(events.eventDetails.resepsi.date)}
            startTime={formatWeddingTime(events.eventDetails.resepsi.startTime)}
            endTime={formatWeddingTime(events.eventDetails.resepsi.endTime)}
            onAddToCalendar={() => handleAddToCalendar("resepsi")}
            delay={0.2}
          />
          <div className="md:col-span-2">
            <EventCard
              type="location"
              title="Lokasi Acara"
              locationName={events.eventDetails.resepsi.location.name}
              address={events.eventDetails.resepsi.location.address}
              embedGoogleMaps={events.eventDetails.resepsi.location.embedGoogleMaps}
              linkGoogleMaps={events.eventDetails.resepsi.location.linkGoogleMaps}
              delay={0.4}
            />
          </div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 max-w-md mx-auto text-center relative z-10"
        >
          <p className="font-arima text-sm md:text-base italic text-primary-foreground text-shadow-lg leading-loose">
            "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada
            kami."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
