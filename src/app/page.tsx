"use client";
import type React from "react";

import { Calendar, Heart, MapPin, Send, Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

// Client component that uses useSearchParams
function HomeContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Terhormat";
  const decodedGuestName = decodeURIComponent(guestName.replace(/\+/g, " "));

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [greetingName, setGreetingName] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");
  const [greetings, setGreetings] = useState<
    { name: string; message: string }[]
  >([]);
  const [submitting, setSubmitting] = useState(false);
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

  const submitGreeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (greetingName.trim() && greetingMessage.trim()) {
      setSubmitting(true);

      // Simulate submission delay
      setTimeout(() => {
        setGreetings([
          ...greetings,
          { name: greetingName, message: greetingMessage },
        ]);
        setGreetingName("");
        setGreetingMessage("");
        setSubmitting(false);
      }, 1000);
    }
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
      className="fixed bottom-6 right-6 z-50 flex gap-2"
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white border border-[#E8D4B9]"
        onClick={toggleAudio}
        title={audioLoaded ? (isPlaying ? "Matikan musik" : "Putar musik") : "Audio tidak tersedia"}
      >
        {isPlaying ? <VolumeX className="h-5 w-5 text-[#C4A77D]" /> : <Volume2 className="h-5 w-5 text-[#C4A77D]" />}
      </Button>
    </motion.div>

    {/* Header Section */}
    <section className="h-dvh flex flex-col items-center justify-center text-center px-6 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=800')] bg-cover bg-center opacity-10" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <p className="text-[#C4A77D] text-sm tracking-widest uppercase mb-2">Undangan Pernikahan</p>
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
          <h1 className="text-6xl font-great-vibes text-[#8E7151] mb-2">Nisa & Reza</h1>
          <p className="text-[#C4A77D] text-lg tracking-widest">15 • 05 • 2025</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8"
        >
          <div className="animate-bounce mt-16">
            <svg
              aria-label="Scroll down indicator"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-[#C4A77D]"
            >
              <title>Scroll Down</title>
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
            <p className="text-xs text-[#C4A77D] mt-2 tracking-widest">SCROLL</p>
          </div>
        </motion.div>
      </motion.div>
    </section>

    {/* Bismillah Section */}
    <section className="py-20 px-6 text-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-amiri text-[#8E7151] mb-8">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h2>
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">Bismillahirrahmanirrahim</p>
        <p className="text-[#8E7151] mb-6 max-w-md mx-auto">
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan pernikahan kami:
        </p>
      </motion.div>
    </section>

    {/* Couple Section */}
    <section className="py-20 px-6 text-center bg-[#F9F3E9]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">Mempelai</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-[#E8D4B9]">
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Pengantin Wanita"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif text-[#8E7151] mb-2">Rina Sari, S.Kom</h3>
            <p className="text-[#C4A77D] mb-4 text-sm">Putri dari</p>
            <p className="text-[#8E7151]">Bapak Hendra & Ibu Sinta</p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-[#E8D4B9]">
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Pengantin Pria"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif text-[#8E7151] mb-2">Dimas Prayoga, S.T</h3>
            <p className="text-[#C4A77D] mb-4 text-sm">Putra dari</p>
            <p className="text-[#8E7151]">Bapak Budi & Ibu Wati</p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Quran Verse Section */}
    <section className="py-20 px-6 text-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Ornament"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </div>

        <div className="bg-[#F9F3E9] p-8 rounded-md">
          <p className="text-xl font-amiri text-[#8E7151] mb-6 leading-loose">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
          </p>

          <p className="text-[#8E7151] mb-4 italic">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri,
            supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.
            Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir."
          </p>

          <p className="text-[#C4A77D] text-sm">(QS. Ar-Rum: 21)</p>
        </div>
      </motion.div>
    </section>

    {/* Save the Date Section */}
    <section className="py-20 px-6 text-center bg-[#F9F3E9]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">Save the Date</p>
        <h2 className="text-2xl font-serif text-[#8E7151] mb-8">Insya Allah akan diselenggarakan pada:</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white p-6 rounded-md shadow-sm"
        >
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-[#C4A77D] mr-2" />
          </div>
          <h3 className="text-xl font-serif text-[#8E7151] mb-2">Akad Nikah</h3>
          <div className="space-y-1 mb-4">
            <p className="text-[#8E7151]">Sabtu, 15 Juni 2025</p>
            <p className="text-[#8E7151]">08:00 - 10:00 WIB</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#8E7151]">Masjid Al-Hidayah</p>
            <p className="text-[#8E7151]">Jl. Pernikahan No. 123</p>
            <p className="text-[#8E7151]">Jakarta Selatan</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white p-6 rounded-md shadow-sm"
        >
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-[#C4A77D] mr-2" />
          </div>
          <h3 className="text-xl font-serif text-[#8E7151] mb-2">Resepsi</h3>
          <div className="space-y-1 mb-4">
            <p className="text-[#8E7151]">Sabtu, 15 Juni 2025</p>
            <p className="text-[#8E7151]">11:00 - 15:00 WIB</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#8E7151]">Ballroom Grand Hotel</p>
            <p className="text-[#8E7151]">Jl. Pernikahan No. 123</p>
            <p className="text-[#8E7151]">Jakarta Selatan</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 max-w-md mx-auto text-center"
      >
        <p className="text-[#8E7151] italic">
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk
          memberikan doa restu kepada kami."
        </p>
      </motion.div>
    </section>

    {/* Location Section */}
    <section className="py-20 px-6 text-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">Lokasi Acara</p>
        <h2 className="text-2xl font-serif text-[#8E7151] mb-8">Peta Lokasi</h2>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto w-full aspect-video rounded-md overflow-hidden shadow-md border-4 border-[#F9F3E9]"
      >
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <MapPin className="h-12 w-12 text-[#C4A77D] mr-2" />
          <span className="text-[#8E7151]">Peta Lokasi</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-8 max-w-md mx-auto"
      >
        <h3 className="text-xl font-serif text-[#8E7151] mb-2">Ballroom Grand Hotel</h3>
        <p className="text-[#8E7151]">Jl. Pernikahan No. 123, Jakarta Selatan</p>
        <div className="mt-6">
          <Button
            className="bg-[#C4A77D] hover:bg-[#B39B74] text-white px-6 py-2 rounded-md text-sm tracking-wider"
            onClick={() => window.open("https://maps.google.com", "_blank")}
          >
            Buka Google Maps
          </Button>
        </div>
      </motion.div>
    </section>

    {/* Gallery Section */}
    <section className="py-20 px-6 text-center bg-[#F9F3E9]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">Galeri Foto</p>
        <h2 className="text-2xl font-serif text-[#8E7151] mb-8">Momen Bahagia Kami</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="aspect-square overflow-hidden rounded-md shadow-sm"
          >
            <Image
              src={`/placeholder.svg?height=300&width=300&text=Photo ${i}`}
              alt={`Foto pasangan ${i}`}
              width={300}
              height={300}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>
    </section>

    {/* Greeting Form Section */}
    <section className="py-20 px-6 text-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">Ucapan & Doa</p>
        <h2 className="text-2xl font-serif text-[#8E7151] mb-8">Berikan Ucapan & Doa Restu</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#F9F3E9] p-6 rounded-md shadow-sm"
        >
          <form onSubmit={submitGreeting} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-left text-sm font-medium text-[#8E7151] mb-1">
                Nama
              </label>
              <Input
                id="name"
                value={greetingName}
                onChange={(e) => setGreetingName(e.target.value)}
                className="border-[#E8D4B9] focus-visible:ring-[#C4A77D] bg-white"
                placeholder="Nama Anda"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-left text-sm font-medium text-[#8E7151] mb-1">
                Ucapan & Doa
              </label>
              <Textarea
                id="message"
                value={greetingMessage}
                onChange={(e) => setGreetingMessage(e.target.value)}
                className="border-[#E8D4B9] focus-visible:ring-[#C4A77D] min-h-32 bg-white"
                placeholder="Tulis ucapan dan doa Anda untuk kedua mempelai"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#C4A77D] hover:bg-[#B39B74] text-white" disabled={submitting}>
              {submitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <title>Loading...</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Mengirim...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="mr-2 h-4 w-4" /> Kirim Ucapan
                </span>
              )}
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#F9F3E9] p-6 rounded-md shadow-sm max-h-96 overflow-y-auto"
        >
          <h3 className="text-xl font-serif text-[#8E7151] mb-4">Ucapan yang Diterima</h3>

          {greetings.length === 0 ? (
            <p className="text-[#8E7151] italic">Belum ada ucapan. Jadilah yang pertama memberikan ucapan.</p>
          ) : (
            <div className="space-y-4">
              {greetings.map((greeting, index) => (
                <div key={index} className="border-b border-[#E8D4B9] pb-4 text-left">
                  <p className="font-medium text-[#8E7151]">{greeting.name}</p>
                  <p className="text-[#8E7151]">{greeting.message}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>

    {/* Closing Section */}
    <section className="py-20 px-6 text-center bg-[#F9F3E9]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-6"
      >
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Ornament"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-8 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-serif text-[#8E7151] mb-4">Terima Kasih</h2>
        <p className="text-[#8E7151] mb-6">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan
          memberikan doa restu.
        </p>
        <p className="text-xl font-serif text-[#8E7151] mb-8">Rina & Dimas</p>

        <div className="mt-8 pt-8 border-t border-[#E8D4B9]">
          <p className="text-[#8E7151] italic">
            "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu mengingat kebesaran Allah."
          </p>
          <p className="text-[#C4A77D] text-sm mt-2">(QS. Adz-Dzariyat: 49)</p>
        </div>
      </motion.div>
    </section>

    {/* Footer */}
    <footer className="py-8 px-6 text-center bg-white">
      <p className="text-[#C4A77D] text-sm">
        Made with <Heart className="inline-block h-4 w-4 text-[#C4A77D]" /> by Ziuci
      </p>
    </footer>
  </div>
  );
}

// Main page component with Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={<div className="h-dvh w-full bg-[#F9F3E9] flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
