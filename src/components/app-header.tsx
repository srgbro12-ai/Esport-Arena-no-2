'use client';

import Link from 'next/link';
import {
  Bell,
  Clapperboard,
  Home,
  MessageSquare,
  PlusSquare,
  Radio,
  Search,
  Store,
  Trophy,
  Upload,
  User,
  Wallet,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { mockUser } from '@/lib/mock-data';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="hidden md:flex" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Trophy className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-4 text-lg font-medium">
              <Link
                href="/home"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Trophy className="h-6 w-6 text-primary icon-glow" />
                <span className="font-headline">Esport Arena</span>
              </Link>
              <Link href="/home" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link href="/tournaments" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Trophy className="h-5 w-5" />
                Tournaments
              </Link>
               <Link href="/leaderboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Trophy className="h-5 w-5" />
                Leaderboard
              </Link>
              <Link href="/store" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Store className="h-5 w-5" />
                Store
              </Link>
               <Link href="/wallet" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Wallet className="h-5 w-5" />
                Wallet
              </Link>
              <Link href="/messages" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <MessageSquare className="h-5 w-5" />
                Messages
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search channels, videos..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <PlusSquare className="h-5 w-5" />
              <span className="sr-only">Create</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Upload className="mr-2 h-4 w-4" />
              Upload Video
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Radio className="mr-2 h-4 w-4" />
              Go Live
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PlusSquare className="mr-2 h-4 w-4" />
              Create Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Your tournament starts in 1 hour.</DropdownMenuItem>
            <DropdownMenuItem>New message from Team SouL.</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-primary">
                <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  @{mockUser.username}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/channel/${mockUser.username}`}>
                <User className="mr-2 h-4 w-4" />
                <span>My Channel</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/studio">
                <Clapperboard className="mr-2 h-4 w-4" />
                <span>MyTube Studio</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
