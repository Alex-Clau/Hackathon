import { View, Text } from "react-native";
import { useOffers } from "../hooks/useOffers";
import { HomeHeader } from "../components/home/HomeHeader";
import { OffersList } from "../components/offers/OffersList";
import { LoadingScreen } from "../components/home/LoadingScreen";

export default function Index() {
  const { offers, loading } = useOffers();

  if (loading) {
    return <LoadingScreen />;
  }

  if (offers.length === 0) {
    return (
      <View
        className="flex-1 justify-center items-center px-6"
        style={{ backgroundColor: "#DAD7CD" }}
      >
        <Text className="text-lg text-center mb-2" style={{ color: "#3A5A40" }}>
          No offers available
        </Text>
        <Text className="text-sm text-center" style={{ color: "#588157" }}>
          Check if backend server is running on port 3000
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: "#DAD7CD" }}>
      <HomeHeader offersCount={offers.length} />
      <OffersList offers={offers} />
    </View>
  );
}
