"use client";
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
  FieldDescription,
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
  const { data: greetingsData, isLoading: isLoadingGreetings } = useGreetings();
  const addGreetingMutation = useAddGreeting();

  const greetings = greetingsData?.greetings || [];

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
      <Card className="shadow-sm bg-muted">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
                                className="bg-accent text-xs md:text-sm min-h-32"
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
                                onValueChange={(value) =>
                                  field.handleChange(value)
                                }
                                defaultValue={field.state.value}
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
            >
              <Card className="w-full gap-0 bg-muted border-8 border-primary shadow-xl">
                <CardHeader>
                  <div className="flex flex-row-reverse items-center gap-1 text-foreground">
                    <span className="text-xs font-medium">
                      {greetings.filter((greeting) => greeting.message).length} Ucapan
                    </span>
                    <MessageCircle className="h-3 w-3" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea
                    className="h-[350px]"
                    data-scroll-section="false"
                    data-scroll="false"
                  >
                    {isLoadingGreetings ? (
                      <div className="flex items-center justify-center py-8">
                        <LoadingSpin />
                        <span className="ml-2 text-[#8E7151]">
                          Memuat ucapan...
                        </span>
                      </div>
                    ) : greetings.length === 0 ? (
                      <p className="text-[#8E7151] italic">
                        Belum ada ucapan. Jadilah yang pertama memberikan
                        ucapan.
                      </p>
                    ) : (
                      <div className="space-y-4 pr-4">
                        {greetings
                          .filter((greeting) => greeting.message)
                          .sort((a, b) =>
                            b.timestamp.localeCompare(a.timestamp)
                          )
                          .map((greeting, index) => (
                            <div
                              key={`${greeting.timestamp}-${index}`}
                              className="border-b border-primary pb-4 text-left"
                            >
                              <p className="font-bold text-foreground">
                                {greeting.name}
                              </p>
                              <p className="text-[#8E7151]">
                                {greeting.message}
                              </p>
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
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="text-center space-y-4">
              {/* Quote dalam Bahasa Minangkabau */}
              <blockquote className="text-[#8E7151] font-be-vietnam-pro text-sm md:text-md leading-relaxed border-l-4 border-[#C4A77D] px-6 bg-[#F9F3E9]/30 py-4 rounded-r-lg">
                "Bak umpamo biduak kabalayia… Lauik lapeh jo ríak nan ka di
                hadang… Taguah-taguah pacik kamudi… Ingek di riak jo galombang…
                Ingek dek karang kamaonggoh… Ingek dek ombak kamaampeh…
                Pandai-pandai manjago diri… Binalah kaluarga sakinah mawaddah
                warrahmah… Do'a mande sapanjang jalan…"
              </blockquote>

              {/* Terjemahan dalam Bahasa Indonesia */}
              <div className="text-[#A0896B] text-xs md:text-sm leading-relaxed mt-4 px-6">
                <p className="italic">
                  "Seperti perahu yang berlayar… Laut luas dengan ombak yang
                  menghadang… Pegang erat kemudi… Ingat pada ombak dan
                  gelombang… Ingat pada karang yang mengancam… Ingat pada ombak
                  yang menghempas… Pandai-pandailah menjaga diri… Bangunlah
                  keluarga sakinah mawaddah warrahmah… Doa ibu sepanjang jalan…"
                </p>
                <p className="text-xs text-[#C4A77D] mt-2 font-medium">
                  — Petuah Minangkabau
                </p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </section>
  );
}
