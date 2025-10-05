"use client";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import LoadingSpin from "~/components/LoadingSpin";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { useAddGreeting, useGreetings } from "~/lib/hooks/useGreetings";

interface GreetingFormSectionProps {
  className?: string;
}

export default function GreetingFormSection({
  className = "",
}: GreetingFormSectionProps) {
  const [greetingName, setGreetingName] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");

  const { data: greetingsData, isLoading: isLoadingGreetings } = useGreetings();
  const addGreetingMutation = useAddGreeting();

  const greetings = greetingsData?.greetings || [];
  const submitting = addGreetingMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!greetingName.trim() || !greetingMessage.trim()) {
      return;
    }

    try {
      await addGreetingMutation.mutateAsync({
        name: greetingName.trim(),
        message: greetingMessage.trim(),
      });

      // Clear form after successful submission
      setGreetingName("");
      setGreetingMessage("");
    } catch (error) {
      console.error("Failed to submit greeting:", error);
      // You can add toast notification here if needed
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to submit greeting"
        }`
      );
    }
  };
  return (
    <section className={`pt-8 pb-20 px-6 text-center bg-[#F9F3E9] ${className}`}>
      <div className="p-6 rounded-xl shadow-sm bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <p className="text-sm text-[#C4A77D] tracking-widest uppercase mb-4">
            Ucapan & Doa
          </p>
          <h2 className="text-2xl font-serif text-[#8E7151] mb-8">
            Berikan Ucapan & Doa Restu
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#F9F3E9] p-6 rounded-md shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-left text-sm font-medium text-[#8E7151] mb-1"
                >
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
                <label
                  htmlFor="message"
                  className="block text-left text-sm font-medium text-[#8E7151] mb-1"
                >
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
              <Button
                type="submit"
                className="w-full bg-[#C4A77D] hover:bg-[#B39B74] text-white"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center">
                    <LoadingSpin color="white" className="mr-2 h-4 w-4" />
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
            className="bg-[#F9F3E9] p-6 rounded-md shadow-sm"
          >
            <h3 className="text-xl font-serif text-[#8E7151] mb-4">
              Ucapan yang Diterima
            </h3>

            <ScrollArea
              className="h-60"
              data-scroll-section="false"
              data-scroll="false"
            >
              {isLoadingGreetings ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpin />
                  <span className="ml-2 text-[#8E7151]">Memuat ucapan...</span>
                </div>
              ) : greetings.length === 0 ? (
                <p className="text-[#8E7151] italic">
                  Belum ada ucapan. Jadilah yang pertama memberikan ucapan.
                </p>
              ) : (
                <div className="space-y-4 pr-4">
                  {greetings
                    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
                    .map((greeting, index) => (
                      <div
                        key={`${greeting.timestamp}-${index}`}
                        className="border-b border-[#E8D4B9] pb-4 text-left"
                      >
                        <p className="font-medium text-[#8E7151]">
                          {greeting.name}
                        </p>
                        <p className="text-[#8E7151]">{greeting.message}</p>
                        <p className="text-xs text-[#C4A77D] mt-1">
                          {new Date(greeting.timestamp)
                            .toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                            .replace(/,/, ", ")}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </ScrollArea>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="text-center space-y-4">
            {/* Quote dalam Bahasa Minangkabau */}
            <blockquote className="text-[#8E7151] font-be-vietnam-pro text-sm md:text-md leading-relaxed border-l-4 border-[#C4A77D] px-6 bg-[#F9F3E9]/30 py-4 rounded-r-lg">
              "Bak umpamo biduak kabalayia… Lauik lapeh jo ríak nan ka di hadang…
              Taguah-taguah pacik kamudi… Ingek di riak jo galombang… Ingek dek
              karang kamaonggoh… Ingek dek ombak kamaampeh… Pandai-pandai manjago
              diri… Binalah kaluarga sakinah mawaddah warrahmah… Do'a mande
              sapanjang jalan…"
            </blockquote>
            
            {/* Terjemahan dalam Bahasa Indonesia */}
            <div className="text-[#A0896B] text-xs md:text-sm leading-relaxed mt-4 px-6">
              <p className="italic">
                "Seperti perahu yang berlayar… Laut luas dengan ombak yang menghadang…
                Pegang erat kemudi… Ingat pada ombak dan gelombang… Ingat pada karang yang mengancam…
                Ingat pada ombak yang menghempas… Pandai-pandailah menjaga diri…
                Bangunlah keluarga sakinah mawaddah warrahmah… Doa ibu sepanjang jalan…"
              </p>
              <p className="text-xs text-[#C4A77D] mt-2 font-medium">
                — Petuah Minangkabau
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
