import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gamepad2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
      <div className="relative z-10 text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-full">
            <Gamepad2 className="w-16 h-16 text-primary icon-glow" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-glow">
          Esport Arena
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your ultimate destination for competitive gaming, community, and content creation. Join tournaments, connect with friends, and grow your channel.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="font-bold text-lg">
            <Link href="/home">
              Enter Arena <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold text-lg">
            <Link href="/login">
              Login / Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
