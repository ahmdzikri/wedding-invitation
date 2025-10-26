"use client";

type Props = {
  children: React.ReactNode;
};

import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/locomotive-scroll.css";
import React from "react";

function SmoothScroll({ children }: Props) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: ref.current as HTMLElement,
      smooth: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        breakpoint: 768,
        smooth: true,
      },
    });
    const handleWheelOnExcluded = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollArea = target.closest(
        '[data-scroll="false"], [data-scroll-section="false"]'
      );

      if (scrollArea) {
        e.stopPropagation();
        // Let the native scroll behavior handle this
        return;
      }
    };

    document.addEventListener("wheel", handleWheelOnExcluded, {
      capture: true,
    });

    return () => {
      document.removeEventListener("wheel", handleWheelOnExcluded, {
        capture: true,
      });
      locomotiveScroll?.destroy();
    };
  }, []);

  return (
    <main ref={ref}>
      {children}
    </main>
  );
}

export default SmoothScroll;
