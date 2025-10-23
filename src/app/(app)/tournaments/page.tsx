'use client';

import { BGMIIcon, CODMobileIcon, FreeFireIcon, SRcoinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Shield, Trophy, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const tournaments = [
  { id: 1, game: 'BGMI', title: 'BGMI Ultimate Showdown', mode: 'Squad', prize: 10000, fee: 50, time: '3:00 PM', image: 'https://picsum.photos/seed/bgmi/400/200', hint: 'esports battle' },
  { id: 2, game: 'Free Fire', title: 'Free Fire Frenzy', mode: 'Solo', prize: 5000, fee: 25, time: '5:00 PM', image: 'https://picsum.photos/seed/ff/400/200', hint: 'action game' },
  { id: 3, game: 'COD Mobile', title: 'COD Mobile Championship', mode: 'Team', prize: 15000, fee: 100, time: '7:00 PM', image: 'https://picsum.photos/seed/codm/400/200', hint: 'soldier combat' },
  { id: 4, game: 'BGMI', title: 'BGMI TDM Carnage', mode: 'TDM', prize: 2000, fee: 10, time: '8:00 PM', image: 'https://picsum.photos/seed/bgmi2/400/200', hint: 'team deathmatch' },
];

export default function TournamentsPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold">All Tournaments</h1>
                    <p className="text-muted-foreground">Find the next battle to conquer.</p>
                </div>
                
                <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All Games</TabsTrigger>
                        <TabsTrigger value="bgmi"><BGMIIcon className="mr-2 h-4 w-4" /> BGMI</TabsTrigger>
                        <TabsTrigger value="free fire"><FreeFireIcon className="mr-2 h-4 w-4" /> Free Fire</TabsTrigger>
                        <TabsTrigger value="cod"><CODMobileIcon className="mr-2 h-4 w-4" /> Call of Duty</TabsTrigger>
                    </TabsList>
                    <TournamentList filter="all" />
                    <TournamentList filter="bgmi" />
                    <TournamentList filter="free fire" />
                    <TournamentList filter="cod" />
                </Tabs>
            </div>
        </div>
    );
}

function TournamentList({ filter }: { filter: string }) {
    const filteredTournaments = filter === 'all' 
        ? tournaments 
        : tournaments.filter(t => t.game.toLowerCase().startsWith(filter));
    
    return (
        <TabsContent value={filter} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTournaments.map(t => (
                    <Card key={t.id} className="overflow-hidden group transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10">
                        <CardHeader className="p-0 relative">
                            <Image src={t.image} alt={t.title} width={400} height={200} className="w-full object-cover group-hover:scale-105 transition-transform" data-ai-hint={t.hint} />
                            <Badge className="absolute top-2 right-2" variant="secondary">Starts in 2h</Badge>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            <CardTitle className="font-headline text-lg">{t.title}</CardTitle>
                             <div className="flex items-center text-sm text-muted-foreground gap-4">
                                <span><Shield className="inline mr-1 h-4 w-4" /> {t.game}</span>
                                <span><Users className="inline mr-1 h-4 w-4" /> {t.mode}</span>
                                <span><Clock className="inline mr-1 h-4 w-4" /> {t.time}</span>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <Trophy className="w-5 h-5 text-amber-400" />
                                <div>
                                    <p className="font-semibold text-base">Prize Pool</p>
                                    <p className="text-xl font-bold text-primary">{t.prize.toLocaleString()} SR</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t">
                            <Link href={`/tournaments/${t.id}`} className="w-full">
                                <Button className="w-full">
                                    Join Now
                                    <span className="mx-2 text-muted-foreground/50">|</span>
                                    <span className="flex items-center gap-1">
                                        <SRcoinIcon className="w-4 h-4" /> {t.fee}
                                    </span>
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </TabsContent>
    )
}
