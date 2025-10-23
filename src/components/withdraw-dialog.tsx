'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export function WithdrawDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary"><ArrowUpRight className="mr-2" /> Withdraw</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Withdraw Coins</DialogTitle>
                    <DialogDescription>
                        Enter the amount you wish to withdraw and your UPI ID.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="withdraw-amount" className="text-right">
                            Amount
                        </Label>
                        <Input id="withdraw-amount" defaultValue="500" className="col-span-3" type="number" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="upi-id" className="text-right">
                            UPI ID
                        </Label>
                        <Input id="upi-id" placeholder="yourname@bank" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Request Withdrawal</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}