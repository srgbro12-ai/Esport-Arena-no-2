import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function UploadVideoPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Upload Video</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Upload /> Select files to upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
            <p>Drag and drop video files to upload</p>
            <p className="text-xs mt-2">Your videos will be private until you publish them.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
