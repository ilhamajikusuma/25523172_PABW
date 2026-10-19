// js/state.js: satu objek state, fungsi pengubahnya, dan simpanan localStorage
import { render } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;

export const state = {
  daftarProyek: [],
  kategoriAktif: "semua",
  favorit: [],
  adaData: false,
};

// ===== fungsi pengubah: satu pintu masuk setiap perubahan =====
export function isiProyek(daftar) {
  state.daftarProyek = daftar;
  state.adaData = true;
  render(state);
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  simpan(state);
  render(state);
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) return;
  state.favorit = [...state.favorit, id];
  simpan(state);
  render(state);
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "semua";
  state.favorit = [];
  render(state);
}

// ===== localStorage: hanya pilihan tampilan, bukan data dari server =====
export function simpan(state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: state.kategoriAktif,
    favorit: state.favorit,
  };
  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch {
    // penyimpanan penuh atau diblokir: halaman tetap jalan tanpa simpanan
  }
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI); // bentuk lama atau kunjungan pertama
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI); // isi rusak: buang
    return null;
  }
}

export function pulihkan(isi) {
  if (!isi) return; // nilai bawaan tetap
  state.kategoriAktif = isi.kategoriAktif ?? "semua";
  state.favorit = Array.isArray(isi.favorit) ? isi.favorit : [];
}
