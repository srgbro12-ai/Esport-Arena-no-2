import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film } from "lucide-react";

export default function UploadShortPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Upload Short</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Film /> Select short video</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
            <p>Drag and drop a short video file to upload</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
