import { mockVideos } from '@/lib/mock-data';
import { VideoCard } from '@/components/video-card';

export default function ChannelVideosPage() {
  return (
    <div>
      <h2 className="text-2xl font-headline font-bold mb-4">All Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {[...mockVideos, ...mockVideos].map((video, index) => (
          <VideoCard key={`${video.id}-${index}`} video={video} />
        ))}
      </div>
    </div>
  );
}
