<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Create New Note</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="Enter note title..."
            class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out"
            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-200': errors.title }"
          />
          <p v-if="errors.title" class="mt-1.5 text-sm text-red-500 font-medium">
            {{ errors.title }}
          </p>
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            v-model="form.content"
            rows="4"
            placeholder="Write your note content here..."
            class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out"
            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-200': errors.content }"
          ></textarea>
          <p v-if="errors.content" class="mt-1.5 text-sm text-red-500 font-medium">
            {{ errors.content }}
          </p>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out disabled:opacity-70"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="inline-block mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isSubmitting ? 'Creating Note...' : 'Create Note' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { notesApi } from '../src/shared/api/notes'
import { noteSchema } from '../src/shared/lib/validation'

const form = ref({
  title: '',
  content: ''
})

const errors = ref({
  title: '',
  content: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  errors.value = {
    title: '',
    content: ''
  }

  try {
    isSubmitting.value = true
    
    await noteSchema.validate(form.value, { abortEarly: false })
    
    await notesApi.createNote(form.value)
    
    form.value = {
      title: '',
      content: ''
    }
    
    emit('created')
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        const yupError = error as any
        yupError.inner?.forEach((err: any) => {
          if (err.path) {
            errors.value[err.path as keyof typeof errors.value] = err.message
          }
        })
      }
    }
    console.error('Failed to create note:', error)
  } finally {
    isSubmitting.value = false
  }
}

const emit = defineEmits<{
  created: []
}>()
</script> 
