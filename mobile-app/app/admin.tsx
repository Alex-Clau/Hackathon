import { View, Text, ScrollView, RefreshControl, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthContext } from '../contexts/AuthContext';
import { apiClient } from '../lib/api';
import { LoadingScreen } from '../components/home/LoadingScreen';

interface AdminStats {
  totalOffers: number;
  activeOffers: number;
  expiredOffers: number;
  totalEngagements: number;
  offers: Array<{
    id: string;
    productOfferName: string;
    discountSize: string;
    offerEndDate: any;
    isActive: boolean;
  }>;
}

export default function AdminDashboard() {
  const { user, userData, logout } = useAuthContext();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (userData && userData.role !== 'admin') {
      router.replace('/');
    }
  }, [userData]);

  const fetchStats = async () => {
    if (!user?.email || userData?.role !== 'admin') return;
    
    try {
      setLoading(true);
      const data = await apiClient.getAdminStats(user.email);
      setStats(data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user?.email && userData?.role === 'admin') {
      fetchStats();
    }
  }, [user?.email, userData?.role]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!stats) {
    return (
      <View 
        className="flex-1 justify-center items-center px-6"
        style={{ backgroundColor: '#DAD7CD' }}
      >
        <Text style={{ color: '#3A5A40' }}>Unable to load dashboard data</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: '#DAD7CD' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View className="p-6" style={{ paddingTop: insets.top + 24 }}>
        <View 
          className="flex-row items-center justify-between mb-6 p-5 rounded-2xl"
          style={{ backgroundColor: '#3A5A40' }}
        >
          <View className="flex-1">
            <Text 
              className="text-3xl font-bold mb-2"
              style={{ color: '#DAD7CD' }}
            >
              {user?.displayName || user?.email?.split('@')[0] || 'Admin'} Dashboard
            </Text>
            <Text style={{ color: '#A3B18A' }}>Company Analytics</Text>
          </View>
          <Pressable
            onPress={async () => {
              await logout();
              router.replace('/auth');
            }}
            className="px-4 py-2 rounded-xl"
            style={{ backgroundColor: '#588157' }}
          >
            <Text className="text-white font-semibold">Logout</Text>
          </Pressable>
        </View>

        <View className="mb-6">
          <View 
            className="rounded-2xl p-5 mb-4"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <Text 
              className="text-3xl font-bold mb-2"
              style={{ color: '#344E41' }}
            >
              {stats.totalOffers}
            </Text>
            <Text style={{ color: '#588157' }}>Total Offers</Text>
          </View>

          <View className="flex-row gap-4 mb-4">
            <View 
              className="flex-1 rounded-2xl p-5"
              style={{ backgroundColor: '#A3B18A' }}
            >
              <Text 
                className="text-2xl font-bold mb-1"
                style={{ color: '#344E41' }}
              >
                {stats.activeOffers}
              </Text>
              <Text style={{ color: '#3A5A40', fontSize: 14 }}>Active</Text>
            </View>

            <View 
              className="flex-1 rounded-2xl p-5"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <Text 
                className="text-2xl font-bold mb-1"
                style={{ color: '#344E41' }}
              >
                {stats.expiredOffers}
              </Text>
              <Text style={{ color: '#588157', fontSize: 14 }}>Expired</Text>
            </View>
          </View>

          <View 
            className="rounded-2xl p-5"
            style={{ backgroundColor: '#588157' }}
          >
            <Text 
              className="text-2xl font-bold mb-1"
              style={{ color: '#FFFFFF' }}
            >
              {stats.totalEngagements}
            </Text>
            <Text style={{ color: '#DAD7CD' }}>Total Engagements</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text 
            className="text-2xl font-bold mb-4"
            style={{ color: '#344E41' }}
          >
            All Offers
          </Text>
          {stats.offers.map((offer) => (
            <View
              key={offer.id}
              className="rounded-xl p-4 mb-3"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderLeftWidth: 4,
                borderLeftColor: offer.isActive ? '#588157' : '#A3B18A',
              }}
            >
              <Text 
                className="text-lg font-semibold mb-1"
                style={{ color: '#344E41' }}
              >
                {offer.productOfferName}
              </Text>
              <Text 
                className="mb-2"
                style={{ color: '#588157' }}
              >
                {offer.discountSize}
              </Text>
              <View className="flex-row items-center justify-between">
                <Text style={{ color: '#3A5A40', fontSize: 12 }}>
                  {offer.offerEndDate?.toDate
                    ? offer.offerEndDate.toDate().toLocaleDateString()
                    : new Date(offer.offerEndDate).toLocaleDateString()}
                </Text>
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ 
                    backgroundColor: offer.isActive ? '#A3B18A' : '#DAD7CD'
                  }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{ 
                      color: offer.isActive ? '#344E41' : '#588157'
                    }}
                  >
                    {offer.isActive ? 'Active' : 'Expired'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

