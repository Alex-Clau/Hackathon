import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthContext } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/home/LoadingScreen";
import { useAdminStats } from "../hooks/admin/useAdminStats";
import { AdminHeader } from "../components/admin/AdminHeader";
import { StatsCard } from "../components/admin/StatsCard";
import { OfferCard } from "../components/admin/OfferCard";

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
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: "#DAD7CD" }}
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
  );
}
