// js/app.js: perakit. Hanya import dan pemanggilan.
import { ambilProyek } from "./api.js";
import { isiProyek, pulihkan, muat } from "./state.js";
import { tampilkanGalat, aturMemuat } from "./dom.js";
import { pasangPendengar } from "./events.js";

async function mulai() {
  pulihkan(muat());
  pasangPendengar();
  aturMemuat(true);
  try {
    isiProyek(await ambilProyek());
  } catch (galat) {
    tampilkanGalat(
      "Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.",
    );
    console.error(galat.message);
  } finally {
    aturMemuat(false);
  }
}

mulai();
