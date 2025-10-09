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
            <div className="sticky top-14 z-20 bg-background/95 backdrop-blur-sm border-b border-border mt-6">
                <div className="px-4 md:px-8 overflow-x-auto">
                    <nav className="flex items-center space-x-4 md:space-x-6 -mb-px">
                        {TABS.map((tab) => (
                            <Link
                                key={tab.name}
                                href={`/channel/${username}${tab.href}`}
                                className={cn(
                                    "py-3 px-1 border-b-2 whitespace-nowrap text-sm font-medium",
                                    getIsActive(tab.href)
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/50'
                                )}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
            <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
    );
}
