import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';

export interface Offer {
  id: string;
  imageUrl: string;
  title: string;
  companyName: string;
  offersCount: number;
}

export const useOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const data = await apiClient.getOffersGroupedByCompany();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  return { offers, loading };
};

