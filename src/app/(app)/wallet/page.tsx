'use client';

import { SRcoinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AddCoinsDialog } from "@/components/add-coins-dialog";
import { WithdrawDialog } from "@/components/withdraw-dialog";
import { useContent, type Transaction } from "@/context/content-context";

export default function WalletPage() {
    const { walletBalance, transactions } = useContent();

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold">SR Coin Wallet</h1>
                    <p className="text-muted-foreground">Manage your coins and view transaction history.</p>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Current Balance</CardTitle>
                            <CardDescription>Available to use in tournaments and store</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <AddCoinsDialog />
                            <WithdrawDialog />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <SRcoinIcon className="w-12 h-12 text-primary mr-4" />
                            <span className="text-5xl font-bold font-headline">{walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Wallet History</CardTitle>
                        <CardDescription>A record of all your transactions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="add">Added</TabsTrigger>
                                <TabsTrigger value="use">Used</TabsTrigger>
                                <TabsTrigger value="withdraw">Withdrawn</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all" className="mt-4">
                               <TransactionTable transactions={transactions} />
                            </TabsContent>
                            <TabsContent value="add" className="mt-4">
                                <TransactionTable transactions={transactions.filter(t => t.type === 'add_money' || t.type === 'prize')} />
                            </TabsContent>
                            <TabsContent value="use" className="mt-4">
                                <TransactionTable transactions={transactions.filter(t => t.type === 'entry_fee')} />
                            </TabsContent>
                             <TabsContent value="withdraw" className="mt-4">
                                <TransactionTable transactions={transactions.filter(t => t.type === 'withdraw')} />
                             </Tabs_Content>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
    const getTransactionDetails = (type: Transaction['type']) => {
        switch (type) {
            case 'withdraw': return { icon: <ArrowUpRight className="text-red-400" />, label: 'Withdrawal' };
            case 'entry_fee': return { icon: <ArrowUpRight className="text-yellow-400" />, label: 'Entry Fee' };
            case 'add_money': return { icon: <ArrowDownLeft className="text-green-400" />, label: 'Added Money' };
            case 'prize': return { icon: <ArrowDownLeft className="text-green-400" />, label: 'Prize Won' };
            default: return { icon: null, label: 'Transaction' };
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map(tx => {
                    const { icon, label } = getTransactionDetails(tx.type);
                    return (
                        <TableRow key={tx.id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {icon}
                                    <span className="font-medium">{label}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                            <TableCell>
                                <Badge variant={tx.status === 'Completed' || tx.status === 'Paid' || tx.status === 'Won' ? 'default' : 'secondary'}
                                    className={tx.status === 'Completed' || tx.status === 'Paid' || tx.status === 'Won' ? 'bg-green-500/20 text-green-300 border-green-500/30' : tx.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'}
                                >
                                    {tx.status}
                                </Badge>
                            </TableCell>
                            <TableCell className={`text-right font-semibold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}