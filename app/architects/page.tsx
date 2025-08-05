"use client"

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Chatbot } from '@/components/chat/chatbot';
import { 
  Building, 
  Upload, 
  Eye,
  MessageSquare,
  FileText,
  Image,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Design, Building as BuildingType } from '@/lib/types';

const mockDesigns: Design[] = [
  {
    id: '1',
    building_id: '1',
    architect_id: 'arch1',
    title: 'Pine Towers Green Renovation',
    description: 'Sustainable renovation with green balconies and rooftop gardens',
    images: ['design1.jpg', 'design2.jpg'],
    documents: ['plans.pdf', 'specifications.pdf'],
    created_at: '2025-01-10T10:00:00Z',
    status: 'approved',
    feedback_count: 23
  },
  {
    id: '2',
    building_id: '2',
    architect_id: 'arch1',
    title: 'Harmony Heights Community Design',
    description: 'Mixed-use development with emphasis on walkability and community spaces',
    images: ['design3.jpg'],
    documents: ['concept.pdf'],
    created_at: '2025-01-08T14:30:00Z',
    status: 'submitted',
    feedback_count: 15
  },
  {
    id: '3',
    building_id: '3',
    architect_id: 'arch1',
    title: 'Kilimani Plaza Biophilic Design',
    description: 'Commercial space with living walls and natural lighting',
    images: ['design4.jpg', 'design5.jpg', 'design6.jpg'],
    documents: ['environmental_impact.pdf'],
    created_at: '2025-01-05T09:15:00Z',
    status: 'draft',
    feedback_count: 8
  }
];

const mockBuildings: BuildingType[] = [
  {
    id: '1',
    name: 'Pine Towers',
    latitude: -1.2921,
    longitude: 36.8219,
    description: 'Modern mixed-use building',
    zone_type: 'residential',
    walkability_rating: 3.2,
    noise_level: 4.1,
    feedback_count: 45,
    green_features: ['Rooftop Garden'],
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Harmony Heights',
    latitude: -1.2935,
    longitude: 36.8201,
    description: 'Proposed residential complex',
    zone_type: 'residential',
    walkability_rating: 0,
    noise_level: 0,
    feedback_count: 23,
    green_features: [],
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    status: 'proposed'
  }
];

export default function ArchitectsPage() {
  const [designs, setDesigns] = useState<Design[]>(mockDesigns);
  const [buildings, setBuildings] = useState<BuildingType[]>(mockBuildings);
  const [selectedTab, setSelectedTab] = useState('my-designs');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'submitted': return 'bg-warning/10 text-warning border-warning/20';
      case 'rejected': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-3 w-3" />;
      case 'submitted': return <Clock className="h-3 w-3" />;
      case 'rejected': return <AlertTriangle className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Architect Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Design sustainable buildings with community feedback and data-driven insights.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{designs.length}</p>
                  <p className="text-sm text-muted-foreground">Total Designs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-success/10">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {designs.filter(d => d.status === 'approved').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved</p>
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
                    {designs.reduce((sum, d) => sum + d.feedback_count, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Community Feedback</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-accent/10">
                  <Building className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {buildings.filter(b => b.status === 'proposed').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Available Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="my-designs">My Designs</TabsTrigger>
            <TabsTrigger value="available-projects">Available Projects</TabsTrigger>
            <TabsTrigger value="community-feedback">Community Feedback</TabsTrigger>
          </TabsList>

          {/* My Designs Tab */}
          <TabsContent value="my-designs" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Design Portfolio</h2>
              <Button className="gradient-primary text-white">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Design
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {designs.map((design) => (
                <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Image className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{design.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {buildings.find(b => b.id === design.building_id)?.name}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(design.status)}>
                        {getStatusIcon(design.status)}
                        <span className="ml-1 capitalize">{design.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{design.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <span>{design.images.length} images</span>
                        <span>{design.documents.length} documents</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{design.feedback_count} feedback</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        View Feedback
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Available Projects Tab */}
          <TabsContent value="available-projects" className="mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Available Projects</h2>
              <p className="text-muted-foreground">Proposed buildings looking for architectural designs</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {buildings.filter(b => b.status === 'proposed').map((building) => (
                <Card key={building.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48">
                    <img
                      src={building.image}
                      alt={building.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{building.name}</CardTitle>
                    <CardDescription>{building.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <Badge variant="outline" className="capitalize">
                        {building.zone_type}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{building.feedback_count} community feedback</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Requirements
                      </Button>
                      <Button size="sm" className="flex-1 gradient-primary text-white">
                        <Upload className="h-4 w-4 mr-1" />
                        Submit Design
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Feedback Tab */}
          <TabsContent value="community-feedback" className="mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Community Feedback Analysis</h2>
              <p className="text-muted-foreground">Insights from residents to inform your designs</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Community Requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Green Spaces & Balconies</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Better Walkability</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Noise Reduction</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                      <span className="text-sm font-medium">52%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Community Spaces</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: '47%' }}></div>
                      </div>
                      <span className="text-sm font-medium">47%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Design Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-success/10">
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Biophilic Design Elements</p>
                      <p className="text-sm text-muted-foreground">
                        High demand for green balconies and living walls
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Community-Centric Spaces</p>
                      <p className="text-sm text-muted-foreground">
                        Include shared areas and recreational facilities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-warning/10">
                      <Building className="h-4 w-4 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Elevated Ground Floors</p>
                      <p className="text-sm text-muted-foreground">
                        Create public spaces and improve walkability
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Chatbot context={{ type: 'general' }} />
    </div>
  );
}