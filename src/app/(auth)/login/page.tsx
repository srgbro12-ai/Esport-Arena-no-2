'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Smartphone,
  KeyRound,
  Gift,
  ArrowRight,
  User,
} from 'lucide-react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from '@/firebase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// A simple component to represent the Google button
const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.7 0 259.4 0 120.3 105.8 8 241.8 8c66.2 0 119.3 24.4 162.7 65.5L345 165.6C319.2 142.2 284.8 124.4 241.8 124.4c-76.3 0-137.9 61.5-137.9 137.9 0 76.3 61.6 137.9 137.9 137.9 88.3 0 124.2-66.6 128.9-101.4H241.8v-72.5h246.2c2.6 14.7 4.2 30.8 4.2 48.9z"></path>
  </svg>
);


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // You can handle redirection or state update here
      toast({ title: "Successfully signed in with Google!" });
    } catch (error: any) {
      console.error(error);
      toast({ variant: "destructive", title: "Google sign-in failed", description: error.message });
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Successfully signed in!" });
    } catch (error: any) {
      console.error(error);
      toast({ variant: "destructive", title: "Sign-in failed", description: error.message });
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
       <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_1%,transparent_100%)]"></div>
      <Card className="w-full max-w-md z-10 border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-glow">
            Welcome to Esport Arena
          </CardTitle>
          <CardDescription>
            Sign in or create an account to start competing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full font-bold" onClick={handleGoogleSignIn}>
              <GoogleIcon />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email"><Mail className="mr-2 h-4 w-4" /> Email</TabsTrigger>
                <TabsTrigger value="phone"><Smartphone className="mr-2 h-4 w-4"/> Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="gamer@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="button" className="w-full font-bold" onClick={handleEmailLogin}>
                  Continue with Email
                </Button>
              </TabsContent>
              <TabsContent value="phone" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                </div>
                <Button type="submit" className="w-full font-bold">
                  Send OTP
                </Button>
              </TabsContent>
            </Tabs>
            
            <Separator />

            <div className="space-y-2">
                <Label htmlFor="referral">Referral Code (Optional)</Label>
                <Input id="referral" placeholder="Enter referral code" />
            </div>

          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link href="#" className="underline hover:text-primary">
              Terms of Service
            </Link>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
