import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useContent } from '@/context/content-context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockUser, mockLeaderboard } from '@/lib/mock-data';

type VideoCardProps = {
  video: {
    id: string;
    title: string;
    views: string;
    posted: string;
    thumbnailUrl?: string;
    dataAiHint?: string;
    channelId: string;
    isShort?: boolean;
  };
};

const getChannelInfo = (channelId: string) => {
    if (channelId === mockUser.username) {
        return {
            name: mockUser.name,
            avatarUrl: mockUser.avatarUrl,
        }
    }
    
    const leaderboardUser = mockLeaderboard.find(u => u.name === channelId);
    if(leaderboardUser) {
        return {
            name: leaderboardUser.name,
            avatarUrl: leaderboardUser.avatarUrl
        }
    }
    
    // In a real app, you'd fetch this from a DB
    return {
        name: channelId,
        avatarUrl: 'https://placehold.co/40x40.png'
    }
}


export function VideoCard({ video }: VideoCardProps) {
  const channelInfo = getChannelInfo(video.channelId);

  return (
    <Link href={`/watch?v=${video.id}`} className="group block">
        <Card className="overflow-hidden border-transparent bg-transparent shadow-none">
            <CardContent className="p-0">
            <div className={`${video.isShort ? 'aspect-[9/16]' : 'aspect-video'} relative overflow-hidden rounded-lg`}>
                {video.thumbnailUrl && (
                <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={video.dataAiHint}
                />
                )}
            </div>
            </CardContent>
        </Card>
        <div className="mt-3 flex gap-3">
            <Link href={`/channel/${video.channelId}`} className="flex-shrink-0">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={channelInfo.avatarUrl} />
                    <AvatarFallback>{channelInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </Link>
            <div>
                <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">{video.title}</h3>
                <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                    <p className="hover:underline">{channelInfo.name}</p>
                    <p>
                        {video.views} views &middot; {video.posted}
                    </p>
                </div>
            </div>
        </div>
    </Link>
  );
}
