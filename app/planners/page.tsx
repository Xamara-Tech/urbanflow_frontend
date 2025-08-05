"use client"

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Progress } from '@/components/ui/progress';
import { Chatbot } from '@/components/chat/chatbot';
import { 
  Building, 
  MapPin, 
  BarChart3,
  Users,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  MessageSquare,
  FileText,
  Map
} from 'lucide-react';
import { Building as BuildingType, Design, Feedback } from '@/lib/types';


import { apiClient } from '@/lib/api';

const staticBuildings: BuildingType[] = [
  {
    id: '1',
    name: 'Pine Towers',
    latitude: -1.2921,
    longitude: 36.8219,
    description: 'Modern mixed-use building with retail and residential spaces',
    zone_type: 'residential',
    walkability_rating: 3.2,
    noise_level: 4.1,
    feedback_count: 45,
    green_features: ['Rooftop Garden', 'Green Balconies'],
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    status: 'completed',
  },
  {
    id: '2',
    name: 'Harmony Heights',
    latitude: -1.2935,
    longitude: 36.8201,
    description: 'Proposed residential complex with community spaces',
    zone_type: 'residential',
    walkability_rating: 0,
    noise_level: 0,
    feedback_count: 23,
    green_features: ['Community Garden', 'Green Courtyards'],
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    status: 'proposed',
  },
  {
    id: '3',
    name: 'Kilimani Plaza',
    latitude: -1.2898,
    longitude: 36.8156,
    description: 'Commercial development under construction',
    zone_type: 'commercial',
    walkability_rating: 0,
    noise_level: 0,
    feedback_count: 67,
    green_features: ['Living Walls', 'Solar Panels'],
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    status: 'ongoing',
  },
];

const staticAiSuggestions = [
  {
    id: 1,
    building: 'Pine Towers',
    type: 'Noise Mitigation',
    reason: '67% of residents reported noise issues during evening hours',
    impact: 'High',
    priority: 'urgent',
    votes: 34,
    description: 'Install sound barriers and designate quiet zones'
  },
  {
    id: 2,
    building: 'Harmony Heights',
    type: 'Green Infrastructure',
    reason: '89% demand for more green spaces and biophilic design',
    impact: 'High',
    priority: 'high',
    votes: 67,
    description: 'Implement rooftop gardens and green balcony systems'
  },
  {
    id: 3,
    building: 'Kilimani Plaza',
    type: 'Walkability Enhancement',
    reason: 'Low walkability score (2.8/5) and pedestrian safety concerns',
    impact: 'Medium',
    priority: 'medium',
    votes: 28,
    description: 'Create elevated walkways and improve lighting'
  },
  {
    id: 4,
    building: 'General Area',
    type: 'Traffic Management',
    reason: 'Multiple reports of parking issues affecting walkability',
    impact: 'Medium',
    priority: 'medium',
    votes: 15,
    description: 'Implement smart parking solutions and pedestrian zones'
  },
];

const planningMetrics = [
  {
    title: 'Community Engagement',
    value: 94,
    target: 90,
    trend: '+12',
    description: 'Residents actively providing feedback'
  },
  {
    title: 'Green Space Coverage',
    value: 67,
    target: 75,
    trend: '+8',
    description: 'Buildings with biophilic design elements'
  },
  {
    title: 'Walkability Score',
    value: 72,
    target: 80,
    trend: '+15',
    description: 'Average walkability across all areas'
  },
  {
    title: 'Noise Compliance',
    value: 78,
    target: 85,
    trend: '+5',
    description: 'Buildings meeting noise level standards'
  },
];

