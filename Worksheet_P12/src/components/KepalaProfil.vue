<script setup>
const props = defineProps({
  profil: { type: Object, required: true },
});
</script>

<template>
  <header class="kepala-profil">
    <input type="checkbox" id="tema" class="pengalih-tema" />
    <label for="tema" class="tombol-tema">Tema gelap</label>

    <div class="header-baris">
      <h1>List Anime Yang Pernah Ditonton</h1>
      <nav class="navbar" aria-label="Navigasi utama">
        <ul>
          <li><a href="#bagian-1">Anime 1</a></li>
          <li><a href="#bagian-2">Anime 2</a></li>
          <li><a href="#bagian-3">Anime 3</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Memastikan elemen interaktif berada di lapisan teratas dan bisa diklik */
.tombol-tema,
.navbar a,
.pengalih-tema {
  position: relative;
  z-index: 50;
  cursor: pointer;
}

header {
  position: relative;
}
</style>
