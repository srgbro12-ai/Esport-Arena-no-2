'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import React from "react";

export function AddCoinsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2" /> Add Coins</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add SR Coins</DialogTitle>
                    <DialogDescription>
                        Select an amount and payment method to add coins to your wallet.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input id="amount" defaultValue="1000" className="col-span-3" type="number" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Proceed to Payment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}