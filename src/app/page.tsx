"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import SmoothScroll from "~/components/SmoothScroll";
import { Button } from "~/components/ui/button";
import BismillahSection from "~/modules/BismillahSection";
import ClosingSection from "~/modules/ClosingSection";
import CoupleSection from "~/modules/CoupleSection";
import Footer from "~/modules/Footer";
import GallerySection from "~/modules/GallerySection";
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

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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

    // Scroll to the first section
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 1000);
  };


  if (!showInvitation) {
    return (
      <div className="h-dvh w-full bg-[#F9F3E9] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=800')] bg-cover bg-center opacity-10" />
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#E8D4B9] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#E8D4B9] rounded-full translate-x-1/2 translate-y-1/2 opacity-30" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <p className="text-[#C4A77D] text-sm tracking-widest uppercase mb-2">
              Undangan Pernikahan
            </p>
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Wedding ornament"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-great-vibes text-[#8E7151] mb-2">
              Nisa & Reza
            </h1>
            <p className="text-[#C4A77D] text-sm tracking-widest">
              15 • 06 • 2025
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8"
          >
            <p className="text-[#8E7151] mb-6">
              Kepada Bapak/Ibu/Saudara/i{" "}
              <span className="font-semibold">{decodedGuestName}</span>
            </p>
            <p className="text-[#8E7151] mb-8">
              Kami mengundang Anda untuk menghadiri acara pernikahan kami
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={openInvitation}
                className="bg-[#C4A77D] hover:bg-[#B39B74] text-white px-8 py-6 rounded-md text-sm tracking-wider"
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
    <div className="bg-[#F9F3E9] text-[#8E7151] w-full overflow-x-hidden">
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
            <VolumeX className="h-5 w-5 text-[#C4A77D]" />
          ) : (
            <Volume2 className="h-5 w-5 text-[#C4A77D]" />
          )}
        </Button>
      </motion.div>

      {/* Header Section */}
      <HeaderSection />

      {/* Bismillah Section */}
      <BismillahSection />

      {/* Couple Section */}
      <CoupleSection />

      {/* Quran Verse Section */}
      <QuranVerseSection />

      {/* Save the Date Section */}
      <SaveTheDateSection />

      {/* Location Section */}
      <LocationSection />

      {/* Gallery Section */}
      <GallerySection />

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
