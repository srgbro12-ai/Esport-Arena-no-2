
import { ReactNode } from 'react';
import { ProfileProvider } from '@/context/ProfileContext';
import { initializeFirebase } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
        // In a real app, you might want to handle this more gracefully
        // For now, we return null, and the page will show a "not found" state.
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
    const targetUser = await getTargetUser(params.username);
    
    return (
        <ProfileProvider initialTargetUser={targetUser}>
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </ProfileProvider>
    );
}
