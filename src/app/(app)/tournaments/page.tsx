
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BGMIIcon, CODMobileIcon, FreeFireIcon, SRcoinIcon } from "@/components/icons";
import { mockTournaments } from '@/lib/mock-data';

const gameIcons: { [key: string]: React.ReactNode } = {
  'BGMI': <BGMIIcon className="w-5 h-5" />,
  'COD Mobile': <CODMobileIcon className="w-5 h-5" />,
  'Free Fire': <FreeFireIcon className="w-5 h-5" />,
};

export default function TournamentsPage() {
  const allGames = ['All', 'BGMI', 'COD Mobile', 'Free Fire', 'Custom Game'];
  
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Tournaments</h1>
      <Tabs defaultValue="All" className="w-full">
        <TabsList>
          {allGames.map(game => (
            <TabsTrigger key={game} value={game}>{game}</TabsTrigger>
          ))}
        </TabsList>
        
        {allGames.map(game => (
          <TabsContent key={game} value={game}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {mockTournaments
                .filter(t => game === 'All' || t.game === game)
                .map(t => (
                  <Card key={t.id} className="flex flex-col">
                    <CardHeader className="p-0">
                      <div className="aspect-video relative">
                        <Image src={t.coverUrl!} alt={t.title} fill className="object-cover rounded-t-lg" data-ai-hint={t.hint} />
                        <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm p-2 rounded-md flex items-center gap-2 text-sm">
                          {gameIcons[t.game] || null}
                          <span>{t.game}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <CardTitle className="text-lg font-bold mb-2">{t.title}</CardTitle>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Mode:</strong> {t.mode}</p>
                        <p><strong>Prize Pool:</strong> ₹{t.prize.toLocaleString()}</p>
                        <p className="flex items-center gap-1.5">
                            <strong>Entry:</strong>
                            {t.entryFee > 0 ? (
                                <>
                                    <SRcoinIcon className="w-4 h-4 text-primary" /> {t.entryFee.toLocaleString()}
                                </>
                            ) : 'Free Entry'}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-semibold text-green-400">{t.status}</span>
                        <Button asChild>
                          <Link href={`/tournaments/${t.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
