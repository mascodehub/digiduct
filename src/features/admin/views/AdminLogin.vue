<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-800">Log In</h2>
      <form @submit.prevent="handleLogin">
        <p v-if="errorMessage" class="mb-4 text-sm text-center text-red-600 bg-red-100 p-3 rounded-md">
          {{ errorMessage }}
        </p>

        <div class="mb-4">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-600">username</label>
          <input type="username" id="username" v-model="username"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required />
        </div>

        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input type="password" id="password" v-model="password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required />
        </div>

        <button type="submit" :disabled="isLoading"
          class="w-full px-4 py-2 font-semibold text-white transition-colors duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'">
          <span v-if="!isLoading">Log In</span>
          <span v-else>Loading...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    let params = {
      username: username.value,
      password: password.value,
    }

    let result = await login(params);

    if (result.rc == 200) {
      localStorage.setItem('digitoken', result.data.token);
      router.push({ name: 'admin-dashboard' });
    } else {
      errorMessage.value = 'Invalid username or password.';
    }

  } catch (error) {
    errorMessage.value = 'An unexpected error occurred.';
  } finally {
    isLoading.value = false;
  }
};
</script>