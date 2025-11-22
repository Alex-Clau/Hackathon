import { View, Text, TouchableOpacity } from "react-native";
import { useOffers } from "../hooks/useOffers";
import { HomeHeader } from "../components/home/HomeHeader";
import { OffersList } from "../components/offers/OffersList";
import { LoadingScreen } from "../components/home/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

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

      {/* Floating QR Code Button */}
      <View
        className="absolute bottom-6 left-0 right-0 items-center px-6"
        style={{ zIndex: 999 }}
      >
        <TouchableOpacity
          className="rounded-full px-6 py-4 flex-row items-center"
          style={{
            backgroundColor: "#3A5A40",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}
          onPress={() => router.push("/profile")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="qr-code"
            size={24}
            color="#DAD7CD"
            style={{ marginRight: 8 }}
          />
          <Text
            className="font-semibold text-base"
            style={{ color: "#DAD7CD" }}
          >
            Show My QR Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
