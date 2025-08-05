export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'resident' | 'architect' | 'urban_planner' | 'investor';
  is_verified: boolean;
  area_of_residence?: string;
  is_anonymous?: boolean;
  avatar?: string;
}

export interface Building {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  zone_type: 'residential' | 'commercial' | 'mixed';
  walkability_rating: number;
  noise_level: number;
  feedback_count: number;
  green_features: string[];
  image: string;
  status: 'proposed' | 'ongoing' | 'completed';
  architect_id?: string;
  designs?: Design[];
}

export interface Design {
  id: string;
  building_id: string;
  architect_id: string;
  title: string;
  description: string;
  images: string[];
  documents: string[];
  created_at: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  feedback_count: number;
}

export interface Feedback {
  id: string;
  building_id: string;
  user_id: string;
  user: {
    full_name: string;
    is_anonymous: boolean;
    role: string;
  };
  comment: string;
  walkability_rating?: number;
  noise_level_rating?: number;
  evidence_files?: EvidenceFile[];
  sentiment: 'positive' | 'negative' | 'neutral';
  tags: string[];
  created_at: string;
  is_sensitive: boolean;
}

export interface EvidenceFile {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  filename: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  building_ids: string[];
  status: 'proposed' | 'planning' | 'approved' | 'construction' | 'completed';
  budget: number;
  timeline: string;
  roi_analysis?: ROIAnalysis;
  community_support: number;
  created_at: string;
}

export interface ROIAnalysis {
  id: string;
  project_id: string;
  investor_id: string;
  initial_investment: number;
  projected_revenue: number;
  roi_percentage: number;
  payback_period: number;
  risk_assessment: 'low' | 'medium' | 'high';
  market_analysis: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  response: string;
  user_id: string;
  timestamp: string;
  context?: {
    building_id?: string;
    project_id?: string;
    type: 'general' | 'building' | 'project' | 'feedback';
  };
}