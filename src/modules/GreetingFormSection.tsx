"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { MessageCircle, Send } from "lucide-react";
import { motion } from "motion/react";
import { z } from "zod/mini";
import LoadingSpin from "~/components/LoadingSpin";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { useAddGreeting, useGreetings } from "~/lib/hooks/useGreetings";

const greetingSchema = z.object({
  name: z.string().check(z.minLength(1, { error: "Nama wajib diisi" })),
  message: z.string(),
  attendance: z
    .string()
    .check(z.minLength(1, { error: "Konfirmasi kehadiran wajib dipilih" })),
});

interface GreetingFormSectionProps {
  className?: string;
}

export default function GreetingFormSection({
  className = "",
}: GreetingFormSectionProps) {
  const {
    data: greetingsData,
    isLoading: isLoadingGreetings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGreetings();
  const addGreetingMutation = useAddGreeting();

  // Flatten all pages into a single array
  const greetings = greetingsData?.pages.flatMap((page) => page.greetings) || [];
  const totalCount = greetingsData?.pages[0]?.pagination.totalCount || 0;

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    // Find the viewport element inside ScrollArea
    const viewport = scrollArea.querySelector(
      '[data-slot="scroll-area-viewport"]'
    ) as HTMLElement;
    if (!viewport) return;

    const handleScroll = () => {
      const isAtTop = viewport.scrollTop === 0;
      const isAtBottom =
        viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 1;

      setScrollState({ isAtTop, isAtBottom });

      // Load more when scrolled near bottom
      if (isAtBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    // Initial check
    handleScroll();

    viewport.addEventListener("scroll", handleScroll);
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [greetings.length, hasNextPage, isFetchingNextPage, fetchNextPage]); // Re-run when greetings change

  const form = useForm({
    defaultValues: {
      name: "",
      message: "",
      attendance: "",
    },
    validators: {
      onSubmit: greetingSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await addGreetingMutation.mutateAsync({
          name: value.name.trim(),
          message: value.message.trim(),
          attendance: value.attendance,
        });

        form.reset();
      } catch (error) {
        console.error("Failed to submit greeting:", error);
        alert(
          `Error: ${
            error instanceof Error ? error.message : "Failed to submit greeting"
          }`
        );
      }
    },
  });
  return (
    <section className={`relative pt-8 pb-20 px-6 bg-primary ${className}`}>
      <div className="absolute inset-0 bg-pattern-batik bg-auto bg-repeat pointer-events-none opacity-50" />
      <Card className="relative shadow-sm bg-muted">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-primary text-center font-bold tracking-widest uppercase">
              Ucapan & Doa
            </CardTitle>
            <CardDescription className="text-xs md:text-sm text-foreground text-center">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
              Bapak/ Ibu/ Saudara/ i berkenan hadir, untuk memberikan do'a restu
              kepada kami.
            </CardDescription>
          </CardHeader>
        </motion.div>
        <CardContent>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-primary w-full">
                <CardContent>
                  <form
                    id="greeting-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.handleSubmit();
                    }}
                  >
                    <FieldGroup className="gap-6">
                      <form.Field name="name">
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>Nama</FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                placeholder="Nama Anda"
                                autoComplete="off"
                                className="bg-accent text-xs md:text-sm"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      </form.Field>
                      <form.Field name="message">
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Ucapan & Doa
                              </FieldLabel>
                              <Textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                placeholder="Tulis ucapan dan doa Anda untuk kedua mempelai"
                                autoComplete="off"
                                className="bg-accent text-xs md:text-sm field-sizing-content h-32 resize-none"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      </form.Field>
                      <form.Field name="attendance">
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Konfirmasi Kehadiran
                              </FieldLabel>
                              <Select
                                value={field.state.value}
                                onValueChange={(value) =>
                                  field.handleChange(value)
                                }
                              >
                                <SelectTrigger
                                  id={field.name}
                                  name={field.name}
                                  onBlur={field.handleBlur}
                                  aria-invalid={isInvalid}
                                  className="bg-accent text-xs md:text-sm"
                                >
                                  <SelectValue placeholder="Konfirmasi Kehadiran" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="yes">
                                    Ya, saya hadir
                                  </SelectItem>
                                  <SelectItem value="no">
                                    Belum bisa hadir
                                  </SelectItem>
                                  <SelectItem value="uncertain">
                                    Masih ragu-ragu
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      </form.Field>
                    </FieldGroup>
                  </form>
                </CardContent>
                <CardFooter>
                  <Field>
                    <Button
                      type="submit"
                      variant="secondary"
                      form="greeting-form"
                      disabled={addGreetingMutation.isPending}
                    >
                      {addGreetingMutation.isPending ? (
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
                  </Field>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="w-full gap-0 bg-muted border-8 border-primary shadow-xl">
                <CardHeader>
                  <div className="flex flex-row-reverse items-center gap-1 text-foreground">
                    <span className="text-xs font-medium">
                      {totalCount} Ucapan
                    </span>
                    <MessageCircle className="h-3 w-3" />
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingGreetings ? (
                    <div className="flex items-center justify-center py-8 h-[358px]">
                      <LoadingSpin />
                      <span className="ml-2 text-primary">
                        Memuat ucapan...
                      </span>
                    </div>
                  ) : greetings.length === 0 ? (
                    <div className="flex items-center justify-center h-[358px]">
                      <p className="text-primary italic text-center">
                        Belum ada ucapan. Jadilah yang pertama memberikan
                        ucapan.
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <ScrollArea
                        ref={scrollAreaRef}
                        className="h-[358px]"
                        data-scroll-section="false"
                        data-scroll="false"
                      >
                        <div className="space-y-4 pr-4">
                          {greetings.map((greeting, index) => (
                            <div key={`${greeting.timestamp}-${index}`}>
                              <Card className="p-3 shadow-lg gap-2 rounded-[16px_16px_16px_0]">
                                <CardHeader className="px-0 gap-0">
                                  <CardTitle className="font-bold text-primary">
                                    {greeting.name}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="px-0 text-sm text-foreground break-words">
                                  {greeting.message}
                                </CardContent>
                                <CardFooter className="px-0 text-[10px] text-foreground flex-row-reverse">
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
                                </CardFooter>
                              </Card>
                            </div>
                          ))}
                          {isFetchingNextPage && (
                            <div className="flex items-center justify-center py-4">
                              <LoadingSpin className="text-primary"/>
                              <span className="ml-2 text-primary text-xs">
                                Memuat lebih banyak...
                              </span>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                      {/* Fade effect overlays - only show when not at top/bottom */}
                      {!scrollState.isAtTop && (
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-muted to-transparent pointer-events-none transition-opacity duration-200" />
                      )}
                      {!scrollState.isAtBottom && (
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-muted to-transparent pointer-events-none transition-opacity duration-200" />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="my-12 max-w-4xl mx-auto"
          >
            <div className="text-center space-y-4">
              {/* Quote dalam Bahasa Minangkabau */}
              <blockquote className="text-foreground font-be-vietnam-pro text-xs md:text-sm leading-relaxed border-l-4 border-foreground px-4 bg-primary-foreground/50 py-2 rounded-r-lg">
                "Bak umpamo biduak kabalayia… Lauik lapeh jo ríak nan ka di
                hadang… Taguah-taguah pacik kamudi… Ingek di riak jo galombang…
                Ingek dek karang kamaonggoh… Ingek dek ombak kamaampeh…
                Pandai-pandai manjago diri… Binalah kaluarga sakinah mawaddah
                warrahmah… Do'a mande sapanjang jalan…"{" "}
                <span className="whitespace-nowrap">
                  — <b>Petuah Minangkabau</b>
                </span>
              </blockquote>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </section>
  );
}
