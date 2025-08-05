"use client"

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  Users, 
  BarChart3, 
  Lightbulb, 
  TrendingUp, 
  MapPin,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { apiClient } from '@/lib/api';

const staticStats = [
  {
    title: 'Total Buildings',
    value: '2,547',
    change: '12',
    icon: Building,
    color: 'text-primary',
  },
  {
    title: 'Community Feedback',
    value: '15,234',
    change: '24',
    icon: MessageSquare,
    color: 'text-secondary',
  },
  {
    title: 'Active Projects',
    value: '156',
    change: '8',
    icon: BarChart3,
    color: 'text-accent',
  },
  {
    title: 'AI Suggestions',
    value: '89',
    change: '15',
    icon: Lightbulb,
    color: 'text-success',
  },
];

const recentActivity = [
  {
    id: 1,
    title: 'New feedback submitted for Pine Towers',
    description: 'Resident reported noise concerns in the evening',
    time: '2 hours ago',
    type: 'feedback',
    icon: MessageSquare,
  },
  {
    id: 2,
    title: 'AI suggestion generated for Kilimani Mall',
    description: 'Recommended green balcony implementation',
    time: '4 hours ago',
    type: 'suggestion',
    icon: Lightbulb,
  },
  {
    id: 3,
    title: 'Building verification completed',
    description: 'Westlands Plaza has been verified and mapped',
    time: '6 hours ago',
    type: 'success',
    icon: CheckCircle,
  },
  {
    id: 4,
    title: 'Walkability analysis updated',
    description: 'New pedestrian pathways analyzed for safety',
    time: '1 day ago',
    type: 'analysis',
    icon: MapPin,
  },
];

const quickActions = [
  {
    title: 'Add Building',
    description: 'Map a new building in Kilimani',
    icon: Building,
    href: '/buildings/add',
    color: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    title: 'View Analytics',
    description: 'Explore community insights',
    icon: BarChart3,
    href: '/analytics',
    color: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  {
    title: 'Submit Feedback',
    description: 'Share your thoughts on developments',
    icon: MessageSquare,
    href: '/feedback/new',
    color: 'bg-accent/10 text-accent border-accent/20',
  },
  {
    title: 'AI Suggestions',
    description: 'Review intelligent recommendations',
    icon: Lightbulb,
    href: '/suggestions',
    color: 'bg-success/10 text-success border-success/20',
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'Urban Planner',
    isVerified: true,
  });
  const [stats, setStats] = useState(staticStats);

  useEffect(() => {
    apiClient.getStatistics().then((apiStats) => {
      if (Array.isArray(apiStats) && apiStats.length > 0) {
        // Map API stats to dashboard cards
        setStats([
          {
            title: 'Total Buildings',
            value: apiStats.length.toLocaleString(),
            change: '12',
            icon: Building,
            color: 'text-primary',
          },
          {
            title: 'Community Feedback',
            value: apiStats.reduce((sum, b) => sum + (b.feedback_count || 0), 0).toLocaleString(),
            change: '24',
            icon: MessageSquare,
            color: 'text-secondary',
          },
          {
            title: 'Active Projects',
            value: '156',
            change: '8',
            icon: BarChart3,
            color: 'text-accent',
          },
          {
            title: 'AI Suggestions',
            value: '89',
            change: '15',
            icon: Lightbulb,
            color: 'text-success',
          },
        ]);
      }
    }).catch(() => setStats(staticStats));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user.name}
              </h1>
              <p className="mt-2 text-muted-foreground">
                Here's what's happening in your Kilimani community today.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-success border-success/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Resident
              </Badge>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-success flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to get you started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.title}
                      variant="outline"
                      className="w-full justify-start h-auto p-4"
                      asChild
                    >
                      <a href={action.href}>
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${action.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{action.title}</p>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                      </a>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates from your community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground mr-1" />
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Community Goals Progress</CardTitle>
              <CardDescription>
                Track progress towards sustainable development goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Green Space Implementation</p>
                    <p className="text-sm text-muted-foreground">67%</p>
                  </div>
                  {/* <Progress value={67} className="h-2" /> */}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Walkability Improvement</p>
                    <p className="text-sm text-muted-foreground">45%</p>
                  </div>
                  {/* <Progress value={45} className="h-2" /> */}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Noise Reduction</p>
                    <p className="text-sm text-muted-foreground">82%</p>
                  </div>
                  {/* <Progress value={82} className="h-2" /> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}