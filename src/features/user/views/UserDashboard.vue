<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow p-5 mb-6">
      <h1 class="text-2xl font-bold text-gray-800">🛒 Digital Product Store</h1>
      <p class="text-gray-500">Beli produk digital favoritmu dengan mudah</p>
    </header>

    <!-- Product List -->
    <main class="px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </main>
  </div>
</template>

<script setup>
import ProductCard from "@/features/user/components/ui/ProductCard.vue"
import { ref } from "vue"

// Data statis sementara
const products = ref([
  { id: 1, name: "Apple Music", category: "Music & Video", price: 59000, image: "https://placehold.co/480x240" },
  { id: 2, name: "Netflix", category: "Streaming", price: 120000, image: "https://placehold.co/480x240" },
  { id: 3, name: "Microsoft Office 365", category: "Productivity", price: 899000, image: "https://placehold.co/480x240" },
  { id: 4, name: "Steam Wallet", category: "Games", price: 150000, image: "https://placehold.co/480x240" },
  { id: 5, name: "Google Drive 100GB", category: "Utility", price: 25000, image: "https://placehold.co/480x240" }
])
</script>
