"use client";
import { Heart } from "lucide-react";
import Smoke from "~/components/ui/shadcn-io/smoke";
import config from "~/config/config";

export default function ClosingSection() {
  const data = config.couple;
  return (
    <footer
      className="container-box [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]
        bg-primary h-screen"
    >
      
      <div className="fixed top-0 h-[calc(100vh_-_52px)] w-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Smoke
            opacity={0.3}
            density={30}
            enableRotation={false}
            enableWind={false}
            enableTurbulence={false}
            color="#f8ebdd"
          />
        </div>
        <div className="relative flex justify-center items-center w-full max-w-[27rem] 2xl:max-w-[32rem] h-full aspect-[600/1011] bg-frame-flower-with-rg bg-no-repeat bg-center bg-contain p-4">
          <div className="flex flex-col gap-4 items-center justify-center max-w-xs text-center px-6 -mt-44">
            <h2 className="text-sm 2xl:text-lg text-foreground uppercase">
              Terima Kasih
            </h2>
            <span className="text-xs 2xl:text-base text-foreground">
              Tiada yang dapat kami ungkapkan selain rasa syukur, dan tiada yang
              kami harapkan selain kehadiran dan doa restu.
            </span>
            <p className="text-3xl font-hello-paris text-foreground font-bold">
              {data.brideName} & {data.groomName}
            </p>
            <div className="mt-6">
              <p className="text-xs 2xl:text-sm text-foreground leading-relaxed">
                "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu
                mengingat kebesaran Allah."
              </p>
              <p className="text-xs 2xl:text-sm text-foreground mt-2 font-medium">
                (QS. Adz-Dzariyat: 49)
              </p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 py-4 px-2 text-center bg-muted z-50">
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
