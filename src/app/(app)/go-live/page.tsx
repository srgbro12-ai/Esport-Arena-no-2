import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radio } from "lucide-react";

export default function GoLivePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Go Live</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Radio /> Stream Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-20">
            <p>Live streaming setup coming soon!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
