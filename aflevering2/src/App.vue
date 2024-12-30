<template>
  <!-- Render the active route's component -->
  <router-view />
</template>

<script>
export default {
  name: "App", // Root component name
};
</script>

<style>
/* Global styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

h1, h2, h3, p {
  margin: 0;
  padding: 0;
}
</style>
