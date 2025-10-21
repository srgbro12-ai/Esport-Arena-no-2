'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockVideos, mockUser } from '@/lib/mock-data';
import { formatDistanceToNow } from 'date-fns';

interface Video {
    id: string;
    title: string;
    views: string;
    posted: string;
    postedDate: Date;
    thumbnailUrl?: string;
    dataAiHint?: string;
    channelId: string;
    isLive?: boolean;
    isShort?: boolean;
    likeCount: number;
}

interface Short {
    id: string;
    title: string;
    views: string;
    posted: string;
    postedDate: Date;
    thumbnailUrl?: string;
    dataAiHint?: string;
    channelId: string;
    isShort?: boolean;
    likeCount: number;
}

interface Post {
    id: string;
    content: string;
    posted: string;
    postedDate: Date;
    channelId: string;
}


interface Playlist {
    id: string;
    title: string;
}

interface ContentContextType {
    videos: Video[];
    shorts: Short[];
    posts: Post[];
    playlists: Playlist[];
    addVideo: (video: Omit<Video, 'id' | 'views' | 'posted' | 'postedDate' | 'likeCount'>) => void;
    addShort: (short: Omit<Short, 'id' | 'views' | 'posted' | 'postedDate' | 'likeCount'>) => void;
    addPost: (post: Omit<Post, 'id' | 'posted' | 'postedDate'>) => void;
    addPlaylist: (title: string) => void;
    getSubscriberCount: (channelId: string) => number;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const otherChannels = ['GodLike Esports', 'TSM Entity', 'ScoutOP', 'Mortal'];

export const ContentProvider = ({ children }: { children: ReactNode }) => {
    const [videos, setVideos] = useState<Video[]>(mockVideos.map((v, i) => ({...v, channelId: i % 2 === 0 ? mockUser.username : otherChannels[i % otherChannels.length], postedDate: new Date(new Date().getTime() - Math.random() * 1000 * 60 * 60 * 24 * 14), likeCount: Math.floor(Math.random() * 10000) })));
    const [shorts, setShorts] = useState<Short[]>(mockVideos.map((v, i) => ({...v, id: `s-${v.id}`, channelId: i % 2 !== 0 ? mockUser.username : otherChannels[i % otherChannels.length], postedDate: new Date(new Date().getTime() - Math.random() * 1000 * 60 * 60 * 24 * 7), isShort: true, likeCount: Math.floor(Math.random() * 5000) })));
    const [posts, setPosts] = useState<Post[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    
    const [subscriberCounts, setSubscriberCounts] = useState<Record<string, number>>({
        [mockUser.username]: 1200000,
        'GodLike Esports': 5400000,
        'TSM Entity': 3200000,
        'ScoutOP': 4800000,
        'Mortal': 7100000,
    });

    const getSubscriberCount = (channelId: string) => {
        return subscriberCounts[channelId] || 0;
    }

    const addVideo = (video: Omit<Video, 'id' | 'views' | 'posted' | 'postedDate' | 'likeCount'>) => {
        const postedDate = new Date();
        const newVideo: Video = {
            ...video,
            id: `v${videos.length + 1}`,
            views: '0',
            posted: formatDistanceToNow(postedDate, { addSuffix: true }),
            postedDate,
            likeCount: 0,
        };
        setVideos(prev => [newVideo, ...prev]);
    };
    
    const addShort = (short: Omit<Short, 'id' | 'views' | 'posted' | 'postedDate' | 'likeCount'>) => {
        const postedDate = new Date();
        const newShort: Short = {
            ...short,
            id: `s${shorts.length + 1}`,
            views: '0',
            posted: formatDistanceToNow(postedDate, { addSuffix: true }),
            postedDate,
            isShort: true,
            likeCount: 0
        };
        setShorts(prev => [newShort, ...prev]);
    };

    const addPost = (post: Omit<Post, 'id' | 'posted'|'postedDate'>) => {
        const postedDate = new Date();
        const newPost: Post = {
            ...post,
            id: `p${posts.length + 1}`,
            posted: formatDistanceToNow(postedDate, { addSuffix: true }),
            postedDate,
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const addPlaylist = (title: string) => {
        const newPlaylist: Playlist = {
            id: `pl-${playlists.length + 1}`,
            title,
        };
        setPlaylists(prev => [...prev, newPlaylist]);
    };

    return (
        <ContentContext.Provider value={{ videos, shorts, posts, playlists, addVideo, addShort, addPost, addPlaylist, getSubscriberCount }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
