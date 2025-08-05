"use client"

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Search, 
  MapPin, 
  Filter,
  Eye,
  MessageSquare,
  BarChart3,
  TreePine,
  Users,
  Star
} from 'lucide-react';

const buildings = [
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
  },
  {
    id: '2',
    name: 'Kilimani Mall',
    latitude: -1.2935,
    longitude: 36.8201,
    description: 'Shopping center with biophilic design elements',
    zone_type: 'commercial',
    walkability_rating: 4.5,
    noise_level: 3.8,
    feedback_count: 128,
    green_features: ['Living Walls', 'Natural Lighting', 'Green Parking'],
    image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Westlands Plaza',
    latitude: -1.2898,
    longitude: 36.8156,
    description: 'Office complex with sustainable architecture',
    zone_type: 'commercial',
    walkability_rating: 4.1,
    noise_level: 2.9,
    feedback_count: 67,
    green_features: ['Solar Panels', 'Rainwater Harvesting', 'Green Roof'],
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  },
  {
    id: '4',
    name: 'Harmony Residences',
    latitude: -1.2910,
    longitude: 36.8190,
    description: 'Residential apartment complex with community spaces',
    zone_type: 'residential',
    walkability_rating: 3.8,
    noise_level: 3.5,
    feedback_count: 89,
    green_features: ['Community Garden', 'Play Areas', 'Green Courtyards'],
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  },
  {
    id: '5',
    name: 'Tech Hub Kilimani',
    latitude: -1.2888,
    longitude: 36.8234,
    description: 'Modern co-working space with innovation labs',
    zone_type: 'commercial',
    walkability_rating: 4.3,
    noise_level: 3.2,
    feedback_count: 156,
    green_features: ['Vertical Gardens', 'Energy Efficient', 'Bike Parking'],
    image: 'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  },
  {
    id: '6',
    name: 'Green Heights',
    latitude: -1.2905,
    longitude: 36.8178,
    description: 'Eco-friendly residential towers with smart features',
    zone_type: 'residential',
    walkability_rating: 3.9,
    noise_level: 3.1,
    feedback_count: 203,
    green_features: ['Smart Home', 'Green Terraces', 'EV Charging'],
    image: 'https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  },
];

const zoneTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'residential', label: 'Residential', color: 'bg-primary/10 text-primary' },
  { value: 'commercial', label: 'Commercial', color: 'bg-secondary/10 text-secondary' },
  { value: 'mixed', label: 'Mixed-Use', color: 'bg-accent/10 text-accent' },
];

export default function BuildingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [filteredBuildings, setFilteredBuildings] = useState(buildings);

  useEffect(() => {
    let filtered = buildings;
    
    if (searchTerm) {
      filtered = filtered.filter(building =>
        building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        building.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedZone !== 'all') {
      filtered = filtered.filter(building => building.zone_type === selectedZone);
    }
    
    setFilteredBuildings(filtered);
  }, [searchTerm, selectedZone]);

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-error';
  };

  const getZoneColor = (zoneType: string) => {
    const zone = zoneTypes.find(z => z.value === zoneType);
    return zone?.color || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Buildings Directory</h1>
          <p className="mt-2 text-muted-foreground">
            Explore mapped buildings in Kilimani with community insights and analytics.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search buildings..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {zoneTypes.map((zone) => (
              <Button
                key={zone.value}
                variant={selectedZone === zone.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedZone(zone.value)}
                className={selectedZone === zone.value ? "" : zone.color}
              >
                {zone.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <Building className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredBuildings.length}</p>
                <p className="text-sm text-muted-foreground">Buildings Found</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {filteredBuildings.reduce((sum, b) => sum + b.feedback_count, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <TreePine className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {filteredBuildings.filter(b => b.green_features.length > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Green Buildings</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuildings.map((building) => (
            <Card key={building.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <img
                  src={building.image}
                  alt={building.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getZoneColor(building.zone_type)}>
                    {building.zone_type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90 text-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {building.latitude.toFixed(4)}, {building.longitude.toFixed(4)}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{building.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-warning fill-current" />
                    <span className="text-sm font-medium">{building.walkability_rating}</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {building.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Walkability</p>
                      <p className={`font-medium ${getRatingColor(building.walkability_rating)}`}>
                        {building.walkability_rating}/5.0
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Noise Level</p>
                      <p className={`font-medium ${getRatingColor(5 - building.noise_level)}`}>
                        {building.noise_level}/5.0
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Green Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {building.green_features.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                          {feature}
                        </Badge>
                      ))}
                      {building.green_features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{building.green_features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {building.feedback_count} feedback
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBuildings.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No buildings found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more buildings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}