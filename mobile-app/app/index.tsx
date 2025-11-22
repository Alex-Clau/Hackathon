import { View } from 'react-native';
import { useOffers } from '../hooks/useOffers';
import { HomeHeader } from '../components/home/HomeHeader';
import { OffersList } from '../components/offers/OffersList';
import { LoadingScreen } from '../components/home/LoadingScreen';

export default function Index() {
  const { offers, loading } = useOffers();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 bg-white">
      <HomeHeader offersCount={offers.length} />
      <OffersList offers={offers} />
    </View>
  );
}
