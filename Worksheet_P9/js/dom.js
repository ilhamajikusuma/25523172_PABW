import { daftarAnime } from "./app.js";

// ===== Lembar A: pilih elemen =====
const wadah = document.querySelector(".katalog");
const barisFilter = document.querySelector("#filter");
const kosong = document.querySelector("#kosong");
const form = document.querySelector("#form-anime");
const tombolKirim = form.querySelector("button[type='submit']");
const kolom = {
  judul: form.querySelector("#judul"),
  season: form.querySelector("#season"),
  episode: form.querySelector("#episode"),
};

let kategoriAktif = "semua";

// ===== Lembar B + D.1: render dari data =====
function buatChip(kategori) {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "chip";
  chip.dataset.kategori = kategori;
  chip.textContent = kategori;
  chip.classList.toggle("aktif", kategori === kategoriAktif);
  return chip;
}

function buatKartu(anime) {
  const kartu = document.createElement("figure");

  const gambar = document.createElement("img");
  gambar.src = anime.gambar;
  gambar.alt = anime.alt;
  gambar.width = 640;
  gambar.height = 360;
  gambar.loading = "lazy";

  const judul = document.createElement("figcaption");
  judul.textContent = anime.judul;

  const chips = document.createElement("div");
  chips.className = "chips";
  chips.append(...anime.kategori.map(buatChip));

  kartu.append(gambar, judul, chips);
  return kartu;
}

function render(daftar) {
  wadah.textContent = "";             // 1. kosongkan lebih dulu
  if (daftar.length === 0) {          // 2. keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
  daftar.forEach((anime) => wadah.append(buatKartu(anime)));  // 3. isi ulang
}

// ===== Lembar C: filter dengan event delegation =====
function tandaiTombolAktif() {
  document.querySelectorAll("#filter button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol.dataset.kategori === kategoriAktif);
  });
}

function terapkanFilter(kategori) {
  kategoriAktif = kategori;
  const terpilih = daftarAnime.filter(
    (anime) => kategori === "semua" || anime.kategori.includes(kategori)
  );
  tandaiTombolAktif();
  render(terpilih);
}

// Satu pendengar di baris filter
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;
  terapkanFilter(tombol.dataset.kategori);
});

// Satu pendengar di katalog untuk chip di dalam kartu
wadah.addEventListener("click", (event) => {
  const chip = event.target.closest(".chip");
  if (!chip) return;
  terapkanFilter(chip.dataset.kategori);
});

// ===== Lembar D.2: validasi form =====
const aturan = {
  judul: (nilai) =>
    nilai.trim().length >= 2 ? "" : "Isi judul anime minimal 2 huruf.",
  season: (nilai) =>
    Number.isInteger(Number(nilai)) && Number(nilai) >= 1 && nilai.trim() !== ""
      ? ""
      : "Isi season dengan angka bulat, mulai dari 1.",
  episode: (nilai) =>
    Number.isInteger(Number(nilai)) && Number(nilai) >= 1 && nilai.trim() !== ""
      ? ""
      : "Isi jumlah episode dengan angka bulat, mulai dari 1.",
};

function periksaKolom(nama) {
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

function semuaSah() {
  return Object.keys(aturan).every((nama) => !aturan[nama](kolom[nama].value));
}

form.addEventListener("input", (event) => {
  if (aturan[event.target.id]) periksaKolom(event.target.id);
  tombolKirim.disabled = !semuaSah();
});

form.addEventListener("focusout", (event) => {
  if (aturan[event.target.id]) periksaKolom(event.target.id);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();             // baris pertama
  const hasil = Object.keys(aturan).map((nama) => [nama, periksaKolom(nama)]);
  const bermasalah = hasil.find(([, sah]) => !sah);
  if (bermasalah) {
    kolom[bermasalah[0]].focus();
    return;
  }
  form.reset();
  tombolKirim.disabled = true;
});

// ===== Keadaan awal =====
tombolKirim.disabled = true;
terapkanFilter("semua");