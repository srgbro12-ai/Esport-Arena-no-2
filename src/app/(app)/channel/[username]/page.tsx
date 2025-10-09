import React, { Suspense } from 'react';
import ChannelPageComponent from './channel-page-client';

// This is now a Server Component. It can fetch data.
export default function Page({ params }: { params: { username: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChannelPageComponent channelId={params.username} />
    </Suspense>
  );
}
