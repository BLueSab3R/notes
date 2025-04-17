<template>
  <div class="space-y-8">
    <CreateNoteForm @created="refreshNotes" />
    <NoteList ref="noteListRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NoteList from '../components/NoteList.vue'
import CreateNoteForm from '../components/CreateNoteForm.vue'

const noteListRef = ref<InstanceType<typeof NoteList> | null>(null)

const refreshNotes = () => {
  noteListRef.value?.fetchNotes()
}
</script> 
