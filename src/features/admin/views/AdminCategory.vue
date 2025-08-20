<template>
  <div class="flex flex-col h-full">
    <div class="head-menu bg-white rounded-xl border border-gray-200 shadow-sm p-3 mb-3 pl-10">
      <h2 class="font-bold">CATEGORY</h2>
    </div>
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-10 flex-1 overflow-y-auto">
      <CategoryTable />
    </div>
  </div>
</template>

<script setup>
import CategoryTable from '../components/ui/CategoryTable.vue';
</script>
