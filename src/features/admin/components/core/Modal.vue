<template>
    <Teleport to="body">
        <transition name="backdrop" appear>
            <div v-if="modelValue" class="fixed inset-0 z-[1000] bg-black/40" @click="onBackdrop" />
        </transition>

        <transition name="modal" appear>
            <div v-if="modelValue" class="fixed inset-0 z-[1001] flex items-center justify-center p-4"
                @keydown.esc.prevent="close" role="dialog" :aria-labelledby="titleId" aria-modal="true" ref="modalRoot">
                <form class="w-full max-w-lg rounded-lg shadow-lg p-6" ref="formRef" @submit.prevent="submitForm">
                    <div class="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden"
                        @click.stop>
                        <!-- Header -->
                        <div class="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                            <h3 :id="titleId" class="text-lg font-semibold text-gray-800">
                                <slot name="header">Modal Title</slot>
                            </h3>
                            <button type="button" class="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring"
                                @click="close" aria-label="Close modal">
                                ✕
                            </button>
                        </div>

                        <!-- Body -->
                        <div class="px-5 py-4">
                            <slot>
                                <label class="block mb-3">
                                    <span class="text-sm text-gray-600">Name</span>
                                    <input type="text" required class="mt-1 w-full rounded-lg border-gray-300 p-2" />
                                </label>
                            </slot>
                        </div>

                        <!-- Footer -->
                        <div class="px-5 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
                            <button type="button" class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                @click="close">
                                Close
                            </button>

                            <button type="submit" class="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700">
                                Confirm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
    modelValue: { type: Boolean, default: false },
    closeOnBackdrop: { type: Boolean, default: true },
    titleId: { type: String, default: 'modal-title' },
})
const emit = defineEmits(['update:modelValue', 'open', 'close', 'confirm'])

const modalRoot = ref(null)

const formRef = ref(null)

function submitForm() {
    const form = formRef.value
    if (!form.checkValidity()) {
        form.reportValidity() // biar muncul pesan error bawaan browser
        return
    }
    emit("confirm")
    close()
}

function close() {
    emit('update:modelValue', false)
    emit('close')
}

function onBackdrop() {
    if (props.closeOnBackdrop) close()
}

// Trap scroll body saat modal terbuka + autofocus
watch(
    () => props.modelValue,
    (open) => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = open ? 'hidden' : ''
        }
        if (open) {
            // fokus pertama kali ke container modal
            requestAnimationFrame(() => modalRoot.value?.focus?.())
            emit('open')
        }
    },
    { immediate: true }
)

onMounted(() => {
    // pastikan container bisa menerima fokus untuk ESC
    modalRoot.value?.setAttribute('tabindex', '-1')
})
onBeforeUnmount(() => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
    }
})
</script>

<style scoped>
/* Backdrop fade */
.backdrop-enter-active,
.backdrop-leave-active {
    transition: opacity .15s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
    opacity: 0;
}

/* Modal scale+fade */
.modal-enter-active,
.modal-leave-active {
    transition: all .18s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: translateY(8px) scale(.98);
}
</style>
