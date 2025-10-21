'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle,
  RadioTower,
  Gem,
  Upload,
  PenSquare,
  Rocket,
  UserPlus,
  Camera,
  Edit,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { VideoCard } from '@/components/video-card';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { mockUser } from '@/lib/mock-data';
import { useContent } from '@/context/content-context';

const getChannelData = (channelId: string, allContent: any[], getSubscriberCount: (id: string) => number) => {
    const channelContent = allContent.filter(c => c.channelId === channelId);
    if (channelContent.length === 0 && channelId !== mockUser.username) return null;

    const firstChannelVideo = channelContent.length > 0 ? channelContent[0] : { channel: channelId, avatarUrl: 'https://placehold.co/128x128.png', dataAiHint: 'channel logo', isVerified: false };
    
    const subscribers = getSubscriberCount(channelId);

    const formatSubscribers = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return Math.floor(num).toLocaleString();
    };

    if (channelId === mockUser.username) {
        return {
            id: channelId,
            name: mockUser.name,
            handle: `@${mockUser.username}`,
            avatarUrl: mockUser.avatarUrl,
            dataAiHint: 'user avatar',
            bannerUrl: mockUser.channelBannerUrl,
            bannerHint: 'abstract gaming',
            subscribers: `${formatSubscribers(subscribers)} Subscribers`,
            videoCount: allContent.filter(c => c.channelId === channelId).length,
            isVerified: mockUser.isVerified,
            description: mockUser.description,
            links: [{title: 'Instagram', url: 'https://instagram.com/srbrolive99'}],
        }
    }

    return {
        id: channelId,
        name: firstChannelVideo.channel,
        handle: `@${firstChannelVideo.channel.toLowerCase().replace(/\s+/g, '')}`,
        avatarUrl: firstChannelVideo?.avatarUrl || 'https://placehold.co/128x128.png',
        dataAiHint: firstChannelVideo?.dataAiHint || 'channel logo',
        bannerUrl: 'https://placehold.co/1080x240.png',
        bannerHint: 'abstract background',
        subscribers: `${formatSubscribers(subscribers)} Subscribers`,
        videoCount: channelContent.length,
        isVerified: !!firstChannelVideo?.isVerified,
        description: `Welcome to the official channel of ${firstChannelVideo.channel}!`,
        links: [],
    }
}


