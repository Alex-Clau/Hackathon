import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthContext } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/home/LoadingScreen";
import { useAdminStats } from "../hooks/admin/useAdminStats";
import { AdminHeader } from "../components/admin/AdminHeader";
import { StatsCard } from "../components/admin/StatsCard";
import { OfferCard } from "../components/offers/OfferCard";
import { Ionicons } from "@expo/vector-icons";
import { GradientBackground } from "../components/common/GradientBackground";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function AdminDashboard() {
  const { user, userData } = useAuthContext();
  const { stats, loading, refreshing, onRefresh } = useAdminStats();
  const insets = useSafeAreaInsets();
  const buttonScale = useSharedValue(1);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleButtonPressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handleButtonPressOut = () => {
    buttonScale.value = withSpring(1);
  };

  useEffect(() => {
    if (userData && userData.role !== "admin") {
      router.replace("/");
    }
  }, [userData]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!stats) {
    return (
      <GradientBackground variant="light">
        <View
          className="flex-1 justify-center items-center px-6"
        >
          <Text style={{ color: "#1A4D2E" }}>Unable to load dashboard data</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground variant="light">
      <View className="flex-1">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-6" style={{ paddingTop: insets.top + 24 }}>
          <AdminHeader
            userName={user?.displayName || undefined}
            userEmail={user?.email || undefined}
          />

          <View className="mb-6">
            <StatsCard
              value={stats.totalOffers}
              label="Total Offers"
              backgroundColor="#FFFFFF"
              textColor="#1A4D2E"
              labelColor="#4F6F52"
              isLarge
            />

            <View className="flex-row gap-4 mb-4">
              <View className="flex-1">
                <StatsCard
                  value={stats.activeOffers}
                  label="Active"
                  backgroundColor="#E8DFCA"
                  textColor="#1A4D2E"
                  labelColor="#1A4D2E"
                />
              </View>

              <View className="flex-1">
                <StatsCard
                  value={stats.expiredOffers}
                  label="Expired"
                  backgroundColor="#FFFFFF"
                  textColor="#1A4D2E"
                  labelColor="#4F6F52"
                />
              </View>
            </View>

            <StatsCard
              value={stats.totalEngagements}
              label="Total Engagements"
              backgroundColor="#4F6F52"
              textColor="#FFFFFF"
              labelColor="#E8DFCA"
            />
          </View>

          <View className="mb-6">
            <Text
              className="text-2xl font-bold mb-4"
              style={{ color: "#1A4D2E" }}
            >
              All Offers
            </Text>
            {stats.offers.map((offer) => (
              <OfferCard key={offer.id} {...offer} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating QR Scanner Button */}
      <View
        className="absolute bottom-6 left-0 right-0 items-center px-6"
        style={{ zIndex: 999 }}
      >
        <AnimatedTouchableOpacity
          className="rounded-full px-6 py-4 flex-row items-center"
          style={[
            {
              backgroundColor: "#1A4D2E",
              shadowColor: "#1A4D2E",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 8,
            },
            buttonStyle,
          ]}
          onPress={() => router.push("/admin-profile")}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
        >
          <Ionicons
            name="qr-code-outline"
            size={24}
            color="#FFFFFF"
            style={{ marginRight: 8 }}
          />
          <Text
            className="font-semibold text-base"
            style={{ color: "#FFFFFF" }}
          >
            Scan User QR Code
          </Text>
        </AnimatedTouchableOpacity>
      </View>
    </View>
    </GradientBackground>
  );
}
