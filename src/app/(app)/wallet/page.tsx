
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DollarSign, PlusCircle, ArrowCircleUp, ArrowCircleDown, History } from 'lucide-react';

// Mock data for transactions - will be replaced with real data later
const mockTransactions = [
  { id: 't1', type: 'deposit', amount: 500.00, date: '2024-10-26', status: 'Completed' },
  { id: 't2', type: 'withdrawal', amount: -200.00, date: '2024-10-25', status: 'Completed' },
  { id: 't3', type: 'tournament_winnings', amount: 1500.00, date: '2024-10-24', status: 'Completed' },
  { id: 't4', type: 'store_purchase', amount: -999.00, date: '2024-10-22', status: 'Completed' },
  { id: 't5', type: 'deposit', amount: 300.00, date: '2024-10-21', status: 'Pending' },
];

const getTransactionIcon = (type: string) => {
    switch (type) {
        case 'deposit':
            return <ArrowCircleDown className="h-6 w-6 text-green-500" />;
        case 'withdrawal':
            return <ArrowCircleUp className="h-6 w-6 text-red-500" />;
        case 'tournament_winnings':
            return <DollarSign className="h-6 w-6 text-yellow-400" />;
        case 'store_purchase':
            return <ArrowCircleUp className="h-6 w-6 text-red-500" />;
        default:
            return <DollarSign className="h-6 w-6 text-muted-foreground" />;
    }
}

const getTransactionTitle = (type: string) => {
    switch (type) {
        case 'deposit':
            return 'Money Added';
        case 'withdrawal':
            return 'Money Withdrawn';
        case 'tournament_winnings':
            return 'Tournament Winnings';
        case 'store_purchase':
            return 'Store Purchase';
        default:
            return 'Transaction';
    }
}


export default function WalletPage() {
    const currentBalance = 5430.50; // Mock balance

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <DollarSign className="w-10 h-10 text-primary icon-glow" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow">Wallet</h1>
            </div>

            <Card className="mb-8 border-primary/20 shadow-lg shadow-primary/10">
                <CardHeader>
                    <CardDescription>Current Balance</CardDescription>
                    <CardTitle className="text-4xl lg:text-5xl font-bold text-glow">
                        ₹{currentBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="w-full font-semibold">
                        <PlusCircle className="mr-2 h-5 w-5" /> Add Money
                    </Button>
                    <Button size="lg" variant="outline" className="w-full font-semibold">
                        <ArrowCircleUp className="mr-2 h-5 w-5" /> Withdraw Funds
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="h-6 w-6" />
                        Transaction History
                    </CardTitle>
                    <CardDescription>View your recent wallet activity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockTransactions.length > 0 ? (
                            mockTransactions.map((tx, index) => (
                                <React.Fragment key={tx.id}>
                                    <div className="flex items-center justify-between gap-4 py-3">
                                        <div className="flex items-center gap-4">
                                            {getTransactionIcon(tx.type)}
                                            <div>
                                                <p className="font-semibold">{getTransactionTitle(tx.type)}</p>
                                                <p className="text-xs text-muted-foreground">{tx.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold text-lg ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                                            </p>
                                            <p className={`text-xs ${tx.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                                                {tx.status}
                                            </p>
                                        </div>
                                    </div>
                                    {index < mockTransactions.length - 1 && <Separator />}
                                </React.Fragment>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground py-8">No transactions yet.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
