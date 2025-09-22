"use client";
import { Heart } from "lucide-react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`py-4 px-2 text-center bg-white ${className}`}>
      <p className="text-[#C4A77D] text-sm">
        Made with <Heart className="inline-block h-4 w-4 text-[#C4A77D]" /> by
        Ziuci
      </p>
    </footer>
  );
}