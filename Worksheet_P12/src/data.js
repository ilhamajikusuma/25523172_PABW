// js/data.js: objek profil dan fungsi murni (tanpa DOM, tanpa state)
export const profil = {
  nama: "ILHAM AJI KUSUMA",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["Public Speaking", "Editing", "Menyusun Dokumen"],
};

export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

export function saring(daftar, kategori) {
  return daftar.filter(
    (anime) => kategori === "semua" || anime.kategori.includes(kategori),
  );
}

// Aturan validasi form: nilai masuk, pesan galat keluar ("" berarti sah)
const bulatMinimalSatu = (nilai) =>
  nilai.trim() !== "" && Number.isInteger(Number(nilai)) && Number(nilai) >= 1;

export const aturan = {
  judul: (nilai) =>
    nilai.trim().length >= 2 ? "" : "Isi judul anime minimal 2 huruf.",
  season: (nilai) =>
    bulatMinimalSatu(nilai)
      ? ""
      : "Isi season dengan angka bulat, mulai dari 1.",
  episode: (nilai) =>
    bulatMinimalSatu(nilai)
      ? ""
      : "Isi jumlah episode dengan angka bulat, mulai dari 1.",
};
