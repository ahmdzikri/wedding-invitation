# 🎉 Sistem Data Pernikahan Dinamis

Sistem ini memungkinkan Anda untuk mengubah semua informasi pernikahan hanya dengan mengedit file TypeScript, tanpa perlu mengubah kode komponen.

## 📁 Struktur File

```
src/
├── types/
│   └── wedding.ts                 # TypeScript interfaces
├── lib/
│   └── wedding-data.ts            # File konfigurasi utama + Utility functions
└── modules/
    └── [komponen-komponen].tsx    # Komponen yang menggunakan data dinamis
```

## 🔧 Cara Menggunakan

### 1. Edit Data Pernikahan

Buka file `src/lib/wedding-data.ts` dan ubah informasi pada bagian `weddingDataConfig`:

```typescript
const weddingDataConfig: WeddingData = {
  couple: {
    bride: {
      fullName: "Nama Lengkap Mempelai Wanita",
      nickname: "Nama Panggilan",
      parents: {
        father: "Nama Ayah",
        mother: "Nama Ibu"
      }
    },
    groom: {
      fullName: "Nama Lengkap Mempelai Pria", 
      nickname: "Nama Panggilan",
      parents: {
        father: "Nama Ayah",
        mother: "Nama Ibu"
      }
    }
  }
}
```

### 2. Konfigurasi Acara

```typescript
events: {
  akad: {
    date: "2025-12-21",
    time: "08:00",
    timeZone: "Asia/Jakarta",
    location: {
      name: "Nama Tempat Akad",
      address: "Alamat Lengkap",
      linkGoogleMaps: "https://www.google.com/maps?q=...",
      embedGoogleMaps: "https://www.google.com/maps/embed?pb=..."
    }
  },
  resepsi: {
    date: "2025-12-21", 
    time: "11:00",
    timeZone: "Asia/Jakarta",
    location: {
      name: "Nama Tempat Resepsi",
      address: "Alamat Lengkap",
      linkGoogleMaps: "https://www.google.com/maps?q=...",
      embedGoogleMaps: "https://www.google.com/maps/embed?pb=..."
    }
  }
}
```

### 3. Pengaturan Countdown

```typescript
countdown: {
  targetDate: "2025-12-21",
  targetTime: "08:00", 
  timeZone: "Asia/Jakarta"
}
```

## 🎨 Kustomisasi Tema

```typescript
theme: {
  primaryColor: "#C4A77D",
  secondaryColor: "#8B7355",
  backgroundColor: "#1A1A1A"
}
```

## 📸 Galeri Foto

```typescript
gallery: {
  photos: [
    {
      id: 1,
      src: "/path/to/photo.jpg",
      alt: "Deskripsi foto",
      caption: "Caption foto"
    }
  ]
}
```

## 📱 Kontak

```typescript
contact: {
  whatsapp: {
    bride: "+6281234567890",
    groom: "+6281234567891"
  }
}
```

## 🎵 Musik

```typescript
music: {
  src: "/wedding-song.mp3",
  title: "Judul Lagu"
}
```

## 📖 Ayat Al-Quran

```typescript
quranVerse: {
  arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا...",
  translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu...",
  source: "QS. Ar-Rum: 21"
}
```

## 📝 Form Ucapan

```typescript
greeting: {
  title: "Ucapan & Doa",
  subtitle: "Berikan ucapan terbaik untuk kedua mempelai",
  placeholder: "Tulis ucapan dan doa terbaik Anda...",
  submitText: "Kirim Ucapan"
}
```

## 🎯 Fitur Utama

- ✅ **Plug & Play**: Ubah data, langsung jalan
- ✅ **Type Safe**: Menggunakan TypeScript untuk keamanan tipe
- ✅ **Hot Reload**: Perubahan langsung terlihat tanpa restart
- ✅ **No HMR Issues**: Mengatasi masalah Turbopack HMR
- ✅ **Responsive**: Otomatis menyesuaikan dengan perangkat
- ✅ **Format Otomatis**: Tanggal dan waktu diformat otomatis
- ✅ **Kalender Integration**: Tombol "Add to Calendar" otomatis
- ✅ **Multi-language**: Mendukung format Indonesia

## 🚀 Cara Deploy Ulang

1. Edit `src/lib/wedding-data.ts` pada bagian `weddingDataConfig`
2. Simpan file
3. Aplikasi akan otomatis reload (development mode)
4. Untuk production: `npm run build` dan deploy ulang

## 🛠️ Utility Functions

File `src/lib/wedding-data.ts` menyediakan berbagai fungsi helper:

- `getWeddingData()` - Ambil semua data
- `getCoupleData()` - Data mempelai
- `getEventsData()` - Data acara
- `getCountdownData()` - Data countdown
- `getGalleryData()` - Data galeri foto
- `getQuranVerseData()` - Data ayat Al-Quran
- `getGreetingData()` - Data form ucapan
- `getMusicData()` - Data musik
- `getContactData()` - Data kontak
- `getThemeData()` - Data tema
- `formatWeddingDate()` - Format tanggal Indonesia
- `formatWeddingTime()` - Format waktu WIB
- `formatHeaderDate()` - Format tanggal untuk header (DD • MM • YYYY)
- `getEventDateTime()` - Format datetime untuk countdown

## 🔧 Keuntungan Menggunakan TypeScript

1. **Type Safety**: Error akan terdeteksi saat development
2. **IntelliSense**: Auto-complete saat mengedit data
3. **No Runtime Errors**: Validasi tipe saat compile time
4. **Better Performance**: Tidak ada file I/O untuk membaca JSON
5. **Hot Module Replacement**: Tidak ada masalah HMR dengan Turbopack

## 💡 Tips

1. **Backup**: Selalu backup `wedding-data.ts` sebelum edit besar
2. **Type Checking**: Gunakan TypeScript extension di VS Code untuk validasi
3. **Testing**: Test di berbagai perangkat setelah perubahan
4. **Koordinat**: Gunakan Google Maps untuk mendapatkan koordinat yang akurat
5. **Format**: Pastikan format tanggal menggunakan YYYY-MM-DD
6. **Waktu**: Gunakan format 24 jam (HH:MM) untuk waktu

## 🐛 Troubleshooting

### Error: Property does not exist
- Pastikan semua property sesuai dengan interface `WeddingData`
- Cek file `src/types/wedding.ts` untuk referensi interface

### Hot Reload Tidak Berfungsi
- Restart development server: `npm run dev`
- Clear cache: hapus folder `.next`

### Tanggal Tidak Muncul
- Pastikan format tanggal: `YYYY-MM-DD`
- Cek timezone: `Asia/Jakarta`

---

**Selamat menikah! 💒✨**