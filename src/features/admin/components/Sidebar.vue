<template>
    <aside class="w-56 bg-teal-600 text-white flex flex-col">
        <div class="px-6 py-4 text-lg font-bold border-b border-teal-500">
            {{ title }}
        </div>

        <nav class="flex-1 px-4 py-6">
            <ul class="space-y-2">
                <li v-for="item in menus" :key="item.to">
                    <router-link :to="item.to" class="block px-3 py-2 rounded-md hover:bg-teal-500 transition"
                        :active-class="item.exact ? '' : 'bg-teal-700 font-semibold'"
                        :exact-active-class="item.exact ? 'bg-teal-700 font-semibold' : ''">
                        {{ item.label }}
                    </router-link>

                </li>
            </ul>
        </nav>

        <div class="px-4 py-4 border-t border-teal-500">
            <button @click="$emit('logout')"
                class="w-full text-left px-3 py-2 bg-teal-700 hover:bg-red-500 rounded-md transition">
                Logout
            </button>
        </div>
    </aside>
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
