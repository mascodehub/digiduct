<template>
    <Table :columns="cols" :rows="rows" :loading="loading" v-model:page="currentPage"
        :defaultSort="{ key: 'name', dir: 'asc' }">

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
                    <button class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        @click="open = false">Cancel</button>
                    <button class="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                        @click="save">Submit</button>
                </template>
            </Modal>
        </template>


        <template #cell:price="{ row }">
            Rp {{ Number(row.price).toLocaleString('id-ID') }}
        </template>

        <template #rowActions="{ row }">
            <button class="px-3 py-1 rounded bg-teal-600 text-white text-xs hover:bg-teal-700 mr-2"
                @click="edit(row)"><font-awesome-icon :icon="['fas', 'pencil-alt']" size="sm" /></button>
            <button class="px-3 py-1 rounded bg-rose-600 text-white text-xs hover:bg-rose-700"
                @click="remove(row)"><font-awesome-icon :icon="['fas', 'trash']" size="sm" /></button>
        </template>
    </Table>

</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

import Table from '../../components/core/Table.vue';
import Modal from '../../components/core/Modal.vue';
import { add, list } from '../../services/category';

const open = ref(false)
const form = ref({ name: '' })

library.add(faTrash, faPencilAlt, faPlus)

let rows = ref([])
let loading = ref(true)
let currentPage = ref(1)

const cols = [
    { key: 'name', label: 'Name', sortable: true, class: '' },
];

function edit(row) { console.log('edit', row); }
function remove(row) { console.log('delete', row); }

async function get_category(params) {
    let listCategory = await list({ limit: params.limit, offset: params.offset });

    if (listCategory.rc == 200) {
        return listCategory.data;
    } else {
        // errorMessage.value = 'Invalid username or password.';
    }
}

async function save() {
    let addCategory = await add({ name: form.value.name });

    if (addCategory.rc == 200) {
        open.value = false

        loading.value = true
        rows.value = await get_category({ limit: 10, offset: (currentPage - 1) * 10 })
        loading.value = false
    } else {
        //   // errorMessage.value = 'Invalid username or password.';
    }
}

watch(currentPage, async (page) => {
    loading.value = true
    rows.value = await get_category({ limit: 10, offset: (page - 1) * 10 })
    loading.value = false
})

onMounted(async () => {
    loading.value = true
    rows.value = await get_category({ limit: 10, offset: 0 })
    loading.value = false
})

</script>