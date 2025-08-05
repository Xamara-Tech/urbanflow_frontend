"use client"

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Users, 
  BarChart3, 
  Lightbulb, 
  TreePine, 
  MapPin,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: Building,
    title: 'Smart Building Management',
    description: 'Comprehensive building data and metadata visualization with interactive mapping.',
  },
  {
    icon: Users,
    title: 'Community Feedback',
    description: 'Verified resident feedback system with sentiment analysis and thematic clustering.',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Real-time statistics on walkability, noise levels, and development patterns.',
  },
  {
    icon: Lightbulb,
    title: 'AI Suggestions',
    description: 'Intelligent recommendations for sustainable development based on community needs.',
  },
  {
    icon: TreePine,
    title: 'Green Spaces',
    description: 'Promote biophilic design with green balconies and environmental sustainability.',
  },
  {
    icon: MapPin,
    title: 'Walkability Simulation',
    description: 'Advanced pedestrian pathway analysis and safety ratings for better urban planning.',
  },
];

const stats = [
  { name: 'Buildings Mapped', value: '2,500+' },
  { name: 'Community Feedback', value: '15,000+' },
  { name: 'Urban Planners', value: '150+' },
  { name: 'Success Rate', value: '94%' },
];

const userTypes = [
  {
    title: 'Urban Planners',
    description: 'Access GIS data, analyze walkability, and get AI-suggested interventions.',
    features: ['GIS Integration', 'Traffic Analysis', 'Environmental Data', 'Community Insights'],
    color: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    title: 'Architects',
    description: 'Design with community feedback and environmental constraints in mind.',
    features: ['Design Tools', 'Community Input', 'Biophilic Design', 'Sun-Shadow Models'],
    color: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  {
    title: 'Investors',
    description: 'Make informed decisions with ROI analysis and community support metrics.',
    features: ['ROI Analysis', 'Market Insights', 'Risk Assessment', 'Progress Tracking'],
    color: 'bg-accent/10 text-accent border-accent/20',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Building the Future of{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Kilimani
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Data-driven urban development platform connecting planners, architects, and investors 
              with verified community insights for sustainable, walkable neighborhoods.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="gradient-primary text-white">
                <Link href="/auth/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Trusted by the Community
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Real impact through data-driven urban development
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col bg-card p-8">
                  <dt className="text-sm font-semibold leading-6 text-muted-foreground">{stat.name}</dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-primary">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need for smart urban development
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comprehensive tools and insights to create sustainable, livable communities in Kilimani.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-24 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">For Everyone</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Designed for every stakeholder
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Whether you're planning, designing, or investing, our platform has the tools you need.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {userTypes.map((userType) => (
              <Card key={userType.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{userType.title}</CardTitle>
                  <CardDescription>{userType.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {userType.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to transform Kilimani?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join our community of urban planners, architects, and residents building a sustainable future.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="gradient-primary text-white">
                <Link href="/auth/register">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}