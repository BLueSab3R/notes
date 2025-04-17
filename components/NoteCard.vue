<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ease-in-out overflow-hidden">
    <div class="p-6">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">{{ note.title }}</h3>
        <div class="flex space-x-1 -mr-2">
          <button
            @click="emit('edit', note)"
            class="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
            title="Edit note"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            @click="emit('delete', note.id)"
            class="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            title="Delete note"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <p class="text-gray-600 line-clamp-3 mb-4">{{ note.content }}</p>
      
      <div class="flex items-center text-sm text-gray-500">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ formatDate(note.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '../src/entities/note/model/types'

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  edit: [note: Note]
  delete: [id: string]
}>()

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}
</script> 