export default function PlannersPage() {
  const [buildings, setBuildings] = useState<BuildingType[]>(staticBuildings);
  const [aiSuggestions, setAiSuggestions] = useState(staticAiSuggestions);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    apiClient.getBuildings().then((apiBuildings) => {
      if (Array.isArray(apiBuildings) && apiBuildings.length > 0) {
        setBuildings(apiBuildings);
      }
    }).catch(() => setBuildings(staticBuildings));
    apiClient.getSuggestions().then((apiSuggestions) => {
      if (Array.isArray(apiSuggestions) && apiSuggestions.length > 0) {
        setAiSuggestions(apiSuggestions);
      }
    }).catch(() => setAiSuggestions(staticAiSuggestions));
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-error/10 text-error border-error/20';
      case 'high': return 'bg-warning/10 text-warning border-warning/20';
      case 'medium': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Urban Planner Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive insights for data-driven urban development in Kilimani.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{buildings.length}</p>
                  <p className="text-sm text-muted-foreground">Total Buildings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-warning/10">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {aiSuggestions.filter(s => s.priority === 'urgent').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Urgent Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-secondary/10">
                  <MessageSquare className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {buildings.reduce((sum, b) => sum + b.feedback_count, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Community Feedback</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-success/10">
                  <Lightbulb className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{aiSuggestions.length}</p>
                  <p className="text-sm text-muted-foreground">AI Suggestions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="buildings">Buildings & Designs</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="gis-data">GIS & Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Planning Metrics</CardTitle>
                    <CardDescription>Key performance indicators for urban development</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {planningMetrics.map((metric) => (
                      <div key={metric.title}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">{metric.title}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-success">{metric.trend}</span>
                            <span className="text-sm font-medium">{metric.value}%</span>
                          </div>
                        </div>
                        {/* <Progress value={metric.value} className="h-2 mb-1" /> */}
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{metric.description}</span>
                          <span>Target: {metric.target}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Community Concerns</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-error/10">
                        <AlertTriangle className="h-4 w-4 text-error" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Noise Complaints Spike</p>
                        <p className="text-sm text-muted-foreground">
                          67% increase in evening noise reports from Pine Towers area
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-warning/10">
                        <MapPin className="h-4 w-4 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Walkability Issues</p>
                        <p className="text-sm text-muted-foreground">
                          Multiple reports of blocked pedestrian pathways
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-success/10">
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Green Space Demand</p>
                        <p className="text-sm text-muted-foreground">
                          89% of residents want more biophilic design elements
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Development Status</CardTitle>
                    <CardDescription>Current projects across Kilimani</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {buildings.map((building) => (
                        <div key={building.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-primary/10">
                              <Building className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{building.name}</p>
                              <p className="text-xs text-muted-foreground">{building.zone_type}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(building.status)} variant="outline">
                              {building.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {building.feedback_count} feedback
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Map className="h-4 w-4 mr-2" />
                      View GIS Map
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Review AI Suggestions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Buildings & Designs Tab */}
          <TabsContent value="buildings" className="mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Buildings & Architectural Designs</h2>
              <p className="text-muted-foreground">Review building data and architectural submissions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {buildings.map((building) => (
                <Card key={building.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48">
                    <img
                      src={building.image}
                      alt={building.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{building.name}</CardTitle>
                        <CardDescription>{building.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(building.status)} variant="outline">
                        {building.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Zone Type</p>
                          <p className="font-medium capitalize">{building.zone_type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Feedback</p>
                          <p className="font-medium">{building.feedback_count} entries</p>
                        </div>
                      </div>

                      {building.walkability_rating > 0 && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Walkability</p>
                            <p className="font-medium">{building.walkability_rating}/5.0</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Noise Level</p>
                            <p className="font-medium">{building.noise_level}/5.0</p>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1">
                          <FileText className="h-4 w-4 mr-1" />
                          Review Designs
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">AI-Generated Planning Insights</h2>
              <p className="text-muted-foreground">Data-driven recommendations for urban development</p>
            </div>

            <div className="space-y-6">
              {aiSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Lightbulb className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{suggestion.type}</h3>
                          <p className="text-muted-foreground">{suggestion.building}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority}
                        </Badge>
                        <Badge variant="outline">
                          Impact: {suggestion.impact}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-sm mb-1">Analysis</p>
                        <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm mb-1">Recommendation</p>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{suggestion.votes} community votes</span>
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm" className="gradient-primary text-white">
                          Implement
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* GIS & Analytics Tab */}
          <TabsContent value="gis-data" className="mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">GIS Data & Spatial Analytics</h2>
              <p className="text-muted-foreground">Geographic information and spatial analysis tools</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Map</CardTitle>
                  <CardDescription>Kilimani area with building data overlay</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Interactive GIS Map</p>
                      <p className="text-xs text-muted-foreground">Click to view full map</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spatial Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Population Density</span>
                      <span className="font-medium">2,847 people/km²</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Green Space Coverage</span>
                      <span className="font-medium">23.4%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Building Height</span>
                      <span className="font-medium">4.2 floors</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Traffic Flow Index</span>
                      <span className="font-medium">7.3/10</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Layers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Building className="h-4 w-4 mr-2" />
                      Building Footprints
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      Zoning Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Infrastructure
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Demographics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Chatbot context={{ type: 'general' }} />
    </div>
  );
}