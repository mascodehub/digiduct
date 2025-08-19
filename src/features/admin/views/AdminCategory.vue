<template>
  <div class="flex flex-col h-full">
    <div class="head-menu bg-white rounded-xl border border-gray-200 shadow-sm p-3 mb-3 pl-10">
      <h2 class="font-bold">CATEGORY</h2>
    </div>
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-10 flex-1 overflow-y-auto">
      <CategoryTable>
        <template #actions>
          <button class="px-3 py-1 m-4 rounded bg-teal-600 text-white text-xs hover:bg-teal-700" @click="open = true">
            <font-awesome-icon :icon="['fas', 'plus']" size="sm" /> Category
          </button>

          <Modal v-model="open" title-id="create-item-title" @confirm="save">
            <template #header>Add Category</template>

            <div class="space-y-3">
              <label class="block">
                <span class="text-sm text-gray-600">Name</span>
                <input v-model="form.name" class="mt-1 w-full rounded-lg border-gray-300 p-1" />
              </label>
            </div>

            <template #footer>
              <button class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300" @click="open = false">Cancel</button>
              <button class="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                @click="save">Submit</button>
            </template>
          </Modal>
        </template>
      </CategoryTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CategoryTable from '../components/ui/CategoryTable.vue';
import Modal from '../components/core/Modal.vue';
import { add } from '../services/category';

const open = ref(false)
const form = ref({ name: '', price: 0 })

async function save() {
  let addCategory = await add({ name: form.value.name });
  
  if (addCategory.rc == 200) {
    open.value = false
    //   return listCategory.data;
  } else {
    //   // errorMessage.value = 'Invalid username or password.';
  }
}
</script>
