import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

export const useFetchNotes = (query: string, page: number, tag?: NoteTag) => {
  return useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
  });
};
