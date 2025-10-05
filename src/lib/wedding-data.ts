import type { WeddingData } from "~/types/wedding";

export const weddingDataConfig: WeddingData = {
  couple: {
    bride: {
      fullName: "Ainil Khairin Nisa",
      nickname: "Ainil",
      parents: {
        father: "Redison Mhd. Yoes",
        mother: "Hayatun Nufus"
      }
    },
    groom: {
      fullName: "Reza Budiman",
      nickname: "Reza", 
      parents: {
        father: "Zultomi",
        mother: "Rini"
      }
    }
  },
  events: {
    akad: {
      date: "2025-12-21",
      time: "08:00",
      timeZone: "Asia/Jakarta",
      location: {
        name: "Rumah Gadang Gebu Minang",
        address: "Jl. Gayung Kebonsari No.64, Ketintang, Kec. Gayungan, Surabaya, Jawa Timur 60235",
        linkGoogleMaps: "https://www.google.com/maps?q=Jl.+Gayung+Kebonsari+No.64,+Ketintang,+Kec.+Gayungan,+Surabaya,+Jawa+Timur+60235",
        embedGoogleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.6514429853419!2d112.7295045436285!3d-7.330122285815497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb5d91126c39%3A0x32917d51ab54dda3!2sRumah%20Gadang%20Gebu%20Minang!5e0!3m2!1sen!2sid!4v1759647043016!5m2!1sen!2sid"
      }
    },
    resepsi: {
      date: "2025-12-21", 
      time: "11:00",
      timeZone: "Asia/Jakarta",
      location: {
        name: "Rumah Gadang Gebu Minang",
        address: "Jl. Gayung Kebonsari No.64, Ketintang, Kec. Gayungan, Surabaya, Jawa Timur 60235",
        linkGoogleMaps: "https://www.google.com/maps?q=Jl.+Gayung+Kebonsari+No.64,+Ketintang,+Kec.+Gayungan,+Surabaya,+Jawa+Timur+60235",
        embedGoogleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.6514429853419!2d112.7295045436285!3d-7.330122285815497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb5d91126c39%3A0x32917d51ab54dda3!2sRumah%20Gadang%20Gebu%20Minang!5e0!3m2!1sen!2sid!4v1759647043016!5m2!1sen!2sid"
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
