"use client"

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Chatbot } from '@/components/chat/chatbot';
import { 
  Building, 
  TrendingUp, 
  DollarSign,
  Users,
  BarChart3,
  Eye,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Project, ROIAnalysis } from '@/lib/types';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Pine Towers Renovation',
    description: 'Sustainable renovation with green balconies and noise reduction features',
    building_ids: ['1'],
    status: 'approved',
    budget: 2500000,
    timeline: '18 months',
    community_support: 78,
    created_at: '2025-01-10T10:00:00Z',
    roi_analysis: {
      id: 'roi1',
      project_id: '1',
      investor_id: 'inv1',
      initial_investment: 2500000,
      projected_revenue: 4200000,
      roi_percentage: 68,
      payback_period: 3.2,
      risk_assessment: 'low',
      market_analysis: 'Strong demand for sustainable housing in Kilimani area',
      created_at: '2025-01-10T10:00:00Z'
    }
  },
  {
    id: '2',
    name: 'Harmony Heights Development',
    description: 'New residential complex with community spaces and biophilic design',
    building_ids: ['2'],
    status: 'planning',
    budget: 8500000,
    timeline: '36 months',
    community_support: 89,
    created_at: '2025-01-08T14:30:00Z'
  },
  {
    id: '3',
    name: 'Kilimani Plaza Expansion',
    description: 'Commercial space expansion with living walls and smart features',
    building_ids: ['3'],
    status: 'proposed',
    budget: 5200000,
    timeline: '24 months',
    community_support: 65,
    created_at: '2025-01-05T09:15:00Z'
  }
];

const marketInsights = [
  {
    title: 'Green Building Demand',
    value: 89,
    trend: '+23%',
    description: 'Residents prefer sustainable features'
  },
  {
    title: 'Community Support',
    value: 77,
    trend: '+15%',
    description: 'Average support for new developments'
  },
  {
    title: 'ROI Potential',
    value: 65,
    trend: '+8%',
    description: 'Expected return on sustainable projects'
  },
  {
    title: 'Market Confidence',
    value: 82,
    trend: '+12%',
    description: 'Investor confidence in Kilimani area'
  }
];

const investmentOpportunities = [
  {
    id: 1,
    title: 'Biophilic Design Premium',
    description: 'Properties with green features command 15-20% higher rents',
    potential: 'High',
    investment: '$500K - $2M',
    timeframe: '12-18 months'
  },
  {
    id: 2,
    title: 'Mixed-Use Development',
    description: 'High demand for residential-commercial combinations',
    potential: 'High',
    investment: '$2M - $8M',
    timeframe: '24-36 months'
  },
  {
    id: 3,
    title: 'Smart Building Technology',
    description: 'IoT and automation features increase property value',
    potential: 'Medium',
    investment: '$200K - $1M',
    timeframe: '6-12 months'
  }
];

