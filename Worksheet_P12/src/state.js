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

export function muat() {
  const tersimpan = localStorage.getItem("proyek_app");
  return tersimpan ? JSON.parse(tersimpan) : null;
}

export function simpan(data) {
  localStorage.setItem("proyek_app", JSON.stringify(data));
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
