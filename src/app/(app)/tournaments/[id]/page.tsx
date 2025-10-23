'use client';

import { SRcoinIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Map, Shield, Trophy, Users, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/context/content-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tournamentsData = [
    { 
        id: 1, 
        game: 'BGMI', 
        title: 'BGMI Ultimate Showdown',
        description: "Welcome to the BGMI Ultimate Showdown! Prepare for an intense battle where only the best will survive. Squad up and fight for the grand prize pool. Good luck, soldiers!",
        mode: 'Squad',
        map: 'Erangel',
        date: 'Oct 30, 2023',
        time: '3:00 PM',
        slots: '48 / 64',
        prizePool: {
            total: 10000,
            distribution: [
                { rank: 1, prize: "5,000 SR" },
                { rank: 2, prize: "2,500 SR" },
                { rank: 3, prize: "1,000 SR" },
            ]
        },
        fee: 50, 
        image: 'https://placehold.co/1200x400.png', 
        hint: 'esports tournament',
        rules: [
            "All players must have a registered Neon Arena account.",
            "Teaming with other squads is strictly prohibited.",
            "Emulators are not allowed.",
            "Any form of cheating or hacking will result in immediate disqualification.",
            "Players must be present at least 15 minutes before the match starts."
        ],
        roomId: "87654321",
        password: "squad",
        participants: [
            { id: 't1p1', name: 'ProGamerX', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'The Annihilators' },
            { id: 't1p2', name: 'ShadowSlayer', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'The Annihilators' },
            { id: 't1p3', name: 'Viper', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'The Annihilators' },
            { id: 't1p4', name: 'Phoenix', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'The Annihilators' },
            { id: 't2p1', name: 'NoobMaster69', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Venom Squad' },
            { id: 't2p2', name: 'Zeus', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Venom Squad' },
            { id: 't2p3', name: 'Mystic', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Venom Squad' },
            { id: 't2p4', name: 'Raptor', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Venom Squad' },
        ]
    },
    { 
        id: 2, 
        game: 'Free Fire', 
        title: 'Free Fire Frenzy',
        description: "It's time for a Free Fire Frenzy! Go solo and prove you are the ultimate survivor. Battle it out for an exciting prize pool and bragging rights.",
        mode: 'Solo', 
        map: 'Bermuda',
        date: 'Nov 5, 2023',
        time: '5:00 PM',
        slots: '32 / 50',
        prizePool: {
            total: 5000,
            distribution: [
                { rank: 1, prize: "2,500 SR" },
                { rank: 2, prize: "1,500 SR" },
                { rank: 3, prize: "1,000 SR" },
            ]
        },
        fee: 25, 
        image: 'https://placehold.co/1200x400.png', 
        hint: 'action game',
        rules: [
            "This is a solo-only tournament.",
            "Use of any third-party apps, scripts, or hacks is forbidden.",
            "Players must use a mobile device; emulators are not permitted.",
            "The top 10 players will receive points based on placement and kills.",
            "Glitches and bug abuse are not allowed and will lead to a ban."
        ],
        roomId: "11223344",
        password: "solo",
        participants: [
            { id: 'ff1', name: 'GamerDude1', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar' },
            { id: 'ff2', name: 'SavageSlayer', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar' },
            { id: 'ff3', name: 'TestUser', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar' },
            { id: 'ff4', name: 'Alpha', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar' },
            { id: 'ff5', name: 'Beta', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar' },
            { id: 'ff6', name: 'Gamma', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar' },
        ]
    },
    { 
        id: 3, 
        game: 'COD', 
        title: 'COD Mobile Championship',
        description: "The official COD Mobile Championship is here. Gather your team and compete against the best to claim the title.",
        mode: 'Team', 
        map: 'Various',
        date: 'Nov 12, 2023',
        time: '7:00 PM',
        slots: '12 / 32',
        prizePool: {
            total: 15000,
            distribution: [
                { rank: 1, prize: "8,000 SR" },
                { rank: 2, prize: "4,000 SR" },
                { rank: 3, prize: "3,000 SR" },
            ]
        },
        fee: 100, 
        image: 'https://placehold.co/1200x400.png', 
        hint: 'soldier combat',
        rules: [
            "All players must register their team on the official website.",
            "Only registered players are allowed to participate.",
            "Using controllers or external devices is permitted.",
            "All matches will be played on the latest version of the game.",
            "Disrespectful behavior will not be tolerated."
        ],
        roomId: "55667788",
        password: "codm",
        participants: [
             { id: 'cd1', name: 'Ghost', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Task Force 141' },
             { id: 'cd2', name: 'Soap', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Task Force 141' },
             { id: 'cd3', name: 'Price', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Task Force 141' },
             { id: 'cd4', name: 'Gaz', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Task Force 141' },
        ]
    },
    { 
        id: 4, 
        game: 'BGMI', 
        title: 'BGMI TDM Carnage',
        description: "Fast-paced Team Deathmatch action. Quick matches, big rewards. Can your team dominate the arena?",
        mode: 'TDM', 
        map: 'Warehouse',
        date: 'Nov 15, 2023',
        time: '8:00 PM',
        slots: '60 / 100',
        prizePool: {
            total: 2000,
            distribution: [
                { rank: 1, prize: "1,000 SR" },
                { rank: 2, prize: "600 SR" },
                { rank: 3, prize: "400 SR" },
            ]
        },
        fee: 10, 
        image: 'https://placehold.co/1200x400.png', 
        hint: 'team deathmatch',
        rules: [
            "This is a Team Deathmatch (TDM) tournament.",
            "First team to reach 40 kills wins the match.",
            "Players can use any weapon available in TDM mode.",
            "Spawn camping is discouraged.",
            "Matches are best of 3."
        ],
        roomId: "99887766",
        password: "tdm",
        participants: [
             { id: 'tdm1', name: 'RedLion', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Red Team' },
             { id: 'tdm2', name: 'RedTiger', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Red Team' },
             { id: 'tdm3', name: 'BlueEagle', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Blue Team' },
             { id: 'tdm4', name: 'BlueShark', avatar: 'https://placehold.co/40x40.png', hint: 'profile avatar', team: 'Blue Team' },
        ]
    },
];

type Participant = {
    id: string;
    name: string;
    avatar: string;
    hint: string;
    team?: string;
};

// We only need a subset of the tournament type for the participants list
type TournamentForParticipants = {
    mode: string;
    participants: Participant[];
};

function ParticipantsList({ tournament }: { tournament: TournamentForParticipants }) {
    if (!tournament.participants || tournament.participants.length === 0) {
        return <p className="text-muted-foreground">Participants list will be available soon.</p>;
    }

    // For Solo mode, display a simple table of players
    if (tournament.mode === 'Solo') {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Player</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tournament.participants.map(player => (
                        <TableRow key={player.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-9 h-9">
                                        <AvatarImage src={player.avatar} data-ai-hint={player.hint} />
                                        <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{player.name}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    // For team-based modes, group players by team and display in an accordion
    const teams = tournament.participants.reduce((acc, player) => {
        const teamName = player.team || 'Unknown Team';
        if (!acc[teamName]) {
            acc[teamName] = [];
        }
        acc[teamName].push(player);
        return acc;
    }, {} as Record<string, Participant[]>);

    return (
        <Accordion type="multiple" className="w-full">
            {Object.entries(teams).map(([teamName, players]) => (
                <AccordionItem value={teamName} key={teamName}>
                    <AccordionTrigger className="hover:no-underline px-4">
                        <div className="flex items-center justify-between w-full">
                           <span className="font-semibold text-lg">{teamName}</span>
                           <Badge variant="secondary">{players.length} Players</Badge>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Table>
                           <TableBody>
                                {players.map(player => (
                                    <TableRow key={player.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-9 h-9">
                                                    <AvatarImage src={player.avatar} data-ai-hint={player.hint} />
                                                    <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{player.name}</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export default function TournamentDetailPage({ params }: { params: { id: string } }) {
    const { toast } = useToast();
    const tournament = tournamentsData.find(t => t.id === parseInt(params.id));
    const [showRoomDetails, setShowRoomDetails] = useState(false);
    const { joinedTournamentIds, joinTournament } = useContent();
    const isJoined = tournament ? joinedTournamentIds.includes(tournament.id) : false;

    useEffect(() => {
        if (!tournament) return;

        const checkTime = () => {
            const tournamentStartTime = new Date(`${tournament.date} ${tournament.time}`).getTime();
            const now = new Date().getTime();
            const timeDifference = tournamentStartTime - now;

            // Show details if it's 10 minutes before the start time or if the time has passed
            if (timeDifference <= 10 * 60 * 1000) {
                setShowRoomDetails(true);
                return true; // Stop interval
            }
            return false; // Continue interval
        };

        // If it's already time to show details, no need for an interval
        if (checkTime()) return; 

        // Check every second to see if it's time
        const interval = setInterval(() => {
            if (checkTime()) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [tournament]);

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to Clipboard",
            description: `The ${field} has been copied.`,
        });
    };

    const handleJoinTournament = () => {
        if (!tournament) return;

        const result = joinTournament({
            id: tournament.id,
            fee: tournament.fee,
            title: tournament.title
        });

        if (result.success) {
            toast({
                title: "Success!",
                description: result.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: result.message,
            });
        }
    };

    if (!tournament) {
        return (
            <div className="p-4 md:p-6 lg:p-8">
                <div className="flex items-center justify-center h-full py-20 text-center">
                    <div>
                        <h1 className="text-4xl font-bold font-headline">404</h1>
                        <p className="mt-2 text-xl">Tournament Not Found</p>
                        <p className="mt-2 text-muted-foreground">Sorry, we couldn't find the tournament you're looking for.</p>
                        <Link href="/tournaments">
                            <Button className="mt-6">Back to Tournaments</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="space-y-6">
                <Card className="overflow-hidden">
                    <div className="relative h-48 md:h-64 w-full">
                        <Image src={tournament.image} alt="Tournament Banner" fill className="object-cover" data-ai-hint={tournament.hint} />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6">
                             <h1 className="text-4xl font-headline font-bold text-white shadow-lg">{tournament.title}</h1>
                             <p className="text-primary font-semibold">{tournament.game}</p>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="details">
                            <TabsList>
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="rules">Rules</TabsTrigger>
                                <TabsTrigger value="participants">Participants ({tournament.slots})</TabsTrigger>
                                <TabsTrigger value="results">Results</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="mt-4">
                                <Card>
                                    <CardContent className="p-6 text-sm space-y-4">
                                        <p>{tournament.description}</p>
                                        <Separator />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InfoItem icon={Shield} label="Game" value={tournament.game} />
                                            <InfoItem icon={Users} label="Mode" value={tournament.mode} />
                                            <InfoItem icon={Map} label="Map" value={tournament.map} />
                                            <InfoItem icon={Calendar} label="Date" value={tournament.date} />
                                            <InfoItem icon={Clock} label="Time" value={tournament.time} />
                                            <InfoItem icon={Users} label="Slots" value={tournament.slots} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="rules" className="mt-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <ul className="list-disc space-y-2 pl-5 text-sm">
                                            {tournament.rules.map((rule, index) => (
                                                <li key={index}>{rule}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="participants" className="mt-4">
                               <Card>
                                    <CardHeader>
                                        <CardTitle>Participants</CardTitle>
                                        <CardDescription>
                                            {tournament.mode === 'Solo' ? 'List of all registered solo players.' : 'List of all registered teams and their players.'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-2 pb-4">
                                        <ParticipantsList tournament={tournament} />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="results" className="mt-4">
                                <Card><CardContent className="p-6">Results will be shown after the match.</CardContent></Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Room Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {showRoomDetails ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Room ID</p>
                                                <p className="font-mono text-lg">{tournament.roomId}</p>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => handleCopy(tournament.roomId!, 'Room ID')}>
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Password</p>
                                                <p className="font-mono text-lg">{tournament.password}</p>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => handleCopy(tournament.password!, 'Password')}>
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted-foreground text-sm py-4">
                                        <Clock className="mx-auto h-8 w-8 mb-2" />
                                        <p>Room ID & Password will be revealed 10 minutes before the match starts.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Trophy className="text-amber-400" /> Prize Pool</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               {tournament.prizePool.distribution.map(p => (
                                   <PrizeRow key={p.rank} rank={p.rank} prize={p.prize} />
                               ))}
                                <Separator />
                                <div className="text-center text-muted-foreground text-sm">Total Prize: {tournament.prizePool.total.toLocaleString()} SR</div>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader>
                                <CardTitle>Entry Fee</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center text-3xl font-bold text-primary gap-2">
                                    <SRcoinIcon className="w-8 h-8"/> {tournament.fee}
                                </div>
                            </CardContent>
                        </Card>
                         <Button 
                            className="w-full text-lg py-6" 
                            size="lg" 
                            onClick={handleJoinTournament}
                            disabled={isJoined}
                         >
                            {isJoined ? (
                                'Joined'
                            ) : (
                                <>
                                    Join Tournament
                                    <span className="mx-2 text-muted-foreground/50">|</span>
                                    <span className="flex items-center gap-1">
                                        <SRcoinIcon className="w-4 h-4" /> {tournament.fee}
                                    </span>
                                </>
                            )}
                         </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
    return (
        <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    )
}

function PrizeRow({ rank, prize }: { rank: number, prize: string }) {
    return (
        <div className="flex justify-between items-center">
            <span className="font-semibold">Rank #{rank}</span>
            <Badge variant="secondary" className="text-base">{prize}</Badge>
        </div>
    )
}
