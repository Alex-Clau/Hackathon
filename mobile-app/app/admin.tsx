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

export default function AdminDashboard() {
  const { user, userData } = useAuthContext();
  const { stats, loading, refreshing, onRefresh } = useAdminStats();
  const insets = useSafeAreaInsets();

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
      <View
        className="flex-1 justify-center items-center px-6"
        style={{ backgroundColor: "#DAD7CD" }}
      >
        <Text style={{ color: "#3A5A40" }}>Unable to load dashboard data</Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: "#DAD7CD" }}>
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
              textColor="#344E41"
              labelColor="#588157"
              isLarge
            />

            <View className="flex-row gap-4 mb-4">
              <View className="flex-1">
                <StatsCard
                  value={stats.activeOffers}
                  label="Active"
                  backgroundColor="#A3B18A"
                  textColor="#344E41"
                  labelColor="#3A5A40"
                />
              </View>

              <View className="flex-1">
                <StatsCard
                  value={stats.expiredOffers}
                  label="Expired"
                  backgroundColor="#FFFFFF"
                  textColor="#344E41"
                  labelColor="#588157"
                />
              </View>
            </View>

            <StatsCard
              value={stats.totalEngagements}
              label="Total Engagements"
              backgroundColor="#588157"
              textColor="#FFFFFF"
              labelColor="#DAD7CD"
            />
          </View>

          <View className="mb-6">
            <Text
              className="text-2xl font-bold mb-4"
              style={{ color: "#344E41" }}
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
          onPress={() => router.push("/admin-profile")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="qr-code-outline"
            size={24}
            color="#DAD7CD"
            style={{ marginRight: 8 }}
          />
          <Text
            className="font-semibold text-base"
            style={{ color: "#DAD7CD" }}
          >
            Scan User QR Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
