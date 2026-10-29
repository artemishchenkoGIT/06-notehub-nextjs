import { Note, CreateNote, NoteTag } from '@/types/note';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;
const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL as string;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

interface NoteSearchResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search?: string,
  page: number = 1,
  tag?: NoteTag
): Promise<NoteSearchResponse> {
  const { data } = await axios.get<NoteSearchResponse>('api/notes', {
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
  const { data } = await axios.get<Note>('api/notes/' + id);
  return data;
}

export async function createNote(note: CreateNote): Promise<Note> {
  const { data } = await axios.post<Note>('api/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>('api/notes/' + id);
  return data;
}
