"use client"

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Progress } from '@/components/ui/progress';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Building, TreePine, MapPin, ThumbsUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { apiClient } from '@/lib/api';

const staticOverviewStats = [
  {
    title: 'Community Engagement',
    value: '94',
    change: '12',
    icon: Users,
    color: 'text-primary',
    description: 'Residents actively providing feedback'
  },
  {
    title: 'Green Space Demand',
    value: '67',
    change: '8',
    icon: TreePine,
    color: 'text-success',
    description: 'Want more biophilic designs'
  },
  {
    title: 'Walkability Score',
    value: '3.8/5',
    change: '0.3',
    icon: MapPin,
    color: 'text-secondary',
    description: 'Average across all buildings'
  },
  {
    title: 'Positive Sentiment',
    value: '78',
    change: '15',
    icon: ThumbsUp,
    color: 'text-accent',
    description: 'Of all community feedback'
  },
];

const staticBuildingInsights = [
  {
    building: 'Kilimani Mall',
    walkability_avg: 4.5,
    green_space_demand_pct: 67,
    noise_complaints: 8,
    sentiment: 'positive',
    feedback_count: 128,
    top_requests: ['Green Spaces', 'Better Lighting', 'Seating Areas']
  },
  {
    building: 'Pine Towers',
    walkability_avg: 3.2,
    green_space_demand_pct: 78,
    noise_complaints: 23,
    sentiment: 'mixed',
    feedback_count: 45,
    top_requests: ['Noise Control', 'Green Balconies', 'Security']
  },
  {
    building: 'Tech Hub Kilimani',
    walkability_avg: 4.3,
    green_space_demand_pct: 45,
    noise_complaints: 5,
    sentiment: 'positive',
    feedback_count: 156,
    top_requests: ['Parking', 'Cafeteria', 'Meeting Rooms']
  },
  {
    building: 'Green Heights',
    walkability_avg: 3.9,
    green_space_demand_pct: 89,
    noise_complaints: 12,
    sentiment: 'positive',
    feedback_count: 203,
    top_requests: ['Playground', 'Community Garden', 'Gym']
  },
];

const staticSentimentData = [
  { category: 'Green Spaces', positive: 85, neutral: 10, negative: 5 },
  { category: 'Walkability', positive: 62, neutral: 28, negative: 10 },
  { category: 'Noise Levels', positive: 34, neutral: 31, negative: 35 },
  { category: 'Security', positive: 71, neutral: 20, negative: 9 },
  { category: 'Parking', positive: 43, neutral: 25, negative: 32 },
];

const staticAiSuggestions = [
  {
    id: 1,
    building: 'Pine Towers',
    type: 'Green Balcony',
    reason: '78% of residents requested green spaces',
    impact: 'High',
    status: 'pending',
    votes: 34
  },
  {
    id: 2,
    building: 'Kilimani Mall',
    type: 'Silent Zone',
    reason: 'Noise complaints during evening hours',
    impact: 'Medium',
    status: 'under_review',
    votes: 28
  },
  {
    id: 3,
    building: 'Green Heights',
    type: 'Community Garden',
    reason: 'High demand for recreational spaces',
    impact: 'High',
    status: 'approved',
    votes: 67
  },
  {
    id: 4,
    building: 'Tech Hub Kilimani',
    type: 'EV Charging Station',
    reason: 'Growing sustainable transport needs',
    impact: 'Medium',
    status: 'pending',
    votes: 15
  },
];

