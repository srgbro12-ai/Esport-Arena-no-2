'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useContent } from '@/context/content-context';
import { mockUser } from '@/lib/mock-data';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Eye, Users, Clock, Video } from 'lucide-react';
import { format, subDays } from 'date-fns';

// Mock data generation for charts
const generateChartData = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = subDays(new Date(), i);
    return {
      date: format(date, 'MMM dd'),
      views: Math.floor(Math.random() * 5000) + 1000,
      watchTime: Math.floor(Math.random() * 200) + 50,
      subscribers: Math.floor(Math.random() * 50) - 10,
    };
  }).reverse();
};

const last28DaysData = generateChartData(28);
const last7DaysData = last28DaysData.slice(-7);


export default function AnalyticsPage() {
  const { videos, shorts, getSubscriberCount } = useContent();
  const myVideos = [...videos, ...shorts].filter(v => v.channelId === mockUser.username);
  
  const totalViews = myVideos.reduce((acc, v) => acc + parseInt(v.views.replace(/,/g, ''), 10), 0);
  const subscriberCount = getSubscriberCount(mockUser.username);
  
  const topVideos = [...myVideos]
    .sort((a, b) => parseInt(b.views.replace(/,/g, ''), 10) - parseInt(a.views.replace(/,/g, ''), 10))
    .slice(0, 5);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-glow mb-6">Analytics</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriberCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time (Hours)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myVideos.length}</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
            <CardTitle>Views</CardTitle>
            <CardDescription>Your channel's views in the last 28 days.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={last28DaysData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))'
                    }}
                />
                <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
      
       <div className="grid gap-6 md:grid-cols-2">
           <Card>
            <CardHeader>
                <CardTitle>Top Videos</CardTitle>
                <CardDescription>Your top videos in the last 28 days.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {topVideos.map(video => (
                        <div key={video.id} className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate pr-4">{video.title}</span>
                            <span className="text-sm text-muted-foreground">{parseInt(video.views.replace(/,/g, '')).toLocaleString()} views</span>
                        </div>
                    ))}
                </div>
            </CardContent>
           </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Subscriber Growth</CardTitle>
                    <CardDescription>New subscribers gained in the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={last7DaysData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))'
                                }}
                                cursor={{fill: 'hsl(var(--muted))'}}
                            />
                            <Bar dataKey="subscribers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
