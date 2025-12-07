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
    <div className="flex flex-col items-center font-be-vietnam-pro text-primary">
      <div className="relative w-[260px]">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative mx-auto w-[180px] h-[230px] mt-[20px] mb-14 overflow-hidden [clip-path:ellipse(45%_48%_at_center)]"
        >
          <Image
            src={image ?? "/placeholder.jpg"}
            alt={fullname}
            fill
            sizes="180px"
            className="object-cover object-center"
            loading="lazy"
          />
        </motion.div>
        <Image
          src="/frame-photo.png"
          alt=""
          width={218}
          height={218}
          className="absolute left-[8px] -top-[2px] w-[218px] pointer-events-none"
          loading="lazy"
        />
      </div>
      <motion.div
        initial={{ x: gender === "bride" ? -50 : 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl mb-2">{fullname}</h3>
        <p className="mb-2 text-sm">
          {genderLabel} Ke-{orderFamily} dari
        </p>
        <p>
          Bapak {fatherName} & Ibu {motherName}
        </p>
      </motion.div>
    </div>
  );
}
