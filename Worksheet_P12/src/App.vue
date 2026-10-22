<script setup>
import { onMounted, watch } from "vue";
import { profil } from "./data.js";
import { state, muat, simpan, pulihkan, isiProyek } from "./state.js";
import { ambilProyek } from "./api.js";

import KepalaProfil from "./components/KepalaProfil.vue";
import TombolFilter from "./components/TombolFilter.vue";
import DaftarProyek from "./components/DaftarProyek.vue";
import FormKontak from "./components/FormKontak.vue";

onMounted(async () => {
  pulihkan(muat());
  try {
    isiProyek(await ambilProyek());
  } catch (galat) {
    state.galat = "Data gagal dimuat. Periksa koneksi, lalu muat ulang.";
  } finally {
    state.memuat = false;
  }
});

watch(state, (nilai) => simpan(nilai), { deep: true });
</script>

<template>
  <div class="page">
    <KepalaProfil :profil="profil" />

    <main class="isi">
      <aside class="sisi">
        <h2>Tentang daftar ini</h2>
        <p>
          Anime yang pernah saya tonton, lengkap dengan season dan jumlah
          episodenya.
        </p>
      </aside>

      <div class="utama">
        <TombolFilter />
        <DaftarProyek />
        <FormKontak />
      </div>
    </main>

    <footer id="bagian-3">
      <p>ILHAM AJI KUSUMA · 25523172 · 2026</p>
    </footer>
  </div>
</template>

<style scoped></style>
