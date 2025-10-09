import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Users, Ticket, Award, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

type TournamentCardProps = {
  tournament: {
    id: string;
    game: string;
    title: string;
    mode: string;
    prize: string;
    entryFee: string;
    date: string;
    coverUrl?: string;
    hint?: string;
  };
};

export function TournamentCard({ tournament }: TournamentCardProps) {
  const isFree = tournament.entryFee.toLowerCase() === 'free';
  const hasStarted = new Date(tournament.date) < new Date();
  
  return (
    <Card className="flex flex-col overflow-hidden border-border hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0 relative">
        {tournament.coverUrl && (
            <Image
                src={tournament.coverUrl}
                alt={tournament.title}
                width={300}
                height={400}
                className="w-full h-48 object-cover"
                data-ai-hint={tournament.hint}
            />
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">{tournament.game}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-headline text-lg font-bold leading-tight truncate">
          {tournament.title}
        </h3>
        <div className="mt-2 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>{tournament.mode}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <span>Prize: ₹{tournament.prize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-primary" />
            <span className={isFree ? 'text-green-400 font-bold' : ''}>
              {isFree ? 'Free Entry' : `Entry: ₹${tournament.entryFee}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {hasStarted ? 'Started' : `Starts ${formatDistanceToNow(new Date(tournament.date), { addSuffix: true })}`}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full font-bold">
          <Link href={`/tournaments/${tournament.id}`}>
            {hasStarted ? 'View Details' : 'Register Now'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
