
'use client';

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface Link {
    title: string;
    url: string;
}

interface Profile {
    id: string;
    name: string;
    handle: string;
    avatarUrl: string;
    dataAiHint: string;
    bannerUrl: string;
    bannerHint: string;
    description: string;
    email: string;
    links: Link[];
    dob: string;
    gender: string;
}

interface ProfileContextType {
    profile: Profile;
    setProfile: Dispatch<SetStateAction<Profile>>;
    updateAvatar: (url: string) => void;
    updateBanner: (url: string) => void;
    updateProfile: (updates: Partial<Omit<Profile, 'id'>>) => void;
    targetUser: any,
    setTargetUser: Dispatch<SetStateAction<any>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const initialProfile: Profile = {
    id: '',
    name: '',
    handle: '',
    avatarUrl: 'https://placehold.co/128x128.png',
    dataAiHint: 'user avatar',
    bannerUrl: 'https://placehold.co/1080x240.png',
    bannerHint: 'abstract gaming',
    description: '',
    email: '',
    links: [],
    dob: '',
    gender: '',
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<Profile>(initialProfile);
    const [targetUser, setTargetUser] = useState(null);
    const { user: currentUser } = useUser();
    const firestore = useFirestore();

    useEffect(() => {
        if (currentUser && firestore) {
            const userRef = doc(firestore, 'users', currentUser.uid);
            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setProfile(prev => ({
                        ...prev,
                        id: docSnap.id,
                        name: userData.displayName || '',
                        handle: userData.username ? `@${userData.username}` : '',
                        avatarUrl: userData.avatarUrl || prev.avatarUrl,
                        bannerUrl: userData.bannerUrl || prev.bannerUrl,
                        description: userData.description || '',
                        email: userData.email || '',
                        links: userData.links || [],
                        dob: userData.dob || '',
                        gender: userData.gender || '',
                    }));
                }
            });
            return () => unsubscribe();
        } else {
            setProfile(initialProfile);
        }
    }, [currentUser, firestore]);

    const updateAvatar = (url: string) => {
        setProfile(p => ({ ...p, avatarUrl: url }));
    };

    const updateBanner = (url: string) => {
        setProfile(p => ({ ...p, bannerUrl: url }));
    };
    
    const updateProfile = (updates: Partial<Omit<Profile, 'id'>>) => {
        setProfile(p => ({ ...p, ...updates }));
    };

    return (
        <ProfileContext.Provider value={{ profile, setProfile, updateAvatar, updateBanner, updateProfile, targetUser, setTargetUser }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
