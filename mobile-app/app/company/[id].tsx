import { View, Text, FlatList, Pressable, Linking } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase/firebaseConfig";
import { LoadingScreen } from "../../components/home/LoadingScreen";
import { OfferCard } from "../../components/offers/OfferCard";
import { useUserOffers } from "../../hooks/offers/useUserOffers";
import { useAuthContext } from "../../contexts/AuthContext";
import { GradientBackground } from "../../components/common/GradientBackground";

interface CompanyOffer {
  id: string;
  companyId: string;
  productOfferName: string;
  discountSize: string;
  description?: string;
  offerEndDate: any;
  createdAt: any;
}

export default function CompanyOffersScreen() {
  const { id: companyId } = useLocalSearchParams();
  const { user } = useAuthContext();
  const { userOffers, activateOffer } = useUserOffers();
  const [offers, setOffers] = useState<CompanyOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [companyDoc, offersSnapshot] = await Promise.all([
          getDoc(doc(db, "companies", companyId as string)),
          getDocs(query(collection(db, "offers"), where("companyId", "==", companyId))),
        ]);

        if (companyDoc.exists()) {
          setCompanyName(companyDoc.data().name || "");
        }

        setOffers(
          offersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CompanyOffer))
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch offers");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

    const openMaps = () => {
      if (!companyName) return;
      const searchQuery = `${companyName} store`;
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
      Linking.openURL(url).catch((err) => console.error("Error opening maps:", err));
    };

    const isOfferActive = (date: any) => {
      if (!date) return false;
      const endDate = date.toDate ? date.toDate() : new Date(date);
      return endDate > new Date();
    };

  const isOfferActivated = (offerId: string) => {
    return userOffers.some((uo) => uo.offerId === offerId);
  };

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <GradientBackground variant="light">
        <View className="flex-1 justify-center items-center px-6">
        <Text style={{ color: "#DC2626" }} className="text-center">{error}</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 px-6 py-3 rounded-xl"
          style={{ backgroundColor: "#1A4D2E" }}
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </Pressable>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground variant="light">
      <View className="flex-1">
      <View className="px-6 pt-16 pb-6" style={{ backgroundColor: "#1A4D2E" }}>
        <View className="flex-row items-center justify-between mb-4">
          <Pressable onPress={() => router.back()}>
            <Text style={{ color: "#E8DFCA", fontSize: 16 }}>← Back</Text>
          </Pressable>
          {companyName && (
            <Pressable
              onPress={openMaps}
              className="px-4 py-2 rounded-xl flex-row items-center"
              style={{ backgroundColor: "#4F6F52" }}
            >
              <Ionicons name="map-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text className="text-white font-semibold text-sm">Closest Location</Text>
            </Pressable>
          )}
        </View>
        <Text className="text-3xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
          {companyName || "Company Offers"}
        </Text>
        <Text style={{ color: "#E8DFCA" }}>
          {offers.length} {offers.length === 1 ? "offer" : "offers"} available
        </Text>
      </View>

      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <OfferCard
              productOfferName={item.productOfferName}
              discountSize={item.discountSize}
              description={item.description}
              offerEndDate={item.offerEndDate}
              isActive={isOfferActive(item.offerEndDate)}
              offerId={user ? item.id : undefined}
              onActivate={user ? async (id) => {
                const result = await activateOffer(id, companyId as string);
                return result ?? false;
              } : undefined}
              isActivated={user ? isOfferActivated(item.id) : false}
            />
          );
        }}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-8">
            <Text style={{ color: "#4F6F52" }} className="text-center">
              No offers available for this company
            </Text>
          </View>
        }
      />
    </View>
    </GradientBackground>
  );
}
