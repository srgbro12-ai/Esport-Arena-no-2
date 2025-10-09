import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockLeaderboard } from '@/lib/mock-data';
import { ArrowUpRight } from 'lucide-react';

export function LeaderboardPreview() {
  const topPlayers = mockLeaderboard.slice(0, 5);

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-yellow-600';
    return 'text-muted-foreground';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline">Top Players</CardTitle>
        <Button variant="ghost" size="sm" asChild>
            <Link href="/leaderboard">
                View All <ArrowUpRight className="ml-1 h-4 w-4"/>
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {topPlayers.map((player) => (
            <li key={player.rank} className="flex items-center gap-4">
              <div className={`text-xl font-bold w-6 text-center ${getRankColor(player.rank)}`}>
                {player.rank}
              </div>
              <Avatar>
                <AvatarImage src={player.avatarUrl} />
                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{player.name}</p>
              </div>
              <div className="font-mono text-right text-primary font-bold">
                {player.points} pts
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
