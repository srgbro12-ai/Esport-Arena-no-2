
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';


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

const getChannelInfo = (channelId: string, user: any | null) => {
    if (user) {
        return {
            name: user.displayName,
            avatarUrl: user.avatarUrl || 'https://placehold.co/40x40.png',
        }
    }
    
    // Fallback or loading state
    return {
        name: 'Loading...',
        avatarUrl: 'https://placehold.co/40x40.png'
    }
}


export function VideoCard({ video }: VideoCardProps) {
  const firestore = useFirestore();
  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !video.channelId) return null;
    return doc(firestore, 'users', video.channelId);
  }, [firestore, video.channelId]);

  const { data: user } = useDoc(userDocRef);
  
  const channelInfo = getChannelInfo(video.channelId, user);
  const router = useRouter();

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const username = user?.username || video.channelId;
    router.push(`/channel/${username}`);
  };

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
            <div onClick={handleAvatarClick} className="flex-shrink-0 cursor-pointer">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={channelInfo.avatarUrl} />
                    <AvatarFallback>{channelInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
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
