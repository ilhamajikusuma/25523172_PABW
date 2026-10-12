const profil = {
  nama: "ILHAM AJI KUSUMA",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["Public Speaking", "Editing", "Menyusun Dokumen"],
};

const jumlahProyek = 2;

const kalimat = `Nama saya ${profil.nama}, dan saya punya ${profil.keahlian.length} keahlian.`;
console.log(kalimat);

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

const daftarProyek = [
  { judul: "OPTIMA", tahun: 2026, selesai: true },
  { judul: "DentaCare", tahun: 2027, selesai: false },
];

console.table(profil.keahlian);
console.table(daftarProyek);

const selesai = daftarProyek.filter((proyek) => proyek.selesai);
console.table(selesai);

const dentacare = daftarProyek.find((proyek) => proyek.judul === "DentaCare");
console.log(dentacare);

let pilihanAktif = "semua";

const salinan = profil;
salinan.nama = "cek";

export const daftarAnime = [
  {
    judul: "Wistoria Wand and Sword",
    kategori: ["action", "fantasy"],
    gambar: "47b1d95eda9ab2962cdb174d95703fc6fe52e810b73f9654f5c3d3efe582d3d6.jpg",
    alt: "Gambar anime Wistoria Wand and Sword yang menampilkan karakter utama dengan latar belakang fantasi",
  },
  {
    judul: "Dragon Ball Super",
    kategori: ["action", "adventure", "fantasy"],
    gambar: "thumb-1920-772376.jpg",
    alt: "Gambar anime Dragon Ball Super yang menampilkan karakter utama dengan latar belakang aksi",
  },
  {
    judul: "One Piece",
    kategori: ["action", "adventure", "fantasy", "comedy"],
    gambar: "One_Piece_Anime_Logo.webp",
    alt: "Logo anime One Piece yang menampilkan tulisan 'One Piece' dengan desain khas bajak lautnya",
  },
];