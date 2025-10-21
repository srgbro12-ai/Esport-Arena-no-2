'use client';

import React from 'react';
import { useContent } from '@/context/content-context';
import { VideoCard } from '@/components/video-card';

export default function HomePage() {
  const { videos, shorts } = useContent();

  const allVideos = [...videos, ...shorts].sort(
    (a, b) => b.postedDate.getTime() - a.postedDate.getTime()
  );

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {allVideos.map((video, index) => (
          <VideoCard key={`${video.id}-${index}`} video={video} />
        ))}
      </div>
    </main>
  );
}
