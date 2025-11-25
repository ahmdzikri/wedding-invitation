"use client";

import { useState, useMemo } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Copy, Check } from "lucide-react";
import config from "~/config/config";

export default function GeneratePage() {
  const [guestName, setGuestName] = useState("");
  const [copied, setCopied] = useState(false);

  const invitationLink = useMemo(() => {
    if (!guestName) return "";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "");
    const params = new URLSearchParams({
      to: guestName,
    });
    return `${baseUrl}?${params.toString()}`;
  }, [guestName]);

  const invitationMessage = useMemo(() => {
    if (!guestName) return "";

    return `Kepada Yth.
*${guestName}*

────────

*Assalamu'alaikum Warahmatullah Wabarakatuh*

Bismillahirahmanirrahim.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.

Untuk informasi detail acara, lokasi, dan waktu lebih lengkap bisa akses link undangan berikut:

${invitationLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu di acara pernikahan kami.

Karena keterbatasan jarak dan waktu tidak dapat mengirimkan undangan ini secara langsung, maka melalui e-invitation ini dapat menjadi pengganti undangan resmi sehingga tujuan kami tersampaikan.

Dengan kerendahan hati, kami memohon doa restu dari Bapak/Ibu/Saudara/Saudari semuanya.

Terima Kasih..

*Wassalamu'alaikum Warahmatullah Wabarakatuh*

Hormat kami,
${config.couple.brideName} & ${config.couple.groomName}`;
  }, [guestName, invitationLink]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(invitationMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-rose-800">
            Generate Undangan
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Buat pesan undangan personal untuk tamu Anda
          </p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="guestName" className="text-base font-semibold">
                Nama Tamu
              </Label>
              <Input
                id="guestName"
                type="text"
                placeholder="Masukkan nama tamu..."
                value={guestName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGuestName(e.target.value)
                }
                className="mt-2 text-base"
              />
            </div>
          </div>
        </div>

        {guestName && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-rose-800">
                Preview Undangan
              </h2>
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin
                  </>
                )}
              </Button>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-lg p-6 border-2 border-rose-200">
              <pre className="whitespace-pre-wrap font-sans text-sm md:text-base text-gray-800 leading-relaxed">
                {invitationMessage}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                Link Undangan:
              </p>
              <a
                href={invitationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all text-sm"
              >
                {invitationLink}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
