import { mockTournaments } from '@/lib/mock-data';
import { TournamentCard } from '@/components/tournament-card';
import { LeaderboardPreview } from '@/components/leaderboard-preview';

export default function HomePage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">
          Recommended Matches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {mockTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">
          Leaderboard Standings
        </h2>
        <LeaderboardPreview />
      </div>
    </main>
  );
}
