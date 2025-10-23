
import { ReactNode } from 'react';
import { ProfileProvider } from '@/context/ProfileContext';

// We no longer need to fetch data on the server for this layout.
// All data fetching logic is now handled on the client in the
// ChannelPageComponent to allow for proper contextual error handling.

export default async function ChannelLayout({ 
    children,
}: { 
    children: ReactNode,
}) {
    return (
        // The initialTargetUser prop is no longer needed as the client component handles fetching.
        <ProfileProvider>
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </ProfileProvider>
    );
}

    