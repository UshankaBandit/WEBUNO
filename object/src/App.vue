<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="UNO logo" class="logo" src="@/assets/uno.png" width="250" height="250" />
  </header>
</template>

<style scoped>

html, body {
  margin: 0;
  padding: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    justify-content: flex-start; /* Align items to the left horizontally */
    align-items: flex-start; /* Align items to the top vertically */
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0; /* Remove all margins */
    align-self: flex-start; /* Ensure the image aligns to the top of the header */
  }
}

header {
  display: flex;
  justify-content: flex-start; /* Ensures left alignment */
  align-items: center; /* Optional: Adjust vertical alignment */
  width: 100%; /* Make header span the entire screen */
}

.logo {
  margin: 0;
}
</style>
