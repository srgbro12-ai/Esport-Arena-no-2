
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
  SidebarSeparator,
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
  LayoutDashboard,
  Library,
  Users,
  Captions,
  Copyright,
  DollarSign,
  Wand2,
  Music,
  Rocket,
  MessageCircleQuestion,
} from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ContentProvider } from '@/context/content-context';
import { ProfileProvider, useProfile } from '@/context/ProfileContext';
import { useUser } from '@/firebase';


const studioNavItems = [
  { href: '/studio/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/studio/content', icon: Library, label: 'Content' },
  { href: '/studio/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/studio/community', icon: Users, label: 'Community' },
  { href: '/studio/subtitles', icon: Captions, label: 'Subtitles' },
  { href: '/studio/copyright', icon: Copyright, label: 'Copyright' },
  { href: '/studio/earn', icon: DollarSign, label: 'Earn' },
  { href: '/studio/customization', icon: Wand2, label: 'Customization' },
  { href: '/studio/audio-library', icon: Music, label: 'Audio library' },
  { href: '/studio/promotions', icon: Rocket, label: 'Promotions' },
];

const mainNavItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/store', icon: Store, label: 'Store' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
];

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { profile } = useProfile();
  const isStudioPage = pathname.startsWith('/studio');

  const channelUsername = profile.handle.startsWith('@') ? profile.handle.substring(1) : profile.handle;

  const sidebarContent = isStudioPage ? (
    <>
      <SidebarHeader className="p-4">
        <Link href={channelUsername ? `/channel/${channelUsername}` : '#'} className="flex flex-col items-center text-center gap-2 w-full">
          <Avatar className="w-16 h-16 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 transition-all">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="font-semibold">Your Channel</p>
            <p className="text-xs text-muted-foreground">{profile.name}</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {studioNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
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
        <SidebarSeparator />
        <SidebarMenu>
           <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{children: 'Settings'}}>
              <Link href="/studio/settings">
                <Settings className="icon-glow" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{children: 'Send feedback'}}>
              <Link href="/feedback">
                <MessageCircleQuestion className="icon-glow" />
                <span>Send feedback</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  ) : (
    <>
      <SidebarHeader className="items-center justify-center p-4">
        <Trophy className="size-8 text-primary icon-glow transition-all group-data-[collapsible=icon]:size-6" />
        <h1 className="font-headline text-2xl font-bold text-glow transition-opacity group-data-[collapsible=icon]:opacity-0">
          Esport Arena
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon className="icon-glow" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
           <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/studio')}
                tooltip={{ children: 'MyTube Studio' }}
              >
                <Link href="/studio/analytics">
                  <Clapperboard className="icon-glow" />
                  <span>MyTube Studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith(`/channel`)} tooltip={{children: 'My Channel'}}>
                <Link href={user && profile.handle ? `/channel/${profile.handle.replace('@', '')}` : (user ? '/complete-profile' : '/login')}>
                <User className="icon-glow" />
                <span>My Channel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );

  return (
      <ContentProvider>
        <SidebarProvider>
          <Sidebar side="left" variant="sidebar" collapsible="icon">
            {sidebarContent}
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
      </ContentProvider>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </ProfileProvider>
  );
}
