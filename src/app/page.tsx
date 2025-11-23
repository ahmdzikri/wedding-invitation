"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import SmoothScroll from "~/components/SmoothScroll";
import { Button } from "~/components/ui/button";
import config from "~/config/config";
import ClosingSection from "~/modules/ClosingSection";
import CountdownSection from "~/modules/CountdownSection";
import CoupleSection from "~/modules/CoupleSection";
import EventsSection from "~/modules/EventsSection";
import Footer from "~/modules/Footer";
import GreetingFormSection from "~/modules/GreetingFormSection";
import HeaderSection from "~/modules/HeaderSection";
import IntroSection from "~/modules/IntroSection";
import LocationSection from "~/modules/LocationSection";

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

  useEffect(() => {
    // Initialize audio
    if (typeof window !== "undefined") {
      const audio = new Audio();
      audio.src = config.audio.src;
      audio.loop = config.audio.loop;
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
      <IntroSection
        decodedGuestName={decodedGuestName}
        onOpenInvitation={openInvitation}
        useGuestName={true}
      />
    );
  }
  return (
    <div className="min-h-screen bg-background text-accents w-full overflow-x-hidden">
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
          className="rounded-full shadow-xl  bg-white backdrop-blur-sm hover:bg-white/80 border border-accents"
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
            <Volume2 color="var(--primary)" />
          ) : (
            <VolumeX color="var(--primary)" />
          )}
        </Button>
      </motion.div>

      {/* Header Section */}
      <HeaderSection />

      <CountdownSection ref={openingRef} />
      {/* Couple Section */}
      <CoupleSection />

      {/* Save the Date Section */}
      <EventsSection />

      {/* Greeting Form Section */}
      <GreetingFormSection />

      {/* Closing Section */}
      <ClosingSection />

    </div>
  );
}

// Main page component with Suspense boundary
export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="h-dvh w-full bg-muted flex items-center justify-center">
          <div className="relative flex items-center justify-center font-hello-paris mt-[-10rem] text-center">
            <h2 className="relative z-10 text-8xl text-foreground -translate-y-4">
              {config.couple.brideName.charAt(0).toUpperCase()}
            </h2>
            <h2 className="relative z-10 text-8xl text-foreground">
              {config.couple.groomName.charAt(0).toUpperCase()}
            </h2>
          </div>
        </div>
      }
    >
      <SmoothScroll>
        <HomeContent />
      </SmoothScroll>
    </Suspense>
  );
}
