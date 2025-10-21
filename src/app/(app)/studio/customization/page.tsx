'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockUser } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Camera, Edit, Wand2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateChannelDescription, GenerateChannelDescriptionInput } from '@/ai/flows/generate-channel-description';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function CustomizationPage() {
  const { toast } = useToast();
  const [description, setDescription] = useState(mockUser.description);
  const [isGenerating, setIsGenerating] = useState(false);
  const [avatar, setAvatar] = useState(mockUser.avatarUrl);
  const [banner, setBanner] = useState(mockUser.channelBannerUrl);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handlePublish = () => {
    toast({
      title: 'Changes Published!',
      description: 'Your channel has been updated.',
    });
  };

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    try {
      const input: GenerateChannelDescriptionInput = {
        keywords: 'Pro gamer, content creator, streamer, competitive gaming, Esport Arena',
      };
      const result = await generateChannelDescription(input);
      setDescription(result.description);
      toast({
        title: 'Description generated!',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error generating description',
        variant: 'destructive',
      });
    }
    setIsGenerating(false);
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      toast({ title: 'Profile picture updated! Click Publish to save.' });
    }
  };
  
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       setBanner(URL.createObjectURL(file));
       toast({ title: 'Channel banner updated! Click Publish to save.' });
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow">Channel Customization</h1>
        <Button onClick={handlePublish}>Publish</Button>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
        </TabsList>
        <TabsContent value="branding" className="mt-6">
          <div className="grid gap-8">
             <Card>
              <CardHeader>
                <CardTitle>Picture</CardTitle>
                <CardDescription>
                  Your profile picture will appear where your channel is presented on MyTube, like next to your videos and comments.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-6">
                 <Avatar className="w-24 h-24">
                    {avatar && <AvatarImage src={avatar} alt={mockUser.name} />}
                    <AvatarFallback>{mockUser.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <Button variant="outline" onClick={() => avatarInputRef.current?.click()}>
                        <Edit className="mr-2 h-4 w-4" /> Change
                    </Button>
                    <input
                      type="file"
                      ref={avatarInputRef}
                      onChange={handleAvatarChange}
                      className="hidden"
                      accept="image/*"
                    />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Banner Image</CardTitle>
                <CardDescription>
                  This image will appear across the top of your channel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[4/1] w-full max-w-3xl bg-secondary rounded-lg mb-4">
                  {banner && <Image src={banner} alt="Channel Banner" fill className="object-cover rounded-lg" />}
                  <div 
                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-lg"
                    onClick={() => bannerInputRef.current?.click()}
                  >
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <input 
                    type="file"
                    ref={bannerInputRef}
                    onChange={handleBannerChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Recommended size: At least 1080 x 240 pixels.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="basic-info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="channel-name">Name</Label>
                <Input id="channel-name" defaultValue={mockUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel-handle">Handle</Label>
                <Input id="channel-handle" defaultValue={`@${mockUser.username}`} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel-description">Description</Label>
                <Textarea
                  id="channel-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  placeholder="Tell viewers about your channel."
                />
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
