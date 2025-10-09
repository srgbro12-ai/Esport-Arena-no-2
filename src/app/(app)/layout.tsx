'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Trophy,
  Home,
  Store,
  BarChart3,
  Clapperboard,
  MessageSquare,
  Wallet,
  User,
  Settings,
  LifeBuoy,
} from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { mockUser } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/tournaments', icon: Trophy, label: 'Tournaments' },
  { href: '/leaderboard', icon: BarChart3, label: 'Leaderboard' },
  { href: '/store', icon: Store, label: 'Store' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="items-center justify-center p-4">
          <Trophy className="size-8 text-primary icon-glow transition-all group-data-[collapsible=icon]:size-6" />
          <h1 className="font-headline text-2xl font-bold text-glow transition-opacity group-data-[collapsible=icon]:opacity-0">
            Esport Arena
          </h1>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon className="icon-glow" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2">
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/studio')} tooltip={{children: 'MyTube Studio'}}>
                 <Link href="/studio">
                  <Clapperboard className="icon-glow" />
                  <span>MyTube Studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith(`/channel`)} tooltip={{children: 'My Channel'}}>
                 <Link href={`/channel/${mockUser.username}`}>
                  <User className="icon-glow" />
                  <span>My Channel</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <div className="flex flex-1 flex-col">
        <AppHeader />
        <SidebarInset>{children}</SidebarInset>
      </div>

      <div className="fixed bottom-5 right-5 z-50">
        <Button className="rounded-full w-16 h-16 shadow-lg shadow-primary/30">
          <LifeBuoy className="w-8 h-8" />
          <span className="sr-only">Customer Support</span>
        </Button>
      </div>
    </SidebarProvider>
  );
}