export default function ChannelPageComponent({ channelId }: { channelId: string }) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams ? searchParams.get('tab') || 'home' : 'home';
  const { toast } = useToast();
  
  const [liveSubscriberCount, setLiveSubscriberCount] = useState(1200000);
  const { videos, shorts, posts } = useContent();

  const isYouPage = channelId === mockUser.username;

  const channelData = getChannelData(channelId!, [...videos, ...shorts], () => 1200000);

   useEffect(() => {
    if (isYouPage) {
        setLiveSubscriberCount(1200000);
        const interval = setInterval(() => {
            setLiveSubscriberCount(prev => prev + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0));
        }, 2000);
        return () => clearInterval(interval);
    }
   }, [isYouPage]);

  if (!channelData) {
      return <div className="text-center p-10">Channel not found.</div>;
  }
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const channelVideos = videos.filter(video => video.channelId === channelId);
  const channelShorts = shorts.filter(short => short.channelId === channelId);
  const channelPosts = posts.filter(post => post.channelId === channelId);
  const channelLiveStreams = videos.filter(video => video.channelId === channelId && video.isLive);

  const myAllVideos = [...channelVideos, ...channelShorts, ...channelLiveStreams].sort((a,b) => b.postedDate.getTime() - a.postedDate.getTime());

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({ title: 'Profile picture updated!' });
    }
  };
  
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       toast({ title: 'Channel banner updated!' });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
        <div className="relative h-48 w-full bg-secondary rounded-xl mb-4">
            {channelData.bannerUrl && <Image src={channelData.bannerUrl} alt="Channel Banner" fill className="object-cover rounded-xl" data-ai-hint={channelData.bannerHint} />}
            {isYouPage && (
                <>
                    <div 
                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-xl"
                    onClick={() => bannerInputRef.current?.click()}
                    >
                    <Edit className="h-8 w-8 text-white" />
                    </div>
                    <input 
                    type="file"
                    ref={bannerInputRef}
                    onChange={handleBannerChange}
                    className="hidden"
                    accept="image/*"
                    />
                </>
            )}
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 -mt-16 sm:-mt-14">
            <div 
                className={cn("relative group flex-shrink-0", isYouPage && "cursor-pointer")}
                onClick={() => isYouPage && avatarInputRef.current?.click()}
            >
                <Avatar className="w-32 h-32 border-8 border-background bg-background">
                    {channelData.avatarUrl && <AvatarImage src={channelData.avatarUrl} alt={channelData.name} data-ai-hint={channelData.dataAiHint} />}
                    <AvatarFallback>{channelData.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {isYouPage && (
                    <>
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-8 w-8 text-white" />
                        </div>
                        <input 
                        type="file"
                        ref={avatarInputRef}
                        onChange={handleAvatarChange}
                        className="hidden"
                        accept="image/*"
                        />
                    </>
                )}
            </div>

            <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-center text-center sm:text-left pt-16 sm:pt-14">
                <div className="mt-2">
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <h1 className="text-3xl font-bold">{channelData.name}</h1>
                    {channelData.isVerified && <CheckCircle className="text-blue-400 text-xl" />}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-x-2 text-muted-foreground mt-1 text-sm">
                    <span>{channelData.handle}</span>
                    <span>•</span>
                    {isYouPage ? (
                        <Link href="/studio/analytics/live-count" className="hover:underline flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            {liveSubscriberCount.toLocaleString()} Subscribers
                        </Link>
                    ) : (
                        <span>{channelData.subscribers}</span>
                    )}
                    <span>•</span>
                    <span>{channelData.videoCount} videos</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2 line-clamp-1 flex items-center justify-center sm:justify-start">
                        {channelData.description.substring(0, 50)}...
                    </div>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-2 justify-center sm:justify-start">
                    {isYouPage ? (
                        <>
                            <Link href="/studio/dashboard" className={cn(buttonVariants({ variant: 'secondary' }))}>MyTube Studio</Link>
                            <Link href="/studio/customization" className={cn(buttonVariants({ variant: 'secondary' }))}>Manage Profile</Link>
                        </>
                    ) : (
                        <>
                            <Button>Subscribe</Button>
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant='outline' className='flex items-center gap-2'>
                                        <Gem className="h-4 w-4" /> Join
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                            <Button variant="outline"><UserPlus className="mr-2 h-4 w-4" />Add Friend</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
      
      <Tabs defaultValue={defaultTab} className="w-full">
         <TabsList className="w-full justify-start overflow-x-auto no-scrollbar border-b rounded-none mb-6">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="shorts">Shorts</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          {isYouPage && <TabsTrigger value="membership">Membership</TabsTrigger>}
          {isYouPage && <TabsTrigger value="game-ids">Game IDs</TabsTrigger>}
          {isYouPage && <TabsTrigger value="account">Account</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="home">
          <div className="space-y-8">
            {channelVideos.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Videos</h2>
                <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent>
                    {channelVideos.map((video) => (
                      <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                        <VideoCard video={video} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </section>
            )}

            {channelShorts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Shorts</h2>
                <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent>
                    {channelShorts.map((short) => (
                      <CarouselItem key={short.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                        <VideoCard video={short} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </section>
            )}
            
            {channelLiveStreams.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Live Streams</h2>
                <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent>
                    {channelLiveStreams.map((video) => (
                      <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                         <VideoCard video={video} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </section>
            )}

            {channelVideos.length === 0 && channelShorts.length === 0 && channelLiveStreams.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  This channel hasn't uploaded any content yet.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
              <CardHeader><CardTitle>All Uploads</CardTitle></CardHeader>
              <CardContent>
                  {myAllVideos.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {myAllVideos.map((video, index) => (
                              <div key={`${video.id}-${index}`}>
                                <VideoCard video={video} />
                                {isYouPage && (
                                    <Link href="/studio/promotions" className="w-full">
                                        <Button variant="outline" className="w-full mt-2">
                                            <Rocket className="mr-2 h-4 w-4" /> Promote
                                        </Button>
                                    </Link>
                                )}
                              </div>
                          ))}
                      </div>
                  ) : (
                      <p className="text-center text-muted-foreground py-4">No videos uploaded yet.</p>
                  )}
              </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shorts">
           <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Shorts</CardTitle>
                {isYouPage && (
                    <Link href="/upload-short">
                        <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload Short</Button>
                    </Link>
                )}
              </CardHeader>
              <CardContent>
                  {channelShorts.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                         {channelShorts.map(short => (
                            <div key={short.id}>
                                <VideoCard video={short} />
                                {isYouPage && (
                                    <Link href="/studio/promotions" className="w-full">
                                        <Button variant="outline" size="sm" className="w-full mt-2">
                                            <Rocket className="mr-2 h-4 w-4" /> Promote
                                        </Button>
                                    </Link>
                                )}
                            </div>
                         ))}
                      </div>
                   ) : (
                      <p className="text-center text-muted-foreground py-4">No shorts uploaded yet.</p>
                  )}
              </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="live">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Live Streams</CardTitle>
                 {isYouPage && (
                    <Link href="/go-live">
                        <Button variant="outline"><RadioTower className="mr-2 h-4 w-4" /> Go Live</Button>
                    </Link>
                 )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Past Live Streams</h3>
                  {channelLiveStreams.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {channelLiveStreams.map(video => (
                              <VideoCard key={video.id} video={video} />
                          ))}
                      </div>
                  ) : (
                      <p className="text-muted-foreground">No past live streams yet.</p>
                  )}
                </div>
              </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playlists">
           <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Playlists</CardTitle>
                 {isYouPage && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> New playlist</Button>
                        </DialogTrigger>
                    </Dialog>
                 )}
              </CardHeader>
              <CardContent>
                {false ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    </div>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        <p>No playlists created yet.</p>
                    </div>
                )}
              </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts">
            <div className="space-y-4">
                {channelPosts.length > 0 ? (
                    channelPosts.map(post => (
                        <Card key={post.id}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={channelData.avatarUrl} />
                                        <AvatarFallback>{channelData.name.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{channelData.name}</p>
                                        <p className="text-xs text-muted-foreground">{post.posted}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p>{post.content}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                      <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            This channel hasn't made any posts yet.
                        </CardContent>
                    </Card>
                )}
            </div>
        </TabsContent>

        {isYouPage && (
          <>
            <TabsContent value="membership">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>Join Membership</CardTitle>
                        <CardDescription>Support the channel and get exclusive perks!</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="text-center p-6">
                            <h3 className="text-xl font-bold">Silver Fan</h3>
                            <p className="text-3xl font-bold my-4"><span className="text-base font-normal text-muted-foreground">SR </span>299<span className="text-base font-normal text-muted-foreground">/month</span></p>
                            <ul className="text-left space-y-2">
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-4 w-4"/>Loyalty badges</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-4 w-4"/>Custom emojis</li>
                            </ul>
                            <Button className="mt-6 w-full">Join</Button>
                        </Card>
                        <Card className="text-center p-6 border-2 border-primary relative">
                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
                            <h3 className="text-xl font-bold">Gold Supporter</h3>
                            <p className="text-3xl font-bold my-4"><span className="text-base font-normal text-muted-foreground">SR </span>999<span className="text-base font-normal text-muted-foreground">/month</span></p>
                            <ul className="text-left space-y-2">
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-4 w-4"/>All Silver perks</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-4 w-4"/>Exclusive content</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-4 w-4"/>Early access to videos</li>
                            </ul>
                            <Button className="mt-6 w-full">Join</Button>
                        </Card>
                        <Card className="text-center p-6">
                            <h3 className="text-xl font-bold">Diamond VIP</h3>
                            <p className="text-3xl font-bold my-4"><span className="text-base font-normal text-muted-foreground">SR </span>2499<span className="text-base font-normal text-muted-foreground">/month</span></p>
                            <ul className="text-left space-y-2">
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-4 w-4"/>All Gold perks</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2 h-4 w-4"/>Social media shout-out</li>
                            </ul>
                            <Button className="mt-6 w-full">Join</Button>
                        </Card>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="game-ids">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Linked Game IDs</CardTitle>
                            <CardDescription>Manage your in-game identities for various games.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {(
                                <p className="text-center text-muted-foreground py-4">No game IDs linked yet.</p>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Game ID</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="game-select">Game</Label>
                                <Select>
                                    <SelectTrigger id="game-select"><SelectValue placeholder="Select a game" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Free Fire">Free Fire</SelectItem>
                                        <SelectItem value="BGMI">BGMI</SelectItem>
                                        <SelectItem value="Call of Duty Mobile">Call of Duty Mobile</SelectItem>
                                        <SelectItem value="Valorant">Valorant</SelectItem>
                                        <SelectItem value="Mobile Legends">Mobile Legends</SelectItem>
                                        <SelectItem value="Clash Royale">Clash Royale</SelectItem>
                                        <SelectItem value="Clash of Clans">Clash of Clans</SelectItem>
                                        <SelectItem value="custom">Custom Game</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ingame-name">Your In-Game Name</Label>
                                    <Input id="ingame-name" placeholder="e.g. ProGamerX"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gameid">Your Game ID</Label>
                                    <Input id="gameid" placeholder="e.g. 5123456789"/>
                                </div>
                            </div>
                            <Button className="w-full">Add Game</Button>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="account">
                <Card>
                    <CardHeader><CardTitle>Account Details</CardTitle></CardHeader>
                    <CardContent className="divide-y divide-border">
                        <div className="py-3 flex justify-between items-center"><span><strong>User ID:</strong></span> <span className="font-mono">{mockUser.username}</span></div>
                        <div className="py-3 flex justify-between items-center"><span><strong>Email:</strong></span> <span>srbrolive99@gmail.com</span></div>
                        <div className="py-3 flex justify-between items-center"><span><strong>Phone:</strong></span> <span>+XX XXXXXX1234 (Verified <CheckCircle className="inline h-4 w-4 text-green-500"/>)</span></div>
                        <div className="py-3 flex justify-between items-center"><span><strong>Wallet Balance:</strong></span> <span className="font-bold text-yellow-400">1,500 SR Coin</span></div>
                        <div className="pt-4">
                            <Button variant="destructive" className="w-full">Logout</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
