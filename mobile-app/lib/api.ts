const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.34.48:3000/api';

export interface CompanyOffer {
  id: string;
  companyName: string;
  imageUrl: string;
  title: string;
  offersCount: number;
}

class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - check if backend server is running');
        }
        throw error;
      }
      throw new Error('Network error - unable to connect to server');
    }
  }

  async getOffersGroupedByCompany(): Promise<CompanyOffer[]> {
    return this.request<CompanyOffer[]>('/offers?grouped=true');
  }

  async getUserByUid(uid: string) {
    return this.request(`/users/${uid}`);
  }

  async createOrUpdateUser(uid: string, email: string) {
    return this.request(`/users/${uid}`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getAdminStats(email: string) {
    return this.request(`/admin/stats/${encodeURIComponent(email)}`);
  }

  async estimateQuality(base64Image: string) {
    return this.request<{
      tier: 'DONATE' | 'RECYCLE' | 'REJECT';
      recommendation: string;
      conditionSummary: string;
      confidence: number;
      qualityScore: number;
    }>('/ai/quality-check', {
      method: 'POST',
      body: JSON.stringify({ image: base64Image }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

