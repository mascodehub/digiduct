<template>
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div class="p-0 flex items-center gap-2 justify-between">
            <slot name="actions"></slot>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full border-collapse">
                <thead class="bg-gray-50">
                    <tr class="bg-slate-200">
                        <th class="px-4 py-3 w-20 text-center text-sm font-bold text-gray-700 select-none">No</th>
                        <th v-for="col in columns" :key="col.key"
                            class="px-4 py-3 text-center text-sm font-bold text-gray-700 select-none">
                            <button v-if="col.sortable" class="inline-flex items-center gap-1 hover:underline"
                                @click="toggleSort(col.key)">
                                {{ col.label }}
                                <span v-if="sort.key === col.key">
                                    {{ sort.dir === 'asc' ? '▲' : '▼' }}
                                </span>
                            </button>
                            <span v-else>{{ col.label }}</span>
                        </th>
                        <th v-if="$slots.rowActions" class="px-4 py-3 text-center text-sm font-bold text-gray-700">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody v-if="!loading && computedRows.length" class="divide-y divide-gray-200">
                    <tr v-for="(row, idx) in computedRows" :key="row.id ?? idx" class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm text-gray-700 text-center">
                            {{ ((pagination.page - 1) * 10) + (idx + 1) }}
                        </td>
                        <td v-for="col in columns" :key="col.key"
                            :class="`px-4 py-3 text-sm text-gray-700 ${col.class}`">
                            <slot :name="`cell:${col.key}`" :row="row">
                                {{ row[col.key] }}
                            </slot>
                        </td>
                        <td v-if="$slots.rowActions" class="px-4 py-3 text-sm text-center">
                            <slot name="rowActions" :row="row" />
                        </td>
                    </tr>
                    <tr v-for="n in (pagination.pageSize - computedRows.length)" :key="'empty-' + n" class="border-b">
                        <td :colspan="columns.length" class="px-4 py-3">&nbsp;</td>
                    </tr>
                </tbody>

                <tbody v-else-if="loading">
                    <tr>
                        <td :colspan="columns.length + ($slots.rowActions ? 1 : 0)"
                            class="px-4 py-10 text-center text-sm text-gray-500">
                            Loading…
                        </td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr>
                        <td :colspan="columns.length + ($slots.rowActions ? 1 : 0)"
                            class="px-4 py-10 text-center text-sm text-gray-500">
                            No data found.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="p-3">
            <div class="grid grid-cols-[10%_90%]">
                <div class="text-xs text-gray-500 flex items-center justify-center">Total: {{ props.rows.length }} rows
                </div>
                <div class="flex items-center justify-end  space-x-1">
                    <button @click="changePage(pagination.page - 1)" :disabled="pagination.page === 1"
                        class="px-3 py-1 rounded bg-gray-300 text-xs hover:bg-gray-500 disabled:opacity-50">
                        <font-awesome-icon :icon="['fas', 'chevron-left']" size="sm" />
                    </button>

                    <button v-for="n in visiblePages" :key="n" @click="n !== '...' && changePage(n)"
                        class="px-3 py-1 rounded text-xs" :class="[
                            n === pagination.page
                                ? 'bg-teal-600 text-white'
                                : n === '...'
                                    ? 'cursor-default text-gray-500'
                                    : 'bg-gray-300 text-black hover:bg-gray-500'
                        ]" :disabled="n === '...'">
                        {{ n }}
                    </button>

                    <button @click="changePage(pagination.page + 1)" :disabled="pagination.page === totalPages"
                        class="px-3 py-1 rounded bg-gray-300 text-xs hover:bg-gray-500 disabled:opacity-50">
                        <font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" />
                    </button>

                </div>
            </div>
        </div>
    </div>



</template>

<script setup>
import { computed, reactive } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft, faChevronRight)

const props = defineProps({
    columns: { type: Array, required: true },
    rows: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    defaultSort: { type: Object, default: () => ({ key: null, dir: 'asc' }) },
    pageSize: { type: Number, default: 10 } // cukup kasih ukuran halaman
})

// pagination dikelola internal
const pagination = reactive({
    page: 1,
    pageSize: props.pageSize,
    get total() {
        return props.rows.length
    }
})

// sorting state
const sort = reactive({ key: props.defaultSort.key, dir: props.defaultSort.dir })

function toggleSort(key) {
    if (sort.key === key) {
        sort.dir = sort.dir === 'asc' ? 'desc' : 'asc'
    } else {
        sort.key = key
        sort.dir = 'asc'
    }
}

function changePage(newPage) {
    if (newPage < 1) return
    if (newPage > totalPages.value) return
    pagination.page = newPage
}

const computedRows = computed(() => {
    let data = [...props.rows]

    // sorting
    if (sort.key) {
        data.sort((a, b) => {
            const va = a[sort.key], vb = b[sort.key]
            if (va == null && vb == null) return 0
            if (va == null) return 1
            if (vb == null) return -1
            return sort.dir === 'asc'
                ? String(va).localeCompare(String(vb))
                : String(vb).localeCompare(String(va))
        })
    }

    // pagination
    const start = (pagination.page - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    return data.slice(start, end)
})

const totalPages = computed(() =>
    Math.ceil(pagination.total / pagination.pageSize)
)

const visiblePages = computed(() => {
    const total = totalPages.value
    const current = pagination.page
    const maxVisible = 5

    if (total <= maxVisible) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    let pages = []

    pages.push(1)

    let start = current - 1
    let end = current + 1

    if (start <= 2) {
        start = 2
        end = 4
    }
    if (end >= total - 1) {
        start = total - 3
        end = total - 1
    }

    if (start > 2) {
        pages.push("...")
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (end < total - 1) {
        pages.push("...")
    }

    pages.push(total)

    return pages
})


</script>
