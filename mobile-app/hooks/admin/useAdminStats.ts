import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../lib/api";

export interface AdminStats {
  totalOffers: number;
  activeOffers: number;
  expiredOffers: number;
  totalEngagements: number;
  offers: Array<{
    id: string;
    productOfferName: string;
    discountSize: string;
    description?: string;
    offerEndDate: any;
    isActive: boolean;
  }>;
}

export const useAdminStats = () => {
  const { user, userData } = useAuthContext();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    if (!user?.email || userData?.role !== "admin") return;

    try {
      setLoading(true);
      const data = await apiClient.getAdminStats(user.email);
      setStats(data as AdminStats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user?.email && userData?.role === "admin") {
      fetchStats();
    }
  }, [user?.email, userData?.role]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const refreshStats = () => {
    fetchStats();
  };

  return { stats, loading, refreshing, onRefresh, refreshStats };
};
