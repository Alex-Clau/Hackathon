// API URL configuration
// For physical devices, use your computer's IP address
// For iOS Simulator/Android Emulator, localhost usually works
// Override with EXPO_PUBLIC_API_URL environment variable if needed
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.101.12:3000/api';

export interface CompanyOffer {
  id: string;
  companyName: string;
  imageUrl: string;
  title: string;
  offersCount: number;
}

export interface Offer {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  productOfferName: string;
  discountSize: string;
  offerEndDate: Date;
  createdAt: Date;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data.data || data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  async getOffersGroupedByCompany(): Promise<CompanyOffer[]> {
    return this.request<CompanyOffer[]>('/offers?grouped=true');
  }

  async getOffers(): Promise<Offer[]> {
    return this.request<Offer[]>('/offers');
  }

  async getOfferById(offerId: string): Promise<Offer> {
    return this.request<Offer>(`/offers/${offerId}`);
  }

  async getCompanies() {
    return this.request('/companies');
  }

  async getUserOffers(userId: string) {
    return this.request(`/users/${userId}/offers`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

