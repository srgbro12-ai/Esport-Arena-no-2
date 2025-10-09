'use client';
import { ReactNode } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChannelHeader } from '@/components/channel/channel-header';
import { cn } from '@/lib/utils';

const TABS = [
    { name: 'Home', href: '' },
    { name: 'Videos', href: '/videos' },
    { name: 'Shorts', href: '/shorts' },
    { name: 'Live', href: '/live' },
    { name: 'Playlists', href: '/playlists' },
    { name: 'Posts', href: '/posts' },
    { name: 'Membership', href: '/membership' },
    { name: 'Game IDs', href: '/game-ids' },
    { name: 'Account', href: '/account' },
];

export default function ChannelLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const params = useParams();
    const username = params.username as string;

    const getIsActive = (href: string) => {
        const basePath = `/channel/${username}`;
        const fullHref = `${basePath}${href}`;
        if (href === '') {
            return pathname === basePath;
        }
        return pathname.startsWith(fullHref);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <ChannelHeader />
            <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
    );
}
