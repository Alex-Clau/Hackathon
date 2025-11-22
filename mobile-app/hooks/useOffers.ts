import { useState, useEffect, useCallback } from 'react';
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

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.getOffersGroupedByCompany();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return { offers, loading };
};

