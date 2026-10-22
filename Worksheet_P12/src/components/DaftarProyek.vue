<script setup>
import { state } from "../state.js";
</script>

<template>
  <section id="bagian-1">
    <h2>List Anime</h2>

    <p v-if="state.memuat">Memuat data...</p>
    <p v-else-if="state.galat" role="alert">{{ state.galat }}</p>
    <p v-else-if="state.daftarProyek.length === 0">Belum ada data.</p>

    <div class="tabel-gulir" v-else>
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

    <div class="katalog" id="daftar"></div>
  </section>
</template>
