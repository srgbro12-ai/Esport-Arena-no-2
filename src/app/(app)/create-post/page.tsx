import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusSquare } from "lucide-react";

export default function CreatePostPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Create Post</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><PlusSquare /> New Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="What's on your mind?" rows={5} />
          <Button>Post</Button>
        </CardContent>
      </Card>
    </div>
  );
}
