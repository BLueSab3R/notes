<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-gray-800">Your Notes</h2>
      <span class="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
        {{ notes.length }} {{ notes.length === 1 ? 'Note' : 'Notes' }}
      </span>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <div
      v-else-if="notes.length === 0"
      class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
      <p class="text-gray-500">Create your first note to get started!</p>
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <div
      v-if="editingNote"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="text-xl font-semibold text-gray-800">Edit Note</h3>
        </div>
        
        <form @submit.prevent="handleUpdate" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              v-model="editForm.title"
              type="text"
              class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              v-model="editForm.content"
              rows="4"
              class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="cancelEdit"
              class="px-4 py-2 rounded-lg text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Note } from '../src/entities/note/model/types'
import { notesApi } from '../src/shared/api/notes'
import { noteSchema } from '../src/shared/lib/validation'

const notes = ref<Note[]>([])
const loading = ref(true)
const editingNote = ref<Note | null>(null)
const editForm = ref({
  title: '',
  content: ''
})

const fetchNotes = async () => {
  loading.value = true
  try {
    notes.value = await notesApi.getAllNotes()
  } catch (error) {
    console.error('Failed to fetch notes:', error)
  } finally {
    loading.value = false
  }
}

defineExpose({
  fetchNotes
})

const handleEdit = (note: Note) => {
  editingNote.value = note
  editForm.value = {
    title: note.title,
    content: note.content
  }
}

const handleUpdate = async () => {
  if (!editingNote.value) return

  try {
    await noteSchema.validate(editForm.value)
    await notesApi.updateNote({
      id: editingNote.value.id,
      ...editForm.value
    })
    await fetchNotes()
    cancelEdit()
  } catch (error) {
    console.error('Failed to update note:', error)
  }
}

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this note?')) return

  try {
    await notesApi.deleteNote(id)
    await fetchNotes()
  } catch (error) {
    console.error('Failed to delete note:', error)
  }
}

const cancelEdit = () => {
  editingNote.value = null
  editForm.value = {
    title: '',
    content: ''
  }
}

onMounted(fetchNotes)
</script> 
