"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import SmoothScroll from "~/components/SmoothScroll";
import { Button } from "~/components/ui/button";
import {
  formatWeddingDate,
  getCoupleData,
  getEventsData,
} from "~/lib/wedding-functions";
import ClosingSection from "~/modules/ClosingSection";
import CoupleSection from "~/modules/CoupleSection";
import Footer from "~/modules/Footer";
import GreetingFormSection from "~/modules/GreetingFormSection";
import HeaderSection from "~/modules/HeaderSection";
import LocationSection from "~/modules/LocationSection";
import QuranVerseSection from "~/modules/QuranVerseSection";
import SaveTheDateSection from "~/modules/SaveTheDateSection";

// Client component that uses useSearchParams
function HomeContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Terhormat";
  const decodedGuestName = decodeURIComponent(guestName.replace(/\+/g, " "));

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const openingRef = useRef<HTMLElement>(null);

  const couple = getCoupleData();
  const event = getEventsData();
  useEffect(() => {
    // Initialize audio
    if (typeof window !== "undefined") {
      const audio = new Audio();
      audio.src = "/wedding-song.mp3";
      audio.loop = true;
      audio.preload = "auto";

      audio.addEventListener("canplaythrough", () => {
        setAudioLoaded(true);
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e);
        setAudioLoaded(false);
      });

      audioRef.current = audio;

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
        }
      };
    }
  }, []);

  useEffect(() => {
    // Handle page visibility change to pause/resume music
    const handleVisibilityChange = () => {
      if (audioRef.current && audioLoaded) {
        if (document.hidden) {
          // Page is hidden (user switched tabs), pause music
          if (isPlaying) {
            audioRef.current.pause();
          }
        } else {
          // Page is visible again, resume music if it was playing
          if (isPlaying && audioRef.current.paused) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.error("Audio resume failed:", error);
              });
            }
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying, audioLoaded]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
              setIsPlaying(false);
            });
        }
      }
    }
  };
  const smoothScrollTo = (element: HTMLElement, duration = 2000) => {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function untuk smooth animation
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      const progress = t / d;
      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      return b + c * easedProgress;
    };

    requestAnimationFrame(animation);
  };
  useEffect(() => {
    if (showInvitation && openingRef.current) {
      const timer = setTimeout(() => {
        if (openingRef.current) {
          smoothScrollTo(openingRef.current, 2000);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showInvitation]);
  const openInvitation = () => {
    setShowInvitation(true);

    // Start playing music when invitation is shown
    if (audioRef.current && !isPlaying && audioLoaded) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      }
    }
  };

  if (!showInvitation) {
    return (
      <div className="h-dvh w-full bg-background flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/vecteezy_luxury-batik-songket-pattern-frame-border-background_48185867.jpg')] bg-repeat bg-center opacity-4 bg-[length:200px_200px]" />

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#F5F1E8]/20 via-transparent to-[#E8D4B9]/20" />
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#D79863] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#D79863] rounded-full translate-x-1/2 translate-y-1/2 opacity-30" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col justify-center gap-6 items-center text-center px-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex font-hello-paris mt-[-6rem] flex-auto flex-wrap text-center leading-[14rem]"
          >
            <h2 className="text-[200px] text-accents ">A</h2>
            <h2 className="text-[200px] text-accents ">R</h2>
          </motion.div>
          <div className="display-inline-block mx-auto relative">
            <Image
              src="/Untitled-1.png"
              alt="Wedding ornament"
              width={429}
              height={27}
              className="object-cover"
            />
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8"
          >
            <p className="text-accents font-be-vietnam-pro text-sm tracking-widest uppercase mb-4">
              Undangan Pernikahan
            </p>
            <h1 className="text-7xl font-tangerine font-bold text-accents mb-2">
              {couple.bride.nickname} & {couple.groom.nickname}
            </h1>
            <p className="text-accents text-sm tracking-widest">
              {formatWeddingDate(event.akad.date)}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6"
          >
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <span className="text-accents">
                Kepada Bapak/Ibu/Saudara/i{" "}
              </span>
              <span className="font-semibold">{decodedGuestName}</span>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={openInvitation}
                className="bg-secondary-foreground hover:bg-secondary-foreground/70 text-white px-8 py-6 rounded-md text-sm tracking-wider"
              >
                Buka Undangan
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="bg-[#F9F3E9] text-accents w-full overflow-x-hidden">
      {/* Floating mute button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 right-3 z-50 flex gap-2"
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white border border-[#E8D4B9]"
          onClick={toggleAudio}
          title={
            audioLoaded
              ? isPlaying
                ? "Matikan musik"
                : "Putar musik"
              : "Audio tidak tersedia"
          }
        >
          {isPlaying ? (
            <VolumeX className="h-5 w-5 text-accents" />
          ) : (
            <Volume2 className="h-5 w-5 text-accents" />
          )}
        </Button>
      </motion.div>

      {/* Header Section */}
      <HeaderSection />

      {/* Quran Verse Section */}
      <QuranVerseSection ref={openingRef} />
      {/* Couple Section */}
      <CoupleSection />

      {/* Save the Date Section */}
      <SaveTheDateSection />

      {/* Location Section */}
      <LocationSection />

      {/* Gallery Section */}
      {/* <GallerySection /> */}

      {/* Greeting Form Section */}
      <GreetingFormSection />

      {/* Closing Section */}
      <ClosingSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Main page component with Suspense boundary
export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="h-dvh w-full bg-[#F9F3E9] flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SmoothScroll>
        <HomeContent />
      </SmoothScroll>
    </Suspense>
  );
}