export default function InvestorsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedTab, setSelectedTab] = useState('projects');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'planning': return 'bg-warning/10 text-warning border-warning/20';
      case 'construction': return 'bg-primary/10 text-primary border-primary/20';
      case 'proposed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-3 w-3" />;
      case 'planning': return <Clock className="h-3 w-3" />;
      case 'construction': return <Building className="h-3 w-3" />;
      case 'proposed': return <AlertTriangle className="h-3 w-3" />;
      default: return <Building className="h-3 w-3" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSupportColor = (support: number) => {
    if (support >= 80) return 'text-success';
    if (support >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Investor Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Analyze investment opportunities with community insights and ROI projections.
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
                  <p className="text-2xl font-bold text-foreground">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-success/10">
                  <DollarSign className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-secondary/10">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {projects.find(p => p.roi_analysis)?.roi_analysis?.roi_percentage || 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Average ROI</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(projects.reduce((sum, p) => sum + p.community_support, 0) / projects.length)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Community Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Investment Projects</TabsTrigger>
            <TabsTrigger value="roi-analysis">ROI Analysis</TabsTrigger>
            <TabsTrigger value="market-insights">Market Insights</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          {/* Investment Projects Tab */}
          <TabsContent value="projects" className="mt-6">
            <div className="space-y-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                        <p className="text-muted-foreground mt-1">{project.description}</p>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1 capitalize">{project.status}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Investment</p>
                        <p className="text-lg font-semibold">{formatCurrency(project.budget)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Timeline</p>
                        <p className="text-lg font-semibold">{project.timeline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Community Support</p>
                        <div className="flex items-center space-x-2">
                          <p className={`text-lg font-semibold ${getSupportColor(project.community_support)}`}>
                            {project.community_support}%
                          </p>
                          {project.community_support >= 70 ? (
                            <ThumbsUp className="h-4 w-4 text-success" />
                          ) : (
                            <ThumbsDown className="h-4 w-4 text-error" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expected ROI</p>
                        <p className="text-lg font-semibold text-success">
                          {project.roi_analysis?.roi_percentage || 'TBD'}%
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Community Support</span>
                        <span>{project.community_support}%</span>
                      </div>
                      <Progress value={project.community_support} className="h-2" />
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Community Feedback
                      </Button>
                      <Button size="sm" className="gradient-primary text-white">
                        <Calculator className="h-4 w-4 mr-1" />
                        Calculate ROI
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ROI Analysis Tab */}
          <TabsContent value="roi-analysis" className="mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">ROI Analysis & Projections</h2>
              <p className="text-muted-foreground">Detailed financial analysis for investment decisions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.filter(p => p.roi_analysis).map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>Financial analysis and projections</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Initial Investment</p>
                        <p className="text-lg font-semibold">
                          {formatCurrency(project.roi_analysis!.initial_investment)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Projected Revenue</p>
                        <p className="text-lg font-semibold text-success">
                          {formatCurrency(project.roi_analysis!.projected_revenue)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">ROI Percentage</p>
                        <p className="text-2xl font-bold text-success">
                          {project.roi_analysis!.roi_percentage}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payback Period</p>
                        <p className="text-2xl font-bold">
                          {project.roi_analysis!.payback_period} years
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Risk Assessment</p>
                      <Badge className={
                        project.roi_analysis!.risk_assessment === 'low' ? 'bg-success/10 text-success border-success/20' :
                        project.roi_analysis!.risk_assessment === 'medium' ? 'bg-warning/10 text-warning border-warning/20' :
                        'bg-error/10 text-error border-error/20'
                      }>
                        {project.roi_analysis!.risk_assessment} risk
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Market Analysis</p>
                      <p className="text-sm">{project.roi_analysis!.market_analysis}</p>
                    </div>

                    <Button className="w-full gradient-primary text-white">
                      <Calculator className="h-4 w-4 mr-2" />
                      Update Analysis
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* ROI Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ROI Calculator</CardTitle>
                  <CardDescription>Calculate potential returns for new projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Initial Investment (KES)</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border rounded-md"
                      placeholder="5000000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Expected Annual Revenue (KES)</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border rounded-md"
                      placeholder="1200000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Project Duration (years)</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border rounded-md"
                      placeholder="5"
                    />
                  </div>
                  <Button className="w-full">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate ROI
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Market Insights Tab */}
          <TabsContent value="market-insights" className="mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Market Insights & Trends</h2>
              <p className="text-muted-foreground">Data-driven insights for investment decisions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Performance</CardTitle>
                    <CardDescription>Key indicators for Kilimani area</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {marketInsights.map((insight) => (
                      <div key={insight.title}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">{insight.title}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-success">{insight.trend}</span>
                            <span className="text-sm font-medium">{insight.value}%</span>
                          </div>
                        </div>
                        <Progress value={insight.value} className="h-2 mb-1" />
                        <p className="text-xs text-muted-foreground">{insight.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Community Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Green/Sustainable Features</span>
                      <span className="font-medium text-success">89%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mixed-Use Development</span>
                      <span className="font-medium text-primary">76%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Walkable Neighborhoods</span>
                      <span className="font-medium text-secondary">82%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Community Spaces</span>
                      <span className="font-medium text-accent">71%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-success/10">
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Sustainable Development Premium</p>
                        <p className="text-sm text-muted-foreground">
                          Green buildings command 15-20% higher rents and property values
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Mixed-Use Demand</p>
                        <p className="text-sm text-muted-foreground">
                          High demand for residential-commercial combinations in urban areas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-warning/10">
                        <Users className="h-4 w-4 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Community-Driven Development</p>
                        <p className="text-sm text-muted-foreground">
                          Projects with high community support show better long-term performance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Factors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-error/10">
                        <AlertTriangle className="h-4 w-4 text-error" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Infrastructure Constraints</p>
                        <p className="text-sm text-muted-foreground">
                          Water and power supply limitations in some areas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-warning/10">
                        <Clock className="h-4 w-4 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Regulatory Delays</p>
                        <p className="text-sm text-muted-foreground">
                          Approval processes may extend project timelines
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Investment Opportunities</h2>
              <p className="text-muted-foreground">Emerging opportunities based on market analysis</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {investmentOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Potential</span>
                        <Badge className={
                          opportunity.potential === 'High' ? 'bg-success/10 text-success border-success/20' :
                          'bg-warning/10 text-warning border-warning/20'
                        }>
                          {opportunity.potential}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Investment Range</span>
                        <span className="text-sm font-medium">{opportunity.investment}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Timeframe</span>
                        <span className="text-sm font-medium">{opportunity.timeframe}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 gradient-primary text-white">
                      <Eye className="h-4 w-4 mr-2" />
                      Explore Opportunity
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Chatbot context={{ type: 'general' }} />
    </div>
  );
}