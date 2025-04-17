import type { Note, CreateNoteDTO, UpdateNoteDTO } from '../../entities/note/model/types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const notes: Note[] = []

export const notesApi = {
  async getAllNotes(): Promise<Note[]> {
    await delay(500)
    return [...notes]
  },

  async createNote(dto: CreateNoteDTO): Promise<Note> {
    await delay(500)
    const newNote: Note = {
      id: crypto.randomUUID(),
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    notes.push(newNote)
    return { ...newNote }
  },

  async updateNote(dto: UpdateNoteDTO): Promise<Note> {
    await delay(500)
    const noteIndex = notes.findIndex(note => note.id === dto.id)
    if (noteIndex === -1) throw new Error('Note not found')

    const updatedNote = {
      ...notes[noteIndex],
      ...dto,
      updatedAt: new Date()
    }
    notes[noteIndex] = updatedNote
    return { ...updatedNote }
  },

  async deleteNote(id: string): Promise<void> {
    await delay(500)
    const index = notes.findIndex(note => note.id === id)
    if (index !== -1) {
      notes.splice(index, 1)
    }
  }
} 
