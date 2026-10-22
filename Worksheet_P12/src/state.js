import { reactive } from "vue";

export const state = reactive({
  kategoriAktif: "semua",
  daftarProyek: [],
  favorit: [],
  memuat: true,
  galat: "",
});

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
}

export function toggleFavorit(id) {
  state.favorit = state.favorit.includes(id)
    ? state.favorit.filter((favoritId) => favoritId !== id)
    : [...state.favorit, id];
}

export function aturUlang() {
  state.kategoriAktif = "semua";
  state.favorit = [];
}

export function muat() {
  try {
    const tersimpan = localStorage.getItem("proyek_app");
    return tersimpan ? JSON.parse(tersimpan) : null;
  } catch {
    return null;
  }
}

export function simpan(data) {
  try {
    localStorage.setItem("proyek_app", JSON.stringify(data));
  } catch {
    // Aplikasi tetap dapat digunakan jika penyimpanan browser tidak tersedia.
  }
}

export function pulihkan(data) {
  if (data) {
    state.kategoriAktif = data.kategoriAktif || "semua";
    state.daftarProyek = data.daftarProyek || [];
    state.favorit = data.favorit || [];
  }
}

export function isiProyek(data) {
  state.daftarProyek = data;
}
