import { Suspense } from 'react';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/UI/Loader/Loader';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

async function NoteDetailsContent({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default function NoteDetails({ params }: NoteDetailsProps) {
  return (
    <Suspense fallback={<Loader />}>
      <NoteDetailsContent params={params} />
    </Suspense>
  );
}
