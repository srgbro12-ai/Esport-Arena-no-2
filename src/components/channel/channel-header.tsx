'use client';

import Image from 'next/image';
import { BadgeCheck, Instagram, Link as LinkIcon, PlusSquare, Radio, Upload, Search } from 'lucide-react';
import { mockUser } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ChannelHeader() {
  const { name, username, avatarUrl, channelBannerUrl, subscribers, videoCount, isVerified, description } = mockUser;

  // Function to find and linkify URLs
  const linkifyDescription = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        const isInstagram = part.includes('instagram.com');
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
            {isInstagram && <Instagram className="w-4 h-4" />}
            {!isInstagram && <LinkIcon className="w-4 h-4" />}
            <span>{part.replace(/https?:\/\//, '')}</span>
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full">
      <div className="relative h-40 md:h-60 bg-secondary">
        {channelBannerUrl && (
          <Image
            src={channelBannerUrl}
            alt={`${name}'s channel banner`}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            data-ai-hint="abstract gaming"
          />
        )}
      </div>

      <div className="px-4 md:px-8 -mt-12 md:-mt-16 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback className="text-4xl">{name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-4xl font-headline font-bold truncate">{name}</h1>
              {isVerified && <BadgeCheck className="w-6 h-6 text-primary" />}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span>@{username}</span>
              <span>{subscribers} subscribers</span>
              <span>{videoCount} videos</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button>Subscribe</Button>
            <Button variant="secondary">Join</Button>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground max-w-3xl whitespace-pre-wrap">
          {linkifyDescription(description)}
        </div>
      </div>
    </div>
  );
}