export default function AnalyticsPage() {
  const [overviewStats, setOverviewStats] = useState(staticOverviewStats);
  const [buildingInsights, setBuildingInsights] = useState(staticBuildingInsights);
  const [sentimentData, setSentimentData] = useState(staticSentimentData);
  const [aiSuggestions, setAiSuggestions] = useState(staticAiSuggestions);

  useEffect(() => {
    // Fetch statistics overview
    apiClient.getStatistics().then((stats) => {
      if (Array.isArray(stats) && stats.length > 0) {
        // Map API stats to buildingInsights and overviewStats
        setBuildingInsights(stats.map((b) => ({
          building: b.building,
          walkability_avg: b.walkability_avg,
          green_space_demand_pct: b.green_space_demand_pct,
          noise_complaints: b.noise_complaints,
          sentiment: b.sentiment || 'positive',
          feedback_count: b.feedback_count || 0,
          top_requests: b.top_requests || [],
        })));
        setOverviewStats([
          {
            title: 'Community Engagement',
            value: '94',
            change: '12',
            icon: Users,
            color: 'text-primary',
            description: 'Residents actively providing feedback',
          },
          {
            title: 'Green Space Demand',
            value: String(Math.round(stats.reduce((a, b) => a + (b.green_space_demand_pct || 0), 0) / stats.length)),
            change: '8',
            icon: TreePine,
            color: 'text-success',
            description: 'Want more biophilic designs',
          },
          {
            title: 'Walkability Score',
            value: (stats.reduce((a, b) => a + (b.walkability_avg || 0), 0) / stats.length).toFixed(1) + '/5',
            change: '0.3',
            icon: MapPin,
            color: 'text-secondary',
            description: 'Average across all buildings',
          },
          {
            title: 'Positive Sentiment',
            value: '78',
            change: '15',
            icon: ThumbsUp,
            color: 'text-accent',
            description: 'Of all community feedback',
          },
        ]);
      }
    }).catch(() => {
      setOverviewStats(staticOverviewStats);
      setBuildingInsights(staticBuildingInsights);
    });

    // Optionally fetch sentiment and suggestions if endpoints exist
    // setSentimentData(staticSentimentData);
    // setAiSuggestions(staticAiSuggestions);
  }, []);
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-warning';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'under_review': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Community Analytics</h1>
          <p className="mt-2 text-muted-foreground">
            Data-driven insights from verified Kilimani residents and urban development patterns.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {overviewStats.map((stat) => {
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
                  <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="buildings" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="buildings">Buildings</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          {/* Buildings Tab */}
          <TabsContent value="buildings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Building Performance Insights</CardTitle>
                <CardDescription>
                  Detailed analytics for each mapped building in Kilimani
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {buildingInsights.map((building) => (
                    <div key={building.building} className="border rounded-lg p-6 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Building className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold text-lg">{building.building}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSentimentColor(building.sentiment)}>
                            {building.sentiment}
                          </Badge>
                          <Badge variant="outline">
                            {building.feedback_count} feedback
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Walkability Score</span>
                              <span className="font-medium">{building.walkability_avg}/5.0</span>
                            </div>
                            {/* <Progress value={Number.isFinite(building.walkability_avg) ? Math.max(0, Math.min(100, building.walkability_avg * 20)) : 0} className="h-2" /> */}
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Green Space Demand</span>
                              <span className="font-medium">{building.green_space_demand_pct}%</span>
                            </div>
                            {/* <Progress value={Number.isFinite(building.green_space_demand_pct) ? Math.max(0, Math.min(100, building.green_space_demand_pct)) : 0} className="h-2" /> */}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Noise Complaints</p>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            <span className="text-lg font-semibold">{building.noise_complaints}</span>
                            <span className="text-sm text-muted-foreground">this month</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Top Requests</p>
                          <div className="flex flex-wrap gap-1">
                            {building.top_requests.map((request) => (
                              <Badge key={request} variant="outline" className="text-xs">
                                {request}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sentiment Tab */}
          <TabsContent value="sentiment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Sentiment Analysis</CardTitle>
                <CardDescription>
                  Emotional analysis of resident feedback across different categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sentimentData.map((category) => (
                    <div key={category.category}>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{category.category}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-success rounded-full"></div>
                            <span>{category.positive}%</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-warning rounded-full"></div>
                            <span>{category.neutral}%</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-error rounded-full"></div>
                            <span>{category.negative}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div className="h-full flex">
                          <div 
                            className="bg-success" 
                            style={{ width: `${category.positive}%` }}
                          ></div>
                          <div 
                            className="bg-warning" 
                            style={{ width: `${category.neutral}%` }}
                          ></div>
                          <div 
                            className="bg-error" 
                            style={{ width: `${category.negative}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Suggestions Tab */}
          <TabsContent value="suggestions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Suggestions</CardTitle>
                <CardDescription>
                  Intelligent recommendations based on community feedback and data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Building className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{suggestion.type}</h4>
                            <p className="text-sm text-muted-foreground">{suggestion.building}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(suggestion.status)}>
                            {suggestion.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline">
                            Impact: {suggestion.impact}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{suggestion.reason}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm">
                          <ThumbsUp className="h-4 w-4 text-success" />
                          <span>{suggestion.votes} community votes</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm">Vote</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Development Trends</CardTitle>
                  <CardDescription>
                    Key trends in urban development preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Biophilic Design Demand</span>
                    <span className="font-medium text-success">↑ 34%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Walkability Importance</span>
                    <span className="font-medium text-success">↑ 28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Noise Sensitivity</span>
                    <span className="font-medium text-warning">↑ 15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Community Spaces</span>
                    <span className="font-medium text-success">↑ 42%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Highlights</CardTitle>
                  <CardDescription>
                    Key achievements this month
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">3 Green Projects Approved</p>
                      <p className="text-sm text-muted-foreground">Community-requested biophilic designs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Noise Complaints Down 25%</p>
                      <p className="text-sm text-muted-foreground">Improved urban planning impact</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">1,200+ New Feedback Entries</p>
                      <p className="text-sm text-muted-foreground">Increased community engagement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}