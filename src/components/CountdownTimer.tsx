"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetLocal: string;
  timeZone?: string;
}

function convertLocalToUTC(dateString: string, timeZone: string) {
  // Buat date object dari string input
  const inputDate = new Date(dateString);

  // Dapatkan offset timezone dalam menit
  const targetDate = new Date(inputDate.toLocaleString("en-US", { timeZone }));
  const localDate = new Date(inputDate.toLocaleString("en-US"));
  const offsetMs = localDate.getTime() - targetDate.getTime();

  // Kembalikan waktu UTC yang benar dengan menambahkan offset
  return new Date(inputDate.getTime() + offsetMs);
}

export function CountdownTimer({
  targetLocal,
  timeZone = "Asia/Jakarta",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDateUTC = convertLocalToUTC(targetLocal, timeZone);

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      const diff = targetDateUTC.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timerId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetDateUTC]);

  return (
    <div className="relative w-full my-5" data-type="timer">
      <div
        className="mx-auto w-full px-1 transition-[background]"
        data-state="closed"
      >
        <div className="w-full justify-center flex">
          <div className="flex size-full justify-center">
            <div className="my-1 h-full w-max">
              <div className="grid grid-cols-4 justify-center gap-x-2">
                <TimerBox
                  value={timeLeft.days}
                  label="hari"
                />
                <TimerBox
                  value={timeLeft.hours}
                  label="jam"
                />
                <TimerBox
                  value={timeLeft.minutes}
                  label="menit"
                />
                <TimerBox
                  value={timeLeft.seconds}
                  label="detik"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Sub-komponen TimerBox */
function TimerBox({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const formattedValue = String(value).padStart(2, "0");
  const tens = formattedValue[0];
  const ones = formattedValue[1];

  return (
    <div
      className="relative flex aspect-square flex-col rounded-md items-center justify-center overflow-hidden animate-digital-glow w-20 h-20 text-[36px] border-[3px] border-[rgb(234, 223, 204)] text-white bg-[rgba(51,32,34,0.8)]"
    >
      <div className="flex leading-none font-arima animate-digital-clock">
        {/* Tens digit */}
        <div className="relative w-[18px] h-[36px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={tens}
              initial={{ y: 36, scale: 0.8, opacity: 1 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -36, scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.25, 0.1, 0.25, 1],
                scale: { duration: 0.2 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {tens}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Ones digit */}
        <div className="relative w-[18px] h-[36px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={ones}
              initial={{ y: 36, scale: 0.8, opacity: 1 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -36, scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.25, 0.1, 0.25, 1],
                scale: { duration: 0.2 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {ones}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <motion.span 
        className="font-arima text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {label}
      </motion.span>
    </div>
  );
}
