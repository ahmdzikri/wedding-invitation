export interface Person {
  fullName: string;
  nickname: string;
  parents: {
    father: string;
    mother: string;
  };
}


export interface Location {
  name: string;
  address: string;
  linkGoogleMaps: string;
  embedGoogleMaps: string;
}

export interface Event {
  date: string;
  time: string;
  timeZone: string;
  location: Location;
}

export interface Couple {
  bride: Person;
  groom: Person;
}

export interface Events {
  akad: Event;
  resepsi: Event;
}

export interface Countdown {
  targetDate: string;
  targetTime: string;
  timeZone: string;
}

export interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

export interface Gallery {
  photos: Photo[];
}

export interface QuranVerse {
  arabic: string;
  translation: string;
  source: string;
}

export interface Greeting {
  title: string;
  subtitle: string;
  placeholder: string;
  submitText: string;
}

export interface Music {
  src: string;
  title: string;
}

export interface Contact {
  whatsapp: {
    bride: string;
    groom: string;
  };
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

export interface WeddingData {
  couple: Couple;
  events: Events;
  countdown: Countdown;
  gallery: Gallery;
  quranVerse: QuranVerse;
  music: Music;
  contact: Contact;
  theme: Theme;
}