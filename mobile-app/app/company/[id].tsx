import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

interface CompanyOffer {
  id: string;
  companyId: string;
  productOfferName: string;
  discountSize: string;
  offerEndDate: any;
  createdAt: any;
}

export default function CompanyOffersScreen() {
  const { id: companyId } = useLocalSearchParams();
  const [offers, setOffers] = useState<CompanyOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanyOffers();
  }, [companyId]);

  const fetchCompanyOffers = async () => {
    try {
      setLoading(true);
      const offersRef = collection(db, "offers");
      const q = query(offersRef, where("companyId", "==", companyId));
      const querySnapshot = await getDocs(q);

      const fetchedOffers: CompanyOffer[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as CompanyOffer)
      );

      setOffers(fetchedOffers);
      setError(null);
    } catch (err) {
      console.error("Error fetching company offers:", err);
      setError("Failed to fetch offers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "#DAD7CD" }}
      >
        <ActivityIndicator size="large" color="#588157" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        className="flex-1 justify-center items-center px-6"
        style={{ backgroundColor: "#DAD7CD" }}
      >
        <Text style={{ color: "#DC2626" }} className="text-center">
          {error}
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 px-6 py-3 rounded-xl"
          style={{ backgroundColor: "#588157" }}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    if (date.toDate) {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  const isOfferActive = (date: any) => {
    if (!date) return false;
    const endDate = date.toDate ? date.toDate() : new Date(date);
    return endDate > new Date();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: "#DAD7CD" }}>
      {/* Header */}
      <View className="px-6 pt-16 pb-6" style={{ backgroundColor: "#3A5A40" }}>
        <Pressable onPress={() => router.back()} className="mb-4 self-start">
          <Text style={{ color: "#DAD7CD", fontSize: 16 }}>← Back</Text>
        </Pressable>
        <Text className="text-3xl font-bold mb-2" style={{ color: "#DAD7CD" }}>
          Company Offers
        </Text>
        <Text style={{ color: "#A3B18A" }}>
          {offers.length} {offers.length === 1 ? "offer" : "offers"} available
        </Text>
      </View>

      {/* Offers List */}
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isActive = isOfferActive(item.offerEndDate);
          return (
            <View
              className="rounded-xl p-5 mb-4 mx-4"
              style={{
                backgroundColor: "#FFFFFF",
                borderLeftWidth: 4,
                borderLeftColor: isActive ? "#588157" : "#A3B18A",
              }}
            >
              <Text
                className="text-xl font-bold mb-2"
                style={{ color: "#344E41" }}
              >
                {item.productOfferName}
              </Text>
              <View className="flex-row items-center justify-between mb-2">
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#A3B18A" }}
                >
                  <Text className="font-semibold" style={{ color: "#344E41" }}>
                    {item.discountSize}
                  </Text>
                </View>
                <View
                  className="px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: isActive ? "#A3B18A" : "#DAD7CD",
                  }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{
                      color: isActive ? "#344E41" : "#588157",
                    }}
                  >
                    {isActive ? "Active" : "Expired"}
                  </Text>
                </View>
              </View>
              <Text style={{ color: "#3A5A40", fontSize: 14 }}>
                Valid until: {formatDate(item.offerEndDate)}
              </Text>
            </View>
          );
        }}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-8">
            <Text style={{ color: "#588157" }} className="text-center">
              No offers available for this company
            </Text>
          </View>
        }
      />
    </View>
  );
}
