const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.kilimani.dev/v1';

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  async register(email: string, password: string, full_name: string, role: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name, role }),
    });
    return response.json();
  }

  async googleAuth(google_token: string) {
    const response = await fetch(`${API_BASE_URL}/auth/google/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ google_token }),
    });
    return response.json();
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async verifyResidence(area_of_residence: string, document: string) {
    const response = await fetch(`${API_BASE_URL}/auth/verify-residence/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ area_of_residence, document }),
    });
    return response.json();
  }

  // Buildings
  async getBuildings() {
    const response = await fetch(`${API_BASE_URL}/buildings/`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getBuilding(id: string) {
    const response = await fetch(`${API_BASE_URL}/buildings/${id}/`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Feedback
  async submitFeedback(data: {
    building_id: string;
    comment: string;
    walkability_rating?: number;
    noise_level_rating?: number;
    evidence_files?: File[];
    is_sensitive?: boolean;
  }) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'evidence_files' && Array.isArray(value)) {
        value.forEach((file) => formData.append('evidence_files', file));
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/feedback/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
      body: formData,
    });
    return response.json();
  }

  async getBuildingFeedback(buildingId: string) {
    const response = await fetch(`${API_BASE_URL}/feedback/building/${buildingId}/`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Designs (for architects)
  async submitDesign(data: {
    building_id: string;
    title: string;
    description: string;
    images: File[];
    documents: File[];
  }) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if ((key === 'images' || key === 'documents') && Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/designs/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
      body: formData,
    });
    return response.json();
  }

  async getDesigns(buildingId?: string) {
    const url = buildingId 
      ? `${API_BASE_URL}/designs/?building_id=${buildingId}`
      : `${API_BASE_URL}/designs/`;
    const response = await fetch(url, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Projects (for investors)
  async getProjects() {
    const response = await fetch(`${API_BASE_URL}/projects/`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async submitROIAnalysis(data: {
    project_id: string;
    initial_investment: number;
    projected_revenue: number;
    roi_percentage: number;
    payback_period: number;
    risk_assessment: string;
    market_analysis: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/roi-analysis/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Statistics
  async getStatistics() {
    const response = await fetch(`${API_BASE_URL}/statistics/overview/`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getBuildingStatistics(buildingId: string) {
    const response = await fetch(`${API_BASE_URL}/statistics/building/${buildingId}/`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // AI Suggestions
  async getSuggestions(buildingId?: string) {
    const url = buildingId 
      ? `${API_BASE_URL}/suggestions/building/${buildingId}/`
      : `${API_BASE_URL}/suggestions/`;
    const response = await fetch(url, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Walkability
  async getWalkabilityData() {
    const response = await fetch(`${API_BASE_URL}/simulation/walkability/`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Chatbot
  async sendChatMessage(message: string, context?: any) {
    const response = await fetch(`${API_BASE_URL}/chat/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ message, context }),
    });
    return response.json();
  }

  async getChatHistory() {
    const response = await fetch(`${API_BASE_URL}/chat/history/`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }
}

export const apiClient = new ApiClient();