
'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Film, Upload, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/context/ProfileContext';
import { useUser, useFirebaseApp, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { uploadFile } from '@/firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Input } from '@/components/ui/input';

export default function UploadShortPage() {
  const [shortFile, setShortFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const { profile } = useProfile();
  const firebaseApp = useFirebaseApp();
  const firestore = useFirestore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 20 * 1024 * 1024) { // 20MB limit for shorts
        toast({ title: "Short file too large", description: "Please upload a video smaller than 20MB.", variant: "destructive" });
        return;
      }
      setShortFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        toast({ title: "Short file too large", description: "Please upload a video smaller than 20MB.", variant: "destructive" });
        return;
      }
      setShortFile(file);
    }
  };

  const handleUpload = async () => {
    if (!shortFile || !user || !firebaseApp || !firestore) {
        toast({ title: "Please select a file and ensure you are logged in.", variant: "destructive" });
        return;
    }

    setIsUploading(true);

    try {
        const fileName = `${user.uid}-${Date.now()}-${shortFile.name}`;
        const videoUrl = await uploadFile(firebaseApp, shortFile, `shorts/${fileName}`);

        const shortsCollection = collection(firestore, 'users', user.uid, 'videos');
        const videoData = {
            title: shortFile.name.replace(/\.[^/.]+$/, ""),
            channelId: user.uid,
            videoUrl: videoUrl,
            thumbnailUrl: videoUrl, // For shorts, video can be its own thumbnail
            isShort: true,
            views: 0,
            likes: 0,
            uploadDate: serverTimestamp(),
            dataAiHint: 'short video',
        };

        addDoc(shortsCollection, videoData)
          .then(() => {
            toast({ title: "Short uploaded successfully!" });
            const channelUsername = profile.handle.startsWith('@') ? profile.handle.substring(1) : profile.handle;
            router.push(`/channel/${channelUsername}?tab=shorts`);
          })
          .catch(async (error) => {
              const permissionError = new FirestorePermissionError({
                  path: shortsCollection.path,
                  operation: 'create',
                  requestResourceData: videoData,
              });
              errorEmitter.emit('permission-error', permissionError);
          })
          .finally(() => {
            setIsUploading(false);
          });

    } catch (error) {
        console.error("Error uploading short:", error);
        toast({ title: "Upload Failed", description: (error as Error).message, variant: "destructive" });
        setIsUploading(false);
    }
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
                        <Button variant="outline" onClick={() => setShortFile(null)} disabled={isUploading}>Cancel</Button>
                        <Button onClick={handleUpload} disabled={isUploading}>
                           {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                           {isUploading ? 'Uploading...' : 'Upload'}
                        </Button>
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
