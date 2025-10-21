'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Calendar as CalendarIcon, Film, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CreatePlaylistDialog } from '@/components/channel/CreatePlaylistDialog';
import { useContent } from '@/context/content-context';
import { mockUser } from '@/lib/mock-data';

const uploadVideoSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().optional(),
  thumbnail: z.any().optional(),
  playlist: z.string().optional(),
  isForKids: z.enum(["yes", "no"], { required_error: "This field is required" }),
  ageRestriction: z.enum(["no-restrict", "yes-restrict"]),
  visibility: z.enum(["private", "unlisted", "public", "schedule"]),
  scheduleDate: z.date().optional(),
  scheduleTime: z.string().optional(),
  instantPremiere: z.boolean().optional(),
  schedulePremiere: z.boolean().optional(),
});

type Playlist = {
  id: string;
  title: string;
}

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  
  const { addVideo, playlists, addPlaylist } = useContent();

  const form = useForm<z.infer<typeof uploadVideoSchema>>({
    resolver: zodResolver(uploadVideoSchema),
    defaultValues: {
      title: '',
      description: '',
      playlist: '',
      visibility: 'private',
      ageRestriction: 'no-restrict',
      instantPremiere: false,
      schedulePremiere: false,
    },
  });

  const visibility = form.watch('visibility');
  const watchIsForKids = form.watch('isForKids');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setThumbnailFile(e.target.files[0]);
        form.setValue('thumbnail', e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideoFile(e.dataTransfer.files[0]);
    }
  };

  function onSubmit(data: z.infer<typeof uploadVideoSchema>) {
    if (!videoFile) {
        toast({
            title: "Upload Error",
            description: "Please select a video file to upload.",
            variant: "destructive",
        });
        return;
    }

    addVideo({
      title: data.title,
      channelId: mockUser.username,
      thumbnailUrl: thumbnailFile ? URL.createObjectURL(thumbnailFile) : 'https://placehold.co/600x400.png',
      dataAiHint: data.description?.split(' ').slice(0, 2).join(' ') || 'uploaded video',
    });

    toast({
        title: "Video Uploaded Successfully!",
        description: "Your video details have been saved.",
    });

    router.push(`/channel/${mockUser.username}?tab=videos`);
  }

  const videoSrc = videoFile ? URL.createObjectURL(videoFile) : '';
  const thumbnailSrc = thumbnailFile ? URL.createObjectURL(thumbnailFile) : '';

  if (!videoFile) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center p-4">
        <div
           onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="w-full max-w-lg border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-headline font-bold">Drag and drop video files to upload</h2>
          <p className="text-muted-foreground mt-2">Your videos will be private until you publish them.</p>
          <Input
             ref={fileInputRef}
            type="file"
             accept="video/*"
             className="hidden"
            onChange={handleFileChange}
          />
          <Button className="mt-6">Select Files</Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-headline font-bold">Upload Video</h1>
          <Button type="submit">Upload Video</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (required)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Add a title that describes your video" className="min-h-24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell viewers about your video" className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thumbnail</CardTitle>
                <CardDescription>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={() => (
                        <FormItem>
                            <FormControl>
                                <label htmlFor="thumbnail-upload" className="relative w-36 h-20 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors text-muted-foreground hover:text-primary">
                                    <Upload className="h-6 w-6" />
                                    <span className="text-xs font-semibold mt-1">Upload thumbnail</span>
                                    <Input id="thumbnail-upload" type="file" accept="image/*" className="sr-only" onChange={handleThumbnailChange} />
                                </label>
                            </FormControl>
                        </FormItem>
                    )}
                />
                 {[
                  {hint: "video still", src: thumbnailSrc || "https://placehold.co/144x80.png"},
                  {hint: "action shot", src: "https://placehold.co/144x80.png"},
                  {hint: "person smiling", src: "https://placehold.co/144x80.png"}
                  ].map((thumb, i) => (
                  <div key={i} className="relative w-36 h-20 rounded-lg overflow-hidden border border-border cursor-pointer hover:ring-2 hover:ring-primary">
                    <img src={thumb.src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" data-ai-hint={thumb.hint} />
                     {i === 0 && thumbnailFile && <div className="absolute inset-0 ring-2 ring-primary bg-primary/20" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Playlists</CardTitle>
                <CardDescription>Add your video to one or more playlists to organize your content for viewers.</CardDescription>
              </CardHeader>
              <CardContent>
                 <FormField
                    control={form.control}
                    name="playlist"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a playlist" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent rounded-md text-sm text-primary w-full">
                                            <Plus className="h-4 w-4" /> Create playlist
                                        </div>
                                    </DialogTrigger>
                                    <CreatePlaylistDialog onCreate={addPlaylist} />
                                </Dialog>
                                <Separator className="my-1" />
                                {playlists.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                    control={form.control}
                    name="isForKids"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Is this video "made for kids"?</FormLabel>
                             <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2 mt-2">
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem value="yes" id="kids-yes" />
                                        </FormControl>
                                        <Label htmlFor="kids-yes" className="font-normal cursor-pointer">Yes, it's made for kids.</Label>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem value="no" id="kids-no" />
                                        </FormControl>
                                        <Label htmlFor="kids-no" className="font-normal cursor-pointer">No, it's not made for kids.</Label>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                                 <Separator className="my-6"/>
                 <FormField
                    control={form.control}
                    name="ageRestriction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Age restriction (advanced)</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2 mt-2" disabled={watchIsForKids === 'yes'}>
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem value="no-restrict" id="age-no" />
                                        </FormControl>
                                        <Label htmlFor="age-no" className="font-normal cursor-pointer">No, don't restrict my video to viewers over 18 only</Label>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem value="yes-restrict" id="age-yes" />
                                        </FormControl>
                                        <Label htmlFor="age-yes" className="font-normal cursor-pointer">Yes, restrict my video to viewers over 18 only</Label>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            {watchIsForKids === 'yes' && (
                                <FormDescription>Age restriction is not available for videos made for kids.</FormDescription>
                            )}
                        </FormItem>
                    )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6 self-start sticky top-24">
              <Card>
                  <CardContent className="p-0">
                      <div className="aspect-video w-full bg-black rounded-t-lg overflow-hidden">
                          <video src={videoSrc} controls className="w-full h-full"></video>
                      </div>
                      <div className="p-4 space-y-2">
                          <Label>Filename</Label>
                          <div className='flex items-center gap-2 text-sm text-muted-foreground bg-input p-2 rounded-md'>
                              <Film className="h-4 w-4"/>
                              <span className='truncate'>{videoFile.name}</span>
                          </div>
                      </div>
                  </CardContent>
              </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
                <CardDescription>Choose when to publish and who can see your video.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-4">
                      <FormItem className="p-3 rounded-md border has-[:checked]:bg-accent has-[:checked]:border-primary">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="private" id="private" />
                          </FormControl>
                          <Label htmlFor="private" className="font-semibold w-full cursor-pointer">Private</Label>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6 mt-1">Only you and people you choose can watch your video.</p>
                      </FormItem>
                      <FormItem className="p-3 rounded-md border has-[:checked]:bg-accent has-[:checked]:border-primary">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="unlisted" id="unlisted" />
                          </FormControl>
                          <Label htmlFor="unlisted" className="font-semibold w-full cursor-pointer">Unlisted</Label>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6 mt-1">Anyone with the video link can watch your video.</p>
                      </FormItem>
                      <FormItem className="p-3 rounded-md border has-[:checked]:bg-accent has-[:checked]:border-primary">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                                <RadioGroupItem value="public" id="public" />
                            </FormControl>
                            <Label htmlFor="public" className="font-semibold w-full cursor-pointer">Public</Label>
                          </div>
                        <p className="text-xs text-muted-foreground ml-6 mt-1">Everyone can watch your video.</p>
                        {visibility === 'public' && (
                            <FormField
                            control={form.control}
                            name="instantPremiere"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 ml-6 mt-3">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="instant-premiere" />
                                    </FormControl>
                                    <Label htmlFor="instant-premiere" className="text-sm font-normal cursor-pointer">Set as Instant Premiere</Label>
                                </FormItem>
                            )}
                            />
                        )}
                      </FormItem>
                      <FormItem className="p-3 rounded-md border has-[:checked]:bg-accent has-[:checked]:border-primary">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                                <RadioGroupItem value="schedule" id="schedule" />
                            </FormControl>
                            <Label htmlFor="schedule" className="font-semibold w-full cursor-pointer">Schedule</Label>
                          </div>
                          <p className="text-xs text-muted-foreground ml-6 mt-1">Select a date to make your video public.</p>
                          {visibility === 'schedule' && (
                              <div className="ml-6 mt-4 space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="scheduleDate"
                                    render={({ field }) => (
                                      <FormItem>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <FormControl>
                                              <Button
                                                variant={"outline"}
                                                className={cn(
                                                  "w-full justify-start text-left font-normal",
                                                  !field.value && "text-muted-foreground"
                                                )}
                                              >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                              </Button>
                                            </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                              mode="single"
                                              selected={field.value}
                                              onSelect={field.onChange}
                                              initialFocus
                                            />
                                          </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="scheduleTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="time" {...field} value={field.value ?? ''} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="schedulePremiere"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                          <Checkbox id="schedule-premiere" checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <Label htmlFor="schedule-premiere" className="text-sm font-normal cursor-pointer">Set as Premiere</Label>
                                      </FormItem>
                                    )}
                                  />
                              </div>
                          )}
                      </FormItem>
                    </RadioGroup>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
