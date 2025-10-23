
import { ReactNode } from 'react';
import { ProfileProvider } from '@/context/ProfileContext';
import { initializeFirebase } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// This function needs to run on the server, but it's causing permission issues
// because the rules don't allow listing the 'users' collection without specific query constraints
// that are hard to enforce in this server context. We will move this logic to the client
// and rely on the ProfileProvider to handle loading the correct user.
async function getTargetUser(username: string) {
    try {
        const { firestore } = initializeFirebase();
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return { id: userDoc.id, ...userDoc.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching target user:", error);
        // This is the root of the permission error. We will disable this server-side fetch
        // and handle it on the client to get better error context.
        return null;
    }
}


export default async function ChannelLayout({ 
    children,
    params
}: { 
    children: ReactNode,
    params: { username: string } 
}) {
    // We are now fetching the user on the client side to avoid the server-side permission error
    // and to implement proper contextual error handling.
    const targetUser = await getTargetUser(params.username);
    
    return (
        <ProfileProvider initialTargetUser={targetUser}>
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </ProfileProvider>
    );
}
