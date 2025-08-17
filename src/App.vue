<template>
  <nav class="navigation">
    <ul v-if="!$route.path.startsWith('/admin')">
      <!-- <router-link to="/">Home</router-link> -->
    </ul>
  </nav>
  <router-view></router-view>
</template>

<script setup>
const isAdmin = localStorage.getItem("digitoken") != null;
</script>

<style scoped>
.navigation ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 1em;
}
</style>