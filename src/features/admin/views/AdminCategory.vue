<template>
  <div class="flex flex-col h-full">
    <div class="head-menu bg-white rounded-xl border border-gray-200 shadow-sm p-3 mb-3 pl-10">
      <h2 class="font-bold">CATEGORY</h2>
    </div>
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-10 flex-1 overflow-y-auto">
      <CategoryTable :rows="items" :loading="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CategoryTable from '../components/ui/CategoryTable.vue';

const items = ref([]);
const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    items.value = Array.from({ length: 100 }, (_, i) => {
      const categories = ["Music & Video", "Streaming", "Productivity", "Games", "Utility"];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      return {
        id: i + 1,
        name: `Product ${i + 1}`,
        category: randomCategory,
        price: Math.floor(Math.random() * 200000) + 10000, // 10k - 200k
      };
    });
    loading.value = false;
  }, 400);
});
</script>
