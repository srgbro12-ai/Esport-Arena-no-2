import { mockVideos } from '@/lib/mock-data';
import { VideoCard } from '@/components/video-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockUser } from '@/lib/mock-data';

export default function ChannelHomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">Latest Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {mockVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">Community Posts</h2>
        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                 <Avatar className="w-10 h-10">
                    {mockUser.avatarUrl && <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />}
                    <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{mockUser.name} <span className="text-muted-foreground font-normal text-sm">@srbrolive99 &middot; 2 hours ago</span></p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">
                    New tournament announcement coming soon! 🔥
                    Get your squads ready for the biggest BGMI event of the year. Prize pool is MASSIVE. 
                    
                    Who do you think will take home the trophy? Let me know in the comments! #EsportArena #BGMI #Tournament
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
