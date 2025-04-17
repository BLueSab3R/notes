export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteDTO {
  title: string;
  content: string;
}

export interface UpdateNoteDTO extends CreateNoteDTO {
  id: string;
} 
