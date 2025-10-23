
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { mockTournaments, mockLeaderboard } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SRcoinIcon } from '@/components/icons';
import { useContent } from '@/context/content-context';
import { Trophy } from 'lucide-react';

export default function TournamentDetailPage() {
    const params = useParams();
    const { joinedTournamentIds, joinTournament } = useContent();
    
    const tournamentId = typeof params.id === 'string' ? parseInt(params.id, 10) : undefined;
    const [tournament, setTournament] = useState(() => mockTournaments.find(t => t.id === tournamentId));
    const [showRoomDetails, setShowRoomDetails] = useState(false);
    
    useEffect(() => {
        if(tournamentId) {
            setTournament(mockTournaments.find(t => t.id === tournamentId));
        }
    }, [tournamentId]);

    if (!tournament) {
        return <div className="text-center p-10">Tournament not found.</div>;
    }

    const isJoined = joinedTournamentIds.includes(tournament.id);

    const handleJoin = () => {
        joinTournament(tournament.id);
    };
    
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-8">
                <Image src={tournament.coverUrl!} alt={tournament.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow">{tournament.title}</h1>
                    <p className="text-muted-foreground">{tournament.game} - {tournament.mode}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Tabs defaultValue="overview">
                        <TabsList className="mb-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                            <TabsTrigger value="rules">Rules</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About this Tournament</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Welcome to the {tournament.title}! Compete against the best players and prove your skills.
                                        This is a {tournament.mode} tournament for {tournament.game}. Good luck to all participants!
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="leaderboard">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Standings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Rank</TableHead>
                                                <TableHead>Player/Team</TableHead>
                                                <TableHead className="text-right">Points</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {mockLeaderboard.map(entry => (
                                                <TableRow key={entry.rank}>
                                                    <TableCell className="font-bold text-lg">{entry.rank}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar>
                                                                <AvatarImage src={entry.avatarUrl} />
                                                                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <span className="font-semibold">{entry.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right font-mono">{entry.points}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="rules">
                             <Card>
                                <CardHeader><CardTitle>Tournament Rules</CardTitle></CardHeader>
                                <CardContent className="prose prose-invert text-muted-foreground">
                                    <ul>
                                        <li>All players must use their registered in-game name.</li>
                                        <li>Teaming with other players is strictly prohibited in solo modes.</li>
                                        <li>Use of any third-party software or hacks will result in immediate disqualification.</li>
                                        <li>Scores will be updated after each match.</li>
                                        <li>All decisions by the tournament organizers are final.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Trophy className="text-yellow-400" /> Prize Pool</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-center">₹{tournament.prize.toLocaleString()}</p>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle>Entry Fee</CardTitle>
                        </CardHeader>
                         <CardContent>
                            <p className="text-3xl font-bold text-center flex items-center justify-center gap-2">
                                {tournament.entryFee > 0 ? (
                                    <>
                                        <SRcoinIcon className="w-8 h-8 text-primary" />
                                        <span>{tournament.entryFee.toLocaleString()}</span>
                                    </>
                                ) : 'Free'}
                            </p>
                        </CardContent>
                    </Card>
                     {isJoined ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Room Details</CardTitle>
                                <CardDescription>Use these details to join the match in-game.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {showRoomDetails ? (
                                    <div className="space-y-2">
                                        <p><strong>Room ID:</strong> 12345678</p>
                                        <p><strong>Password:</strong> pugb123</p>
                                    </div>
                                ) : (
                                    <Button className="w-full" onClick={() => setShowRoomDetails(true)}>Show Room ID & Pass</Button>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                         <Button className="w-full text-lg py-6" onClick={handleJoin}>
                            Join Tournament
                         </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

