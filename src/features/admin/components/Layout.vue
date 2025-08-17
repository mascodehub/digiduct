<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <Sidebar :title="'DIGIDUCT PANEL'" :menus="menuItems" @logout="logout" />

        <!-- Content -->
        <main class="flex-1 pt-2 pl-10 pr-10 pb-10 overflow-y-auto bg-gray-600 flex flex-col">
            <router-view class="flex-1" />
        </main>
    </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";

const menuItems = [
    { to: "/admin", label: "Home", icon: '', exact: true },
    { to: "/admin/category", label: "Category", icon: '' },
    { to: "/admin/product", label: "Product", icon: '' },
    { to: "/admin/product-package", label: "Package", icon: '' }
];

const logout = () => {
    localStorage.removeItem("digitoken");
    window.location.href = "/admin/login";
};
</script>
