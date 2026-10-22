<script setup></script>

<template>
  <section id="bagian-2">
    <h2>Tambah Anime ke Daftar</h2>

    <form id="form-anime" action="/simpan" method="post" novalidate>
      <p class="form-kolom">
        <label for="judul">Judul</label>
        <input type="text" id="judul" name="judul" required />
        <span id="galat-judul" class="galat" role="alert"></span>
      </p>
      <p class="form-kolom">
        <label for="season">Season</label>
        <input type="number" id="season" name="season" min="1" required />
        <span id="galat-season" class="galat" role="alert"></span>
      </p>
      <p class="form-kolom">
        <label for="episode">Episode</label>
        <input type="number" id="episode" name="episode" min="1" required />
        <span id="galat-episode" class="galat" role="alert"></span>
      </p>
      <button type="submit">Simpan</button>
    </form>
  </section>
</template>
