"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Smoke = dynamic(
  () => import("~/components/ui/shadcn-io/smoke").then((mod) => mod.Smoke),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

interface LazySmokeProps {
  className?: string;
  opacity?: number;
  density?: number;
  enableRotation?: boolean;
  enableWind?: boolean;
  enableTurbulence?: boolean;
  color?: string;
}

export default function LazySmoke(props: LazySmokeProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return <div className={props.className} />;
  }

  return <Smoke {...props} />;
}
