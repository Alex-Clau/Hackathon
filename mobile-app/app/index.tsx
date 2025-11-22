import { View, Text } from 'react-native';
import { useOffers } from '../hooks/useOffers';
import { HomeHeader } from '../components/home/HomeHeader';
import { OffersList } from '../components/offers/OffersList';
import { LoadingScreen } from '../components/home/LoadingScreen';

export default function Index() {
  const { offers, loading } = useOffers();

  if (loading) {
    return <LoadingScreen />;
  }

  if (offers.length === 0) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-6">
        <Text className="text-lg text-gray-600 text-center mb-2">
          No offers available
        </Text>
        <Text className="text-sm text-gray-500 text-center">
          Check if backend server is running on port 3000
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <HomeHeader offersCount={offers.length} />
      <OffersList offers={offers} />
    </View>
  );
}
