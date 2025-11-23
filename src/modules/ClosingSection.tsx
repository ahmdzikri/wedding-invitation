"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import config from "~/config/config";

export default function ClosingSection() {
  const data = config.couple;
  return (
    <footer
      className="container-box [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]
        bg-primary h-dvh"
    >
      <div className="fixed bottom-0 h-dvh w-full flex flex-col items-center justify-center">
        <div className="relative z-10 p-4">
          {/* <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 relative drop-shadow-lg">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Ornament"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div> */}

          <div className="mb-8 max-w-md mx-auto bg-white/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-8 border-white/50">
            <h2 className="text-2xl font-serif text-muted mb-4 drop-shadow">
              Terima Kasih
            </h2>
            <p className="text-muted mb-6">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </p>
            <p className="text-xl font-serif text-muted mb-8 font-semibold">
              {data.brideName} & {data.groomName}
            </p>

            <div className="mt-8 pt-8 border-t border-muted/50">
              <p className="text-muted italic leading-relaxed">
                "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu
                mengingat kebesaran Allah."
              </p>
              <p className="text-muted text-sm mt-2 font-medium">
                (QS. Adz-Dzariyat: 49)
              </p>
            </div>
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 py-4 px-2 text-center bg-muted">
          <p className="text-foreground text-sm">
            Made with <Heart className="inline-block h-4 w-4 text-foreground" />{" "}
            by{" "}
            <a
              href="https://github.com/ahmdzikri"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              Ziuci
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
