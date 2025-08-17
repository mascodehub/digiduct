<template>

</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Admin Panel"
  },
  menus: {
    type: Array,
    default: () => []
  }
});
</script>
