import { Note, CreateNote, NoteTag } from '@/types/note';
import $host from './index';

interface NoteSearchResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search?: string,
  page: number = 1,
  tag?: NoteTag
): Promise<NoteSearchResponse> {
  const { data } = await $host.get<NoteSearchResponse>('api/notes', {
    params: {
      ...(search && { search }),
      ...(tag && { tag }),
      page,
      perPage: 10,
      sortBy: 'created',
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await $host.get<Note>('api/notes/' + id);
  return data;
}

export async function createNote(note: CreateNote): Promise<Note> {
  const { data } = await $host.post<Note>('api/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await $host.delete<Note>('api/notes/' + id);
  return data;
}
