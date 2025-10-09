import { TournamentCard } from "@/components/tournament-card";
import { mockTournaments } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TournamentsPage() {
  const games = ["All", "BGMI", "COD Mobile", "Free Fire", "Custom Game"];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow">Tournaments</h1>
        <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tournaments..."
              className="pl-8 sm:w-full md:w-[250px] lg:w-[300px]"
            />
          </div>
      </div>
      
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {games.map(game => (
            <TabsTrigger key={game} value={game}>{game}</TabsTrigger>
          ))}
        </TabsList>
        {games.map(game => (
          <TabsContent key={game} value={game}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {mockTournaments
                .filter(t => game === "All" || t.game === game)
                .map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
