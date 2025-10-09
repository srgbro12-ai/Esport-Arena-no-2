import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

type VideoCardProps = {
  video: {
    id: string;
    title: string;
    views: string;
    posted: string;
    thumbnailUrl?: string;
    hint?: string;
  };
};

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href="#" className="group">
      <Card className="overflow-hidden border-transparent bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            {video.thumbnailUrl && (
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={video.hint}
              />
            )}
          </div>
          <div className="mt-3">
            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">{video.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {video.views} views &middot; {video.posted}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
