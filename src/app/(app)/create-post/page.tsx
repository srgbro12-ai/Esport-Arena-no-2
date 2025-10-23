'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusSquare } from "lucide-react";
import { useContent } from "@/context/content-context";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";
import { useUser } from "@/firebase";


export default function CreatePostPage() {
    const [content, setContent] = useState('');
    const { addPost } = useContent();
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useUser();
    const { profile } = useProfile();

    const handlePost = () => {
        if (!content.trim()) {
            toast({
                title: "Cannot create empty post",
                variant: "destructive"
            });
            return;
        }

        if (!user) {
            toast({ title: "You must be logged in to create a post", variant: "destructive" });
            return;
        }

        addPost({
            content,
            channelId: user.uid,
        });

        toast({
            title: "Post created!",
        });
        
        const channelUsername = profile.handle.startsWith('@') ? profile.handle.substring(1) : profile.handle;
        router.push(`/channel/${channelUsername}?tab=posts`);
    }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Create Post</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><PlusSquare /> New Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="What's on your mind?" 
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={handlePost}>Post</Button>
        </CardContent>
      </Card>
    </div>
  );
}
