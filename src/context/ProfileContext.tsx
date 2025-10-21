'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUser } from '@/lib/mock-data';

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
}

interface ProfileContextType {
    profile: Profile;
    updateAvatar: (url: string) => void;
    updateBanner: (url: string) => void;
    updateProfile: (updates: Partial<Omit<Profile, 'id' | 'avatarUrl' | 'bannerUrl'>>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const initialProfile: Profile = {
    id: mockUser.username,
    name: mockUser.name,
    handle: `@${mockUser.username}`,
    avatarUrl: mockUser.avatarUrl || 'https://placehold.co/128x128.png',
    dataAiHint: 'user avatar',
    bannerUrl: mockUser.channelBannerUrl || 'https://placehold.co/1080x240.png',
    bannerHint: 'abstract gaming',
    description: mockUser.description,
    email: 'srbrolive99@gmail.com',
    links: [{ title: 'Instagram', url: 'https://instagram.com/srbrolive99' }]
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<Profile>(initialProfile);

    const updateAvatar = (url: string) => {
        setProfile(p => ({ ...p, avatarUrl: url }));
    };

    const updateBanner = (url: string) => {
        setProfile(p => ({ ...p, bannerUrl: url }));
    };
    
    const updateProfile = (updates: Partial<Omit<Profile, 'id' | 'avatarUrl' | 'bannerUrl'>>) => {
        setProfile(p => ({ ...p, ...updates }));
    };

    return (
        <ProfileContext.Provider value={{ profile, updateAvatar, updateBanner, updateProfile }}>
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
