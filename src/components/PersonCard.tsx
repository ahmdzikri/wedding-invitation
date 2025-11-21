import { motion } from "framer-motion";
import Image from "next/image";

interface PersonCardProps {
  image?: string;
  fullname: string;
  orderFamily: string | number;
  fatherName: string;
  motherName: string;
  gender: "bride" | "groom";
}

export function PersonCard({
  image,
  fullname,
  orderFamily,
  fatherName,
  motherName,
  gender,
}: PersonCardProps) {
  const genderLabel = gender === "bride" ? "Putri" : "Putra";

  return (
    <motion.div
      initial={{ x: gender === "bride" ? -50 : 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center font-be-vietnam-pro text-primary"
    >
      <div className="relative w-[260px]">
        <div
          className="relative mx-auto w-[180px] h-[230px] mt-[20px] mb-14 bg-center bg-cover bg-no-repeat [clip-path:ellipse(45%_48%_at_center)]"
          style={{ backgroundImage: `url('${image ?? '/placeholder.jpg'}')` }}
        />
        <Image
          src="/frame-photo.png"
          alt="Frame"
          width={260}
          height={260}
          className="absolute left-[8px] -top-[2px] w-[218px] pointer-events-none"
        />
      </div>
      <h3 className="text-2xl mb-2">{fullname}</h3>
      <p className="mb-2 text-sm">
        {genderLabel} Ke-{orderFamily} dari
      </p>
      <p>
        Bapak {fatherName} & Ibu {motherName}
      </p>
    </motion.div>
  );
}
