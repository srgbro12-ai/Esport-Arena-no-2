'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, Plus, Trash2, Pencil } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function CustomizationPage() {
    const { toast } = useToast();
    const { profile, updateAvatar, updateBanner, updateProfile } = useProfile();
    
    const [name, setName] = useState(profile.name);
    const [handle, setHandle] = useState(profile.handle);
    const [description, setDescription] = useState(profile.description);
    const [contactEmail, setContactEmail] = useState(profile.email || '');
    const [links, setLinks] = useState(profile.links);
    const [dob, setDob] = useState(profile.dob);
    const [gender, setGender] = useState(profile.gender);

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);


    const addLink = () => {
        if (links.length < 5) {
            setLinks([...links, { title: '', url: '' }]);
        }
    };

    const removeLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    const handleLinkChange = (index: number, field: 'title' | 'url', value: string) => {
        const newLinks = [...links];
        newLinks[index][field] = value;
        setLinks(newLinks);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                updateAvatar(reader.result as string);
                toast({ title: "Profile picture updated!" });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                updateBanner(reader.result as string);
                toast({ title: "Channel banner updated!" });
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = () => {
        updateProfile({ name, handle, description, email: contactEmail, links, dob, gender });
        toast({
            title: "Channel updated successfully!",
        });
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold">Channel customization</h1>
                <div className="flex items-center gap-2">
                    <Link href={`/channel/${profile.id}`}>
                        <Button variant="ghost">View channel</Button>
                    </Link>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handlePublish}>Publish</Button>
                </div>
            </div>

            <Tabs defaultValue="branding" className="w-full">
                <TabsList className="bg-transparent p-0 border-b rounded-none h-auto justify-start">
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="basic-info">Basic info</TabsTrigger>
                </TabsList>
                <TabsContent value="layout" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Layout</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Customize the layout of your channel homepage. Add a video spotlight and featured sections.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="branding" className="mt-6 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col md:flex-row items-center gap-6">
                            <Link href={`/channel/${profile.id}`} className="block">
                                <Image src={profile.avatarUrl} width={128} height={128} alt="Profile Picture" className="rounded-full object-cover" data-ai-hint={profile.dataAiHint} />
                            </Link>
                            <div className="flex-1">
                                <p className="text-sm text-muted-foreground mb-3">
                                    Your profile picture will appear where your channel is presented on MyTube, like next to your videos and comments. It’s recommended to use a picture that’s at least 128 x 128 pixels and 4MB or less. Use a PNG or GIF (no animations) file.
                                </p>
                                <div className="flex items-center gap-2">
                                    <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                                    <Button variant="outline" onClick={() => avatarInputRef.current?.click()}>Change</Button>
                                    <Button variant="ghost" onClick={() => updateAvatar('https://placehold.co/128x128.png')}>Remove</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Banner image</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col-reverse md:flex-row items-center gap-6">
                             <div className="flex-1">
                                <p className="text-sm text-muted-foreground mb-3">
                                    This image will appear across the top of your channel. For the best results on all devices, use an image that’s at least 1080 x 240 pixels and 6MB or less.
                                </p>
                                <div className="flex items-center gap-2">
                                     <input type="file" ref={bannerInputRef} onChange={handleBannerChange} className="hidden" accept="image/*" />
                                    <Button variant="outline" onClick={() => bannerInputRef.current?.click()}>Change</Button>
                                    <Button variant="ghost" onClick={() => updateBanner('https://placehold.co/1080x240.png')}>Remove</Button>
                                </div>
                            </div>
                            <Image src={profile.bannerUrl} width={1080} height={240} alt="Banner Preview" className="rounded-md object-contain border p-2 bg-secondary/30 max-w-sm w-full" data-ai-hint={profile.bannerHint} />
                        </CardContent>
                    </Card>

                      <Card>
                        <CardHeader>
                            <CardTitle>Video watermark</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col md:flex-row items-center gap-6">
                             <div className="flex-1">
                                <p className="text-sm text-muted-foreground mb-3">
                                    The watermark will appear on your videos in the right-hand corner of the video player.
                                </p>
                                <RadioGroup defaultValue="entire" className="space-y-2 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="end" id="end"/>
                                        <Label htmlFor="end" className="font-normal">End of video</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="custom" id="custom" />
                                        <Label htmlFor="custom" className="font-normal">Custom start time</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="entire" id="entire"/>
                                        <Label htmlFor="entire" className="font-normal">Entire video</Label>
                                    </div>
                                </RadioGroup>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline">Change</Button>
                                    <Button variant="ghost">Remove</Button>
                                </div>
                            </div>
                            <div className="relative w-full max-w-sm h-auto aspect-video rounded-md overflow-hidden border bg-secondary/30 flex items-center justify-center">
                                <Image src="https://placehold.co/400x225.png" width={400} height={225} alt="Video watermark preview" className="opacity-50" data-ai-hint="video player"/>
                                <Image src="https://placehold.co/48x48.png" width={48} height={48} alt="Watermark" className="absolute bottom-2 right-2 border-2 border-white/50" data-ai-hint="subscribe icon"/>
                            </div>
                        </CardContent>
                    </Card>
                 </TabsContent>
                <TabsContent value="basic-info" className="mt-6 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Name & Handle</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <div className="relative">
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="handle">Handle</Label>
                                <Input id="handle" value={handle} onChange={(e) => setHandle(e.target.value)} />
                                <p className="text-xs text-muted-foreground">Choose your unique handle by adding letters and numbers. You can change your handle back within 14 days.</p>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><CardTitle>Description</CardTitle></CardHeader>
                        <CardContent>
                            <Textarea rows={10} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </CardContent>
                    </Card>

                      <Card>
                        <CardHeader><CardTitle>Channel URL</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-2">This is the standard web address for your channel. It includes your unique channel ID, which is the numbers and letters at the end of the URL.</p>
                            <div className="flex items-center gap-2">
                                <Input readOnly value={`https://mytube.com/channel/${profile.id}`} />
                                <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(`https://mytube.com/channel/${profile.id}`)}><Copy className="h-4 w-4" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Date of Birth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gender</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="other" id="other" />
                                    <Label htmlFor="other">Other</Label>
                                </div>
                             </RadioGroup>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Links</CardTitle>
                            <CardDescription>Share external links with your viewers. They'll be visible on your channel profile and about page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {links.map((link, index) => (
                                <div key={index} className="flex items-end gap-2">
                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                        <Input placeholder="Link title (required)" value={link.title} onChange={(e) => handleLinkChange(index, 'title', e.target.value)} />
                                        <Input placeholder="URL (required)" value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)} />
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeLink(index)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addLink} disabled={links.length >= 5}>
                                <Plus className="mr-2 h-4 w-4" /> Add Link
                            </Button>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Contact info</CardTitle>
                            <CardDescription>Let people know how to contact you with business inquiries. The email address you enter may appear in the About section of your channel and be visible to viewers.</CardDescription>
                        </CardHeader>
                         <CardContent>
                            <Label htmlFor="contact-email">Email</Label>
                            <Input id="contact-email" type="email" placeholder="Enter your email address" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                        </CardContent>
                    </Card>
                 </TabsContent>
            </Tabs>
        </div>
    );
}
