"use client";
import Image from "next/image";
import config from "~/config/config";

export default function ClosingSection() {
  const data = config.couple;
  return (
    <footer
      className="container-box mt-8 [clip-path:inset(0_round_50px_50px_0_0)]
  md:[clip-path:inset(0_round_100px_100px_0_0)]
        bg-white text-white rounded-tl-[50px] md:rounded-tl-[100px] rounded-tr-[50px] md:rounded-tr-[100px] h-dvh flex justify-center items-center"
    >
      <div className="fixed bottom-0 h-dvh w-full">
        <div className="relative z-10 p-4">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 relative drop-shadow-lg">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Ornament"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>

          <div className="mb-8 max-w-md mx-auto bg-white/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-8 border-white/50">
            <h2 className="text-2xl font-serif text-[#6B5744] mb-4 drop-shadow">
              Terima Kasih
            </h2>
            <p className="text-[#6B5744] mb-6">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </p>
            <p className="text-xl font-serif text-[#8E7151] mb-8 font-semibold">
              {data.brideName} & {data.groomName}
            </p>

            <div className="mt-8 pt-8 border-t border-[#C4A77D]/50">
              <p className="text-[#6B5744] italic leading-relaxed">
                "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu
                mengingat kebesaran Allah."
              </p>
              <p className="text-[#A68968] text-sm mt-2 font-medium">
                (QS. Adz-Dzariyat: 49)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#8E7151]/20 via-[#C4A77D]/10 to-transparent pointer-events-none" />
      </div>
    </footer>
  );
}
