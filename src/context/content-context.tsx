'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockVideos } from '@/lib/mock-data';
import { formatDistanceToNow } from 'date-fns';

interface Video {
    id: string;
    title: string;
    views: string;
    posted: string;
    postedDate: Date;
    thumbnailUrl?: string;
    hint?: string;
    channelId: string;
    isLive?: boolean;
}

interface Short {
    id: string;
    title: string;
    views: string;
    posted: string;
    postedDate: Date;
    thumbnailUrl?: string;
    hint?: string;
    channelId: string;
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
    addVideo: (video: Omit<Video, 'id' | 'views' | 'posted' | 'postedDate'>) => void;
    addShort: (short: Omit<Short, 'id' | 'views' | 'posted' | 'postedDate'>) => void;
    addPost: (post: Omit<Post, 'id' | 'posted' | 'postedDate'>) => void;
    addPlaylist: (title: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
    const [videos, setVideos] = useState<Video[]>(mockVideos.map(v => ({...v, channelId: 'srbrolive99', postedDate: new Date() })));
    const [shorts, setShorts] = useState<Short[]>(mockVideos.map(v => ({...v, id: `s-${v.id}`, channelId: 'srbrolive99', postedDate: new Date() })));
    const [posts, setPosts] = useState<Post[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const addVideo = (video: Omit<Video, 'id' | 'views' | 'posted' | 'postedDate'>) => {
        const newVideo: Video = {
            ...video,
            id: `v${videos.length + 1}`,
            views: '0',
            posted: 'just now',
            postedDate: new Date(),
        };
        setVideos(prev => [newVideo, ...prev]);
    };
    
    const addShort = (short: Omit<Short, 'id' | 'views' | 'posted' | 'postedDate'>) => {
        const newShort: Short = {
            ...short,
            id: `s${shorts.length + 1}`,
            views: '0',
            posted: 'just now',
            postedDate: new Date(),
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
        <ContentContext.Provider value={{ videos, shorts, posts, playlists, addVideo, addShort, addPost, addPlaylist }}>
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
