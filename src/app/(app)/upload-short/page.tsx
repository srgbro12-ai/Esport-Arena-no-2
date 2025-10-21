'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Film, Upload } from "lucide-react";
import { useContent } from '@/context/content-context';
import { useToast } from '@/hooks/use-toast';
import { mockUser } from '@/lib/mock-data';

export default function UploadShortPage() {
  const [shortFile, setShortFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addShort } = useContent();
  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setShortFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setShortFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!shortFile) {
        toast({ title: "Please select a file", variant: "destructive" });
        return;
    }
    
    addShort({
        title: shortFile.name.replace(/\.[^/.]+$/, ""),
        channelId: mockUser.username,
        thumbnailUrl: URL.createObjectURL(shortFile),
        dataAiHint: 'short video',
    });

    toast({ title: "Short uploaded successfully!" });
    router.push(`/channel/${mockUser.username}?tab=shorts`);
  };

  if (shortFile) {
    return (
       <div className="p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Upload Short</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Film /> Review your short</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="w-full max-w-xs aspect-[9/16] bg-black rounded-lg overflow-hidden">
                        <video src={URL.createObjectURL(shortFile)} controls className="w-full h-full"></video>
                    </div>
                    <p className="text-sm text-muted-foreground">{shortFile.name}</p>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShortFile(null)}>Cancel</Button>
                        <Button onClick={handleUpload}>Upload</Button>
                    </div>
                </CardContent>
            </Card>
       </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Upload Short</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Film /> Select short video</CardTitle>
        </CardHeader>
        <CardContent 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
          <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 mb-4" />
            <p>Drag and drop a short video file to upload</p>
            <p className="text-xs mt-2">Recommended aspect ratio: 9:16</p>
            <Input
             ref={fileInputRef}
            type="file"
             accept="video/*"
             className="hidden"
            onChange={handleFileChange}
          />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
