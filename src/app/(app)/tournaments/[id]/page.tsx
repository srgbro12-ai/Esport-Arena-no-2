import { mockTournaments, mockLeaderboard } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Award, Calendar, Ticket, Users, Trophy } from "lucide-react";
import { notFound } from 'next/navigation';

export default function TournamentDetailsPage({ params }: { params: { id: string } }) {
  const tournament = mockTournaments.find(t => t.id === params.id);

  if (!tournament) {
    notFound();
  }

  const isFree = tournament.entryFee.toLowerCase() === 'free';
  const hasStarted = new Date(tournament.date) < new Date();

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <header className="relative h-64 md:h-80 rounded-lg overflow-hidden">
        {tournament.coverUrl && (
           <Image src={tournament.coverUrl} alt={tournament.title} layout="fill" objectFit="cover" className="opacity-30" data-ai-hint={tournament.hint} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
            <Badge variant="secondary" className="text-lg mb-2">{tournament.game}</Badge>
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-glow">{tournament.title}</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Tabs defaultValue="results" className="w-full">
                <TabsList>
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="participants">Participants</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                </TabsList>
                <TabsContent value="results">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Trophy className="text-primary"/> Final Standings</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="w-[50px]">Rank</TableHead>
                                    <TableHead>Player</TableHead>
                                    <TableHead className="text-right">Points</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockLeaderboard.map(player => (
                                    <TableRow key={player.rank}>
                                        <TableCell className="font-bold text-lg">{player.rank}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={player.avatarUrl} />
                                                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{player.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-mono">{player.points}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="participants">
                    <Card>
                        <CardHeader><CardTitle>Registered Players (128/128)</CardTitle></CardHeader>
                        <CardContent><p>Participant list will be available after match start.</p></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="rules">
                    <Card>
                        <CardHeader><CardTitle>Tournament Rules</CardTitle></CardHeader>
                        <CardContent className="prose prose-invert max-w-none text-muted-foreground">
                            <p>1. All players must check in 15 minutes before the match start time.</p>
                            <p>2. Use of any third-party software, hacks, or cheats is strictly prohibited.</p>
                            <p>3. Players must maintain a sportsmanlike conduct. Toxicity will not be tolerated.</p>
                            <p>4. All scores must be reported to the admin via the official Discord server.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

        <div className="space-y-6">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Tournament Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-3"><Users className="w-5 h-5 text-primary" /><span className="font-medium">{tournament.mode}</span></div>
                    <div className="flex items-center gap-3"><Award className="w-5 h-5 text-primary" /><span className="font-medium">₹{tournament.prize} Prize Pool</span></div>
                    <div className="flex items-center gap-3"><Ticket className="w-5 h-5 text-primary" /><span className={`font-medium ${isFree ? 'text-green-400' : ''}`}>{isFree ? 'Free Entry' : `₹${tournament.entryFee} Entry Fee`}</span></div>
                    <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-primary" /><span className="font-medium">{new Date(tournament.date).toLocaleString()}</span></div>
                </CardContent>
            </Card>
            <Button size="lg" className="w-full font-bold text-lg" disabled={hasStarted}>
                {hasStarted ? 'Registration Closed' : 'Register Now'}
            </Button>
        </div>
      </div>
    </div>
  );
}
