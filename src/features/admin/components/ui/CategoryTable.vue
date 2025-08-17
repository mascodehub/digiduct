<template>
    <Table :columns="cols" :rows="props.rows" :loading="props.loading" :defaultSort="{ key: 'name', dir: 'asc' }">

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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import Table from '../../components/core/Table.vue';

library.add(faTrash, faPencilAlt)

const props = defineProps({
    rows: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
})

const cols = [
    { key: 'name', label: 'Name', sortable: true, class: '' },
    { key: 'category', label: 'Category', sortable: true, class: 'text-center' },
    { key: 'price', label: 'Price', sortable: true, class: 'text-right' }
];

function edit(row) { console.log('edit', row); }
function remove(row) { console.log('delete', row); }
</script>