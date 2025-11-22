import { useState, useEffect } from 'react';

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
      const response = await fetch('YOUR_EXPRESS_API_URL/offers');
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  return { offers, loading };
};

