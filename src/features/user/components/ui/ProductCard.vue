<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow hover:shadow-md p-4 flex flex-col">
    <img
      :src="product.image"
      :alt="product.name"
      class="rounded-lg h-32 object-cover mb-3"
    />
    <h3 class="font-semibold text-gray-800">{{ product.name }}</h3>
    <p class="text-sm text-gray-500">{{ product.category }}</p>
    <p class="font-bold text-teal-600 mt-2">Rp {{ product.price.toLocaleString() }}</p>
    <button
      class="mt-auto bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
    >
      Beli Sekarang
    </button>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>
