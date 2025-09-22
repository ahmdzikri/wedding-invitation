import type { WeddingData } from "~/types/wedding";

export const weddingDataConfig: WeddingData = {
  couple: {
    bride: {
      fullName: "Siti Aisyah Rahmawati",
      nickname: "Aisyah",
      parents: {
        father: "H. Ahmad Rahmawan",
        mother: "Hj. Siti Khadijah"
      }
    },
    groom: {
      fullName: "Muhammad Rizki Pratama",
      nickname: "Rizki", 
      parents: {
        father: "H. Bambang Pratama",
        mother: "Hj. Nur Hayati"
      }
    }
  },
  events: {
    akad: {
      date: "2025-12-21",
      time: "08:00",
      timeZone: "Asia/Jakarta",
      location: {
        name: "Masjid Al-Ikhlas",
        address: "Jl. Raya Bogor No. 123, Cibinong, Bogor, Jawa Barat 16911",
        linkGoogleMaps: "https://www.google.com/maps?q=Jl.+Raya+Bogor+No.+123,+Cibinong,+Bogor,+Jawa+Barat+16911",
        embedGoogleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.195208208822!2d106.8540!3d-6.4817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4f2b52b2b2b%3A0x2e69f4f2b52b2b2b!2sMasjid%20Al-Ikhlas!5e0!3m2!1sen!2sid!4v1691169116911!5m2!1sen!2sid"
      }
    },
    resepsi: {
      date: "2025-12-21", 
      time: "11:00",
      timeZone: "Asia/Jakarta",
      location: {
        name: "Gedung Serbaguna Al-Hikmah",
        address: "Jl. Masjid Al-Hikmah No. 45, Cibinong, Bogor, Jawa Barat 16911",
        linkGoogleMaps: "https://www.google.com/maps?q=Jl.+Raya+Bogor+No.+123,+Cibinong,+Bogor,+Jawa+Barat+16911",
        embedGoogleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.195208208822!2d106.8540!3d-6.4817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4f2b52b2b2b%3A0x2e69f4f2b52b2b2b!2sMasjid%20Al-Ikhlas!5e0!3m2!1sen!2sid!4v1691169116911!5m2!1sen!2sid"
      }
    }
  },
  countdown: {
    targetDate: "2025-12-21",
    targetTime: "08:00",
    timeZone: "Asia/Jakarta"
  },
  gallery: {
    photos: [
      {
        id: 1,
        src: "/placeholder.jpg",
        alt: "Foto Pre-Wedding 1",
        caption: "Moment indah kami"
      },
      {
        id: 2,
        src: "/placeholder.jpg", 
        alt: "Foto Pre-Wedding 2",
        caption: "Kebahagiaan bersama"
      },
      {
        id: 3,
        src: "/placeholder.jpg",
        alt: "Foto Pre-Wedding 3", 
        caption: "Cinta yang tulus"
      }
    ]
  },
  quranVerse: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    source: "QS. Ar-Rum: 21"
  },
  music: {
    src: "/wedding-song.mp3",
    title: "Lagu Pernikahan"
  },
  contact: {
    whatsapp: {
      bride: "+6281234567890",
      groom: "+6281234567891"
    }
  },
  theme: {
    primaryColor: "#C4A77D",
    secondaryColor: "#8B7355",
    backgroundColor: "#1A1A1A"
  }
};
