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
    </div>
  );
}
