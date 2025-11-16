interface MetaConfig {
  title: string;
  description: string;
  ogImage: string;
  favicon: string;
}

interface CoupleConfig {
  groomName: string;
  groomFullname: string;
  groomImage: Photo;
  groomFather: string;
  groomMother: string;
  groomOrderFamily: string;
  brideName: string;
  brideFullname: string;
  brideFather: string;
  brideMother: string;
  brideImage: Photo;
  brideOrderFamily: string;
}

interface QuranVerseConfig {
  arabic: string;
  translation: string;
  source: string;
}

interface CountdownConfig {
  targetDate: string;
  targetTime: string;
  timeZone: string;
}
export interface Location {
  name: string;
  address: string;
  linkGoogleMaps: string;
  embedGoogleMaps: string;
}
interface EventDetails {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  location: Location;
  description: string;
}

interface EventConfig {
  date: string;
  timezone: string;
  eventDetails: {
    akad: EventDetails;
    resepsi: EventDetails;
  };
}

interface AudioConfig {
  src: string;
  loop: boolean;
}

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

interface GalleryConfig {
  photos: Photo[];
}

interface Config {
  meta: MetaConfig;
  couple: CoupleConfig;
  quranVerse: QuranVerseConfig;
  event: EventConfig;
  countdown: CountdownConfig;
  audio: AudioConfig;
  gallery: GalleryConfig;
}

const config: Config = {
  // Meta Information
  meta: {
    title: "Ainil & Reza Wedding",
    description:
      "We are getting married and would love for you to be a part of our celebration.",
    ogImage: "/images/image.png",
    favicon: "/app/favicon.ico",
  },
  // Couple Information
  couple: {
    groomName: "Reza",
    groomImage: {
      id: 1,
      src: "/groom.png",
      alt: "Reza",
      caption: "Reza Budiman",
    },
    groomFullname: "Reza Budiman",
    groomFather: "Zultomi",
    groomMother: "Rini",
    groomOrderFamily: "1",
    brideName: "Ainil",
    brideFullname: "Ainil Khairin Nisa",
    brideFather: "Redison Mhd. Yoes",
    brideMother: "Hayatun Nufus",
    brideImage: {
      id: 2,
      src: "/bride.png",
      alt: "Ainil",
      caption: "Ainil Khairin Nisa",
    },
    brideOrderFamily: "2",
  },

  quranVerse: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    translation:
      "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    source: "QS. Ar-Rum: 21",
  },
  // Event Details
  event: {
    date: "2025-12-21",
    timezone: "WIB",
    eventDetails: {
      akad: {
        title: "Akad Nikah",
        date: "2025-12-21",
        startTime: "08:00",
        endTime: "09:00",
        timeZone: "Asia/Jakarta",
        location: {
          name: "Rumah Gadang Gebu Minang",
          address:
            "Jl. Gayung Kebonsari No.64, Ketintang, Kec. Gayungan, Surabaya, Jawa Timur 60235",
          linkGoogleMaps: "https://maps.app.goo.gl/zv7FyF4AMqi8nZp39",
          embedGoogleMaps:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.6514429853419!2d112.7295045436285!3d-7.330122285815497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb5d91126c39%3A0x32917d51ab54dda3!2sRumah%20Gadang%20Gebu%20Minang!5e0!3m2!1sen!2sid!4v1759647043016!5m2!1sen!2sid",
        },
        description:
          "We invite you to join us in celebrating our wedding ceremony.",
      },
      resepsi: {
        title: "Resepsi",
        date: "2025-12-21",
        startTime: "10:00",
        endTime: "14:00",
        timeZone: "Asia/Jakarta",
        location: {
          name: "Rumah Gadang Gebu Minang",
          address:
            "Jl. Gayung Kebonsari No.64, Ketintang, Kec. Gayungan, Surabaya, Jawa Timur 60235",
          linkGoogleMaps: "https://maps.app.goo.gl/zv7FyF4AMqi8nZp39",
          embedGoogleMaps:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.6514429853419!2d112.7295045436285!3d-7.330122285815497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb5d91126c39%3A0x32917d51ab54dda3!2sRumah%20Gadang%20Gebu%20Minang!5e0!3m2!1sen!2sid!4v1759647043016!5m2!1sen!2sid",
        },
        description:
          "We invite you to join us in celebrating our wedding reception.",
      },
    },
  },

  countdown: {
    targetDate: "2025-12-21",
    targetTime: "08:00",
    timeZone: "Asia/Jakarta",
  },
  audio: {
    src: "/wedding-song.mp3",
    loop: true,
  },
  gallery: {
    photos: [
      {
        id: 1,
        src: "/placeholder.jpg",
        alt: "Foto Pre-Wedding 1",
        caption: "Moment indah kami",
      },
      {
        id: 2,
        src: "/placeholder.jpg",
        alt: "Foto Pre-Wedding 2",
        caption: "Kebahagiaan bersama",
      },
      {
        id: 3,
        src: "/placeholder.jpg",
        alt: "Foto Pre-Wedding 3",
        caption: "Cinta yang tulus",
      },
    ],
  },
};

export default config;
