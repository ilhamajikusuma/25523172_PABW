// js/dom.js: seluruh sentuhan ke halaman (pemilih, render, kelas)
import { saring, aturan } from "./data.js";

// ===== pemilih elemen =====
export const wadah = document.querySelector("#daftar");
export const barisFilter = document.querySelector("#filter");
export const tombolAturUlang = document.querySelector("#atur-ulang");
export const form = document.querySelector("#form-anime");
const kosong = document.querySelector("#kosong");
const pesanMuat = document.querySelector("#muat");
const pesanGalat = document.querySelector("#galat");
const tombolKirim = form.querySelector("button[type='submit']");
const kolom = {
  judul: form.querySelector("#judul"),
  season: form.querySelector("#season"),
  episode: form.querySelector("#episode"),
};

// ===== kartu =====
function buatChip(kategori, kategoriAktif) {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "chip";
  chip.dataset.kategori = kategori;
  chip.textContent = kategori;
  chip.classList.toggle("aktif", kategori === kategoriAktif);
  return chip;
}

function buatKartu(anime, favorit, kategoriAktif) {
  const kartu = document.createElement("figure");

  const gambar = document.createElement("img");
  gambar.src = anime.gambar;
  gambar.alt = anime.alt;
  gambar.width = 640;
  gambar.height = 360;
  gambar.loading = "lazy";

  const judul = document.createElement("figcaption");
  judul.textContent = anime.judul;

  const tombolFavorit = document.createElement("button");
  tombolFavorit.type = "button";
  tombolFavorit.className = "favorit";
  tombolFavorit.dataset.id = anime.id;
  tombolFavorit.textContent = favorit.includes(anime.id) ? "★" : "☆";
  tombolFavorit.setAttribute(
    "aria-label",
    `Tandai ${anime.judul} sebagai favorit`,
  );

  const chips = document.createElement("div");
  chips.className = "chips";
  chips.append(...anime.kategori.map((k) => buatChip(k, kategoriAktif)));

  const barisAksi = document.createElement("div");
  barisAksi.className = "baris-aksi";
  barisAksi.append(chips, tombolFavorit);

  kartu.append(gambar, judul, barisAksi);
  return kartu;
}

// ===== render dari state =====
function tandaiTombolAktif(state) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle(
      "aktif",
      tombol.dataset.kategori === state.kategoriAktif,
    );
  });
}

export function render(state) {
  tandaiTombolAktif(state);
  if (!state.adaData) return; // data belum tiba: jangan tampilkan "kosong"
  wadah.textContent = ""; // 1. kosongkan lebih dulu
  pesanGalat.hidden = true;
  const tampil = saring(state.daftarProyek, state.kategoriAktif);
  if (tampil.length === 0) {
    // 2. keadaan kosong
    kosong.textContent =
      state.kategoriAktif === "semua"
        ? "Belum ada data."
        : "Belum ada anime di kategori ini.";
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
  tampil.forEach((anime) =>
    wadah.append(buatKartu(anime, state.favorit, state.kategoriAktif)),
  ); // 3. isi ulang
}

// ===== keadaan memuat dan galat =====
export function tampilkanGalat(pesan) {
  wadah.textContent = "";
  kosong.hidden = true;
  pesanGalat.textContent = pesan;
  pesanGalat.hidden = false;
}

export function aturMemuat(sedang) {
  pesanMuat.hidden = !sedang;
  if (sedang) {
    pesanGalat.hidden = true;
    kosong.hidden = true;
  }
}

// ===== form =====
export function periksaKolom(nama) {
  const input = kolom[nama];
  const galat = aturan[nama](input.value);
  form.querySelector(`#galat-${nama}`).textContent = galat;
  if (galat) {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.removeAttribute("aria-invalid");
  }
  return galat === "";
}

export function perbaruiTombolKirim() {
  tombolKirim.disabled = !Object.keys(aturan).every(
    (nama) => !aturan[nama](kolom[nama].value),
  );
}

export function periksaSemua() {
  const hasil = Object.keys(aturan).map((nama) => [nama, periksaKolom(nama)]);
  const bermasalah = hasil.find(([, sah]) => !sah);
  if (bermasalah) {
    kolom[bermasalah[0]].focus();
    return false;
  }
  return true;
}

export function kosongkanForm() {
  form.reset();
  tombolKirim.disabled = true;
}

// ===== keadaan awal =====
tombolKirim.disabled = true;
