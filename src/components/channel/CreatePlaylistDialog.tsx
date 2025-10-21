'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type CreatePlaylistDialogProps = {
  onCreate: (title: string) => void;
};

export function CreatePlaylistDialog({ onCreate }: CreatePlaylistDialogProps) {
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (title.trim()) {
      onCreate(title.trim());
      setTitle('');
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new playlist</DialogTitle>
        <DialogDescription>
          Enter a title for your new playlist. You can add videos to it later.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="playlist-title" className="text-right">
            Title
          </Label>
          <Input
            id="playlist-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-3"
            placeholder="e.g., Best Gameplay Moments"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
            <Button type="button" onClick={handleCreate} disabled={!title.trim()}>
                Create
            </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
