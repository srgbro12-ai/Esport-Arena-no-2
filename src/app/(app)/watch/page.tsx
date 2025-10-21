import React, { Suspense } from 'react';
import WatchPageClient from './watch-page-client';

export default function WatchPage() {
  return (
    <Suspense fallback={<div>Loading video...</div>}>
      <WatchPageClient />
    </Suspense>
  );
}
