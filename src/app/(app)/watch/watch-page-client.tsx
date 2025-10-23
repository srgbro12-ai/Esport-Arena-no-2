
'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useContent } from '@/context/content-context';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from 'lucide-react';
import { VideoCard } from '@/components/video-card';
import Link from 'next/link';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function WatchPageClient() {
    const searchParams = useSearchParams();
    const videoId = searchParams.get('v');
    const { videos, shorts } = useContent();
    const firestore = useFirestore();

    const allVideos = [...videos, ...shorts];
    const currentVideo = allVideos.find(v => v.id === videoId);

    const channelDocRef = useMemoFirebase(() => {
        if (!firestore || !currentVideo?.channelId) return null;
        return doc(firestore, 'users', currentVideo.channelId);
    }, [firestore, currentVideo?.channelId]);

    const { data: channelUser, isLoading: isChannelLoading } = useDoc(channelDocRef);

    const suggestedVideos = allVideos.filter(v => v.id !== videoId);

    if (!currentVideo) {
        return <div className="flex-1 text-center p-10">Video not found.</div>;
    }
    
    const getChannelInfo = () => {
        if (isChannelLoading) {
            return { name: 'Loading...', avatarUrl: '', subscribers: '...', username: '' };
        }
        if (channelUser) {
            const num = channelUser.subscriberCount || 0;
            const formatSubscribers = (num: number) => {
                if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
                if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
                return Math.floor(num).toLocaleString();
            };
            return {
                name: channelUser.displayName,
                avatarUrl: channelUser.avatarUrl || 'https://placehold.co/48x48.png',
                subscribers: formatSubscribers(num),
                username: channelUser.username,
            };
        }
        return {
            name: currentVideo.channelId,
            avatarUrl: 'https://placehold.co/48x48.png',
            subscribers: '0',
            username: currentVideo.channelId,
        };
    };

    const channelInfo = getChannelInfo();

    const videoSrc = currentVideo.thumbnailUrl ? currentVideo.thumbnailUrl.replace(/(\d+)\/(\d+)/, '1280/720') : 'https://placehold.co/1280x720.png';


    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6">
            <div className="flex-1">
                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                     {currentVideo.isShort ? (
                        <video src={videoSrc} controls className="w-full h-full object-contain" />
                     ) : (
                        <video src={videoSrc} controls className="w-full h-full object-cover" />
                     )}
                </div>
                <h1 className="text-xl font-bold mb-2">{currentVideo.title}</h1>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                         <Link href={`/channel/${channelInfo.username}`}>
                            <Avatar>
                                <AvatarImage src={channelInfo.avatarUrl} />
                                <AvatarFallback>{channelInfo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div>
                            <Link href={`/channel/${channelInfo.username}`} className="font-semibold hover:underline">{channelInfo.name}</Link>
                            <p className="text-xs text-muted-foreground">{channelInfo.subscribers} subscribers</p>
                        </div>
                        <Button variant="secondary" className='ml-4'>Subscribe</Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" className="flex items-center gap-2">
                            <ThumbsUp className="h-5 w-5" /> {currentVideo.likeCount.toLocaleString()}
                        </Button>
                         <Button variant="ghost">
                            <ThumbsDown className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <Share2 className="h-5 w-5" /> Share
                        </Button>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <Download className="h-5 w-5" /> Download
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                 <div className="bg-secondary p-4 rounded-xl mt-4">
                    <p className="text-sm font-semibold">{currentVideo.views} views  &bull;  {currentVideo.posted}</p>
                    <p className="text-sm mt-2">
                        This is a placeholder description for the video. In a real application, this would be the actual video description, potentially with links and hashtags.
                    </p>
                </div>
                
                {/* Comments Section Placeholder */}
                <div className="mt-6">
                    <h2 className="text-lg font-bold mb-4">Comments</h2>
                    <div className="text-center text-muted-foreground py-8 bg-secondary rounded-lg">
                        <p>Comments are coming soon!</p>
                    </div>
                </div>

            </div>
            <div className="lg:w-96 flex-shrink-0">
                <h2 className="text-lg font-bold mb-4">Up next</h2>
                <div className="space-y-4">
                    {suggestedVideos.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    )
}
