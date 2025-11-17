"use client";
import { CalendarPlus, Flower2, Heart } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
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
    <section className={`py-20 px-4 text-center bg-muted ${className}`}>
      <div className="px-6 py-18 bg-foreground rounded-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-xl text-muted mb-8">
            Insya Allah akan diselenggarakan pada:
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Akad Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-muted p-8 rounded-2xl shadow-lg shadow-black hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-4xl font-hello-paris font-bold mb-2 text-center">
              Akad Nikah
            </h3>
            <div className="space-y-2 mb-6 text-center">
              <p className="text-lg font-medium">
                {formatWeddingDate(events.eventDetails.akad.date)}
              </p>
              <p>
                {formatWeddingTime(events.eventDetails.akad.startTime)} -{" "}
                {formatWeddingTime(events.eventDetails.akad.endTime)}
              </p>
            </div>
            <div className="text-center">
              <Button
                onClick={() => handleAddToCalendar("akad")}
                className="bg-primary hover:bg-primary/70 text-muted px-6 py-3 rounded-lg text-sm flex items-center gap-2 mx-auto"
              >
                <CalendarPlus color="var(--muted)" className="h-4 w-4" />
                Add to Calendar
              </Button>
            </div>
          </motion.div>

          {/* Resepsi Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-muted p-8 rounded-2xl shadow-lg shadow-black hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-4xl font-hello-paris font-bold mb-2 text-center">
              Resepsi
            </h3>
            <div className="space-y-2 mb-6 text-center">
              <p className="text-lg font-medium">
                {formatWeddingDate(events.eventDetails.resepsi.date)}
              </p>
              <p>
                {formatWeddingTime(events.eventDetails.resepsi.startTime)} -{" "}
                {formatWeddingTime(events.eventDetails.resepsi.endTime)}
              </p>
            </div>
            <div className="text-center">
              <Button
                onClick={() => handleAddToCalendar("resepsi")}
                className="bg-primary hover:bg-primary/70 text-muted px-6 py-3 rounded-lg text-sm flex items-center gap-2 mx-auto"
              >
                <CalendarPlus color="var(--muted)" className="h-4 w-4" />
                Add to Calendar
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 max-w-md mx-auto text-center"
        >
          <p className="text-muted italic">
            "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada
            kami."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
