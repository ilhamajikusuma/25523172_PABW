// events.js: di dalam export function pasangPendengar()
document.querySelector("#daftar").addEventListener("click", (event) => {
  const tombol = event.target.closest(".favorit");
  if (!tombol) return;
  tambahFavorit(Number(tombol.dataset.id));
});
// js/events.js: pemasangan seluruh pendengar peristiwa
import { aturan } from "./data.js";
import {
  barisFilter,
  wadah,
  form,
  tombolAturUlang,
  periksaKolom,
  perbaruiTombolKirim,
  periksaSemua,
  kosongkanForm,
} from "./dom.js";
import { pilihKategori, tambahFavorit, aturUlang } from "./state.js";

export function pasangPendengar() {
  // filter kategori
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return;
    pilihKategori(tombol.dataset.kategori);
  });

  // favorit dan chip di dalam kartu
  wadah.addEventListener("click", (event) => {
    const favorit = event.target.closest(".favorit");
    if (favorit) {
      tambahFavorit(Number(favorit.dataset.id));
      return;
    }
    const chip = event.target.closest(".chip");
    if (chip) pilihKategori(chip.dataset.kategori);
  });

  // atur ulang
  tombolAturUlang.addEventListener("click", aturUlang);

  // form
  form.addEventListener("input", (event) => {
    if (aturan[event.target.id]) periksaKolom(event.target.id);
    perbaruiTombolKirim();
  });

  form.addEventListener("focusout", (event) => {
    if (aturan[event.target.id]) periksaKolom(event.target.id);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (periksaSemua()) kosongkanForm();
  });
}
