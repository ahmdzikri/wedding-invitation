"use client";
import { CalendarPlus, Flower2, Heart } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import { generateGoogleCalendarUrl } from "~/lib/utils";
import {
  formatWeddingDate,
  formatWeddingTime,
  getCoupleData,
  getEventsData
} from "~/lib/wedding-functions";

interface SaveTheDateSectionProps {
  className?: string;
}

export default function SaveTheDateSection({
  className = "",
}: SaveTheDateSectionProps) {
  // Get dynamic data from JSON
  const events = getEventsData();
  const couple = getCoupleData();

  const handleAddToCalendar = (eventType: "akad" | "resepsi") => {
    const eventData = events[eventType];
    const calendarEvents = {
      akad: {
        title: `Akad Nikah - ${couple.bride.nickname} & ${couple.groom.nickname}`,
        startDate:
          eventData.date.replace(/-/g, "") +
          "T" +
          eventData.time.replace(":", "") +
          "00",
        endDate:
          eventData.date.replace(/-/g, "") +
          "T" +
          (Number.parseInt(eventData.time.split(":")[0]) + 2)
            .toString()
            .padStart(2, "0") +
          eventData.time.split(":")[1] +
          "00",
        location: `${eventData.location.name}, ${eventData.location.address}`,
        description: `Akad Nikah ${couple.bride.nickname} & ${couple.groom.nickname}`,
      },
      resepsi: {
        title: `Resepsi - ${couple.bride.nickname} & ${couple.groom.nickname}`,
        startDate:
          eventData.date.replace(/-/g, "") +
          "T" +
          eventData.time.replace(":", "") +
          "00",
        endDate:
          eventData.date.replace(/-/g, "") +
          "T" +
          (Number.parseInt(eventData.time.split(":")[0]) + 4)
            .toString()
            .padStart(2, "0") +
          eventData.time.split(":")[1] +
          "00",
        location: `${eventData.location.name}, ${eventData.location.address}`,
        description: `Resepsi Pernikahan ${couple.bride.nickname} & ${couple.groom.nickname}`,
      },
    };

    const calendarUrl = generateGoogleCalendarUrl(calendarEvents[eventType]);
    window.open(calendarUrl, "_blank");
  };
  return (
    <section className={`py-20 px-4 text-center bg-[#F9F3E9] ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-serif text-[#8E7151] mb-8">
          Insya Allah akan diselenggarakan pada:
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Akad Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-[#C4A77D] mr-2" />
          </div>
          <h3 className="text-2xl font-serif text-[#8E7151] mb-2 text-center">
            Akad Nikah
          </h3>
          <div className="space-y-2 mb-6 text-center">
            <p className="text-lg text-[#8E7151] font-medium">
              {formatWeddingDate(events.akad.date)}
            </p>
            <p className="text-[#8E7151]">
              {formatWeddingTime(events.akad.time)} -{" "}
              {formatWeddingTime(
                (Number.parseInt(events.akad.time.split(":")[0]) + 2)
                  .toString()
                  .padStart(2, "0") +
                  ":" +
                  events.akad.time.split(":")[1]
              )}
            </p>
          </div>
          <div className="text-center">
            <Button
              onClick={() => handleAddToCalendar("akad")}
              className="bg-[#C4A77D] hover:bg-[#B39B74] text-white px-6 py-3 rounded-lg text-sm flex items-center gap-2 mx-auto"
            >
              <CalendarPlus className="h-4 w-4" />
              Add to Calendar
            </Button>
          </div>
        </motion.div>

        {/* Resepsi Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-center mb-6">
            <Flower2 className="h-12 w-12 text-[#C4A77D] mr-2" />
          </div>
          <h3 className="text-2xl font-serif text-[#8E7151] mb-2 text-center">
            Resepsi
          </h3>
          <div className="space-y-2 mb-6 text-center">
            <p className="text-lg text-[#8E7151] font-medium">
              {formatWeddingDate(events.resepsi.date)}
            </p>
            <p className="text-[#8E7151]">
              {formatWeddingTime(events.resepsi.time)} -{" "}
              {formatWeddingTime(
                (Number.parseInt(events.resepsi.time.split(":")[0]) + 4)
                  .toString()
                  .padStart(2, "0") +
                  ":" +
                  events.resepsi.time.split(":")[1]
              )}
            </p>
          </div>
          <div className="text-center">
            <Button
              onClick={() => handleAddToCalendar("resepsi")}
              className="bg-[#C4A77D] hover:bg-[#B39B74] text-white px-6 py-3 rounded-lg text-sm flex items-center gap-2 mx-auto"
            >
              <CalendarPlus className="h-4 w-4" />
              Add to Calendar
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 max-w-md mx-auto text-center"
      >
        <p className="text-[#8E7151] italic">
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada
          kami."
        </p>
      </motion.div>
    </section>
  );
}
