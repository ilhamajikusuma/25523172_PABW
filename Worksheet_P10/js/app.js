import { ambilProyek } from "./api.js";
import { tampilkanData, tampilkanGalat, aturMemuat } from "./dom.js";

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

async function muat() {
  aturMemuat(true);
  try {
    const data = await ambilProyek();
    console.log(data);
    console.log(data[0]?.judul);
    const badan = JSON.stringify({ judul: "Judul contoh", kategori: "web" });
    console.log(typeof badan);
    tampilkanData(data);
  } catch (galat) {
    tampilkanGalat(
      "Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.",
    );
    console.error(galat.message);
  } finally {
    aturMemuat(false);
  }
}

muat();
