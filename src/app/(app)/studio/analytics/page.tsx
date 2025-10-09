import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Analytics Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-10">
            <p>This page is under construction. Check back later for detailed channel analytics!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
