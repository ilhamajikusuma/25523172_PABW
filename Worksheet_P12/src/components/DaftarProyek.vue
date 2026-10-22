<script setup>
import { computed } from "vue";
import { saring } from "../data.js";
import { state, toggleFavorit, aturUlang } from "../state.js";
import TombolFilter from "./TombolFilter.vue";

const gambarAset = import.meta.glob("../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});
const daftarTampil = computed(() => saring(state.daftarProyek, state.kategoriAktif));

function sumberGambar(namaFile) {
  const cocok = Object.entries(gambarAset).find(([jalur]) => jalur.endsWith(`/${namaFile}`));
  return cocok?.[1] ?? "";
}
</script>

<template>
  <section id="bagian-1">
    <h2>List Anime</h2>

    <p v-if="state.memuat">Memuat data...</p>
    <p v-else-if="state.galat" role="alert">{{ state.galat }}</p>

    <div class="tabel-gulir" v-if="!state.memuat && !state.galat">
      <table>
        <thead>
          <tr>
            <th scope="col">Nomor</th>
            <th scope="col">Judul</th>
            <th scope="col">Season</th>
            <th scope="col">Episode</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in state.daftarProyek" :key="item.judul">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.judul }}</td>
            <td>{{ item.season }}</td>
            <td>{{ item.episode }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <TombolFilter />

    <div class="katalog" id="daftar">
      <figure v-for="anime in daftarTampil" :key="anime.id">
        <img :src="sumberGambar(anime.gambar)" :alt="anime.alt" width="640" height="360" />
        <figcaption>{{ anime.judul }}</figcaption>
        <div class="baris-aksi">
          <div class="chips">
            <button
              v-for="kategori in anime.kategori"
              :key="kategori"
              type="button"
              class="chip"
              :class="{ aktif: state.kategoriAktif === kategori }"
              :aria-pressed="state.kategoriAktif === kategori"
              @click="state.kategoriAktif = kategori"
            >{{ kategori }}</button>
          </div>
          <button
            type="button"
            class="favorit"
            :aria-label="`${state.favorit.includes(anime.id) ? 'Hapus' : 'Tandai'} ${anime.judul} ${state.favorit.includes(anime.id) ? 'dari' : 'sebagai'} favorit`"
            :aria-pressed="state.favorit.includes(anime.id)"
            @click="toggleFavorit(anime.id)"
          >{{ state.favorit.includes(anime.id) ? "★" : "☆" }}</button>
        </div>
      </figure>
    </div>

    <p
      v-if="!state.memuat && !state.galat && daftarTampil.length === 0"
      id="kosong"
      role="status"
    >Belum ada anime di kategori ini.</p>

    <button type="button" id="atur-ulang" @click="aturUlang">Atur ulang</button>
  </section>
</template>
