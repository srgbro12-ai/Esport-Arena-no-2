import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder | undefined => PlaceHolderImages.find(img => img.id === id);

export const mockUser = {
  name: 'SRB-Robin',
  username: 'srbrolive99',
  avatarUrl: getImage('user-avatar-1')?.imageUrl,
  channelBannerUrl: getImage('channel-banner-1')?.imageUrl,
  subscribers: '1.2M',
  videoCount: 157,
  isVerified: true,
  description: 'Official channel for SRB-Robin. Pro gamer, content creator, and streamer. Join my journey to the top!\nFollow me on Instagram: instagram.com/srbrolive99',
};

export const mockTournaments = [
  {
    id: '1',
    game: 'BGMI',
    title: 'BGMI Ultimate Showdown',
    mode: 'Squad',
    prize: '1,00,000',
    entryFee: '1000',
    date: '2024-08-15T18:00:00Z',
    coverUrl: getImage('game-cover-bgmi')?.imageUrl,
    hint: getImage('game-cover-bgmi')?.imageHint
  },
  {
    id: '2',
    game: 'COD Mobile',
    title: 'COD Mobile Pro League',
    mode: 'Solo',
    prize: '50,000',
    entryFee: '500',
    date: '2024-08-18T20:00:00Z',
    coverUrl: getImage('game-cover-cod')?.imageUrl,
    hint: getImage('game-cover-cod')?.imageHint
  },
  {
    id: '3',
    game: 'Free Fire',
    title: 'Free Fire Grand Masters',
    mode: 'Duo',
    prize: '75,000',
    entryFee: 'Free',
    date: '2024-08-20T16:00:00Z',
    coverUrl: getImage('game-cover-freefire')?.imageUrl,
    hint: getImage('game-cover-freefire')?.imageHint
  },
  {
    id: '4',
    game: 'Custom Game',
    title: 'Community Clash',
    mode: 'Squad',
    prize: '10,000',
    entryFee: '100',
    date: '2024-08-22T19:00:00Z',
    coverUrl: getImage('game-cover-custom')?.imageUrl,
    hint: getImage('game-cover-custom')?.imageHint
  },
];

export const mockLeaderboard = [
  { rank: 1, name: 'Team SouL', points: 1540, avatarUrl: getImage('user-avatar-2')?.imageUrl },
  { rank: 2, name: 'GodLike Esports', points: 1490, avatarUrl: getImage('user-avatar-1')?.imageUrl },
  { rank: 3, name: 'TSM Entity', points: 1450, avatarUrl: getImage('user-avatar-2')?.imageUrl },
  { rank: 4, name: 'SRB-Robin', points: 1380, avatarUrl: mockUser.avatarUrl },
  { rank: 5, name: 'ScoutOP', points: 1350, avatarUrl: getImage('user-avatar-1')?.imageUrl },
];

export const mockStoreItems = {
  digital: [
    { id: 'd1', name: 'Mythic Weapon Skin', price: 2500, imageUrl: getImage('store-item-digital-1')?.imageUrl, hint: getImage('store-item-digital-1')?.imageHint },
    { id: 'd2', name: 'Legendary Operator', price: 2000, imageUrl: getImage('store-item-digital-1')?.imageUrl, hint: getImage('store-item-digital-1')?.imageHint },
    { id: 'd3', name: 'Battle Pass Tier Skip x10', price: 800, imageUrl: getImage('store-item-digital-1')?.imageUrl, hint: getImage('store-item-digital-1')?.imageHint },
  ],
  physical: [
    { id: 'p1', name: 'Pro Gaming Headset', price: 7999, imageUrl: getImage('store-item-physical-1')?.imageUrl, hint: getImage('store-item-physical-1')?.imageHint },
    { id: 'p2', name: 'Mechanical Keyboard', price: 12000, imageUrl: getImage('store-item-physical-1')?.imageUrl, hint: getImage('store-item-physical-1')?.imageHint },
    { id: 'p3', name: 'Esport Arena Jersey', price: 2499, imageUrl: getImage('store-item-physical-1')?.imageUrl, hint: getImage('store-item-physical-1')?.imageHint },
  ],
};

export const mockVideos = [
    { id: 'v1', title: 'INSANE 1v4 Clutch to Win the Game!', views: '2.1M', posted: '2 days ago', thumbnailUrl: getImage('video-thumbnail-1')?.imageUrl, hint: getImage('video-thumbnail-1')?.imageHint },
    { id: 'v2', title: 'My New Streaming & Gaming Setup Tour 2024', views: '890K', posted: '1 week ago', thumbnailUrl: getImage('video-thumbnail-2')?.imageUrl, hint: getImage('video-thumbnail-2')?.imageHint },
    { id: 'v3', title: 'Road to Global: Episode 1', views: '1.5M', posted: '2 weeks ago', thumbnailUrl: getImage('video-thumbnail-1')?.imageUrl, hint: getImage('video-thumbnail-1')?.imageHint },
]
