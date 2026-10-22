<script setup>
import { state, pilihKategori } from "../state.js";

const kategori = ["semua", "action", "adventure", "fantasy", "comedy", "romance"];
</script>

<template>
  <div id="filter" aria-label="Filter kategori">
    <button
      v-for="item in kategori"
      :key="item"
      type="button"
      :class="{ aktif: state.kategoriAktif === item }"
      :aria-pressed="state.kategoriAktif === item"
      @click="pilihKategori(item)"
    >{{ item === "semua" ? "Semua" : item }}</button>
  </div>
</template>
