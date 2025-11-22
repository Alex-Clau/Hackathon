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
import { Ionicons } from "@expo/vector-icons";

interface CompanyOffer {
  id: string;
  companyId: string;
  productOfferName: string;
  discountSize: string;
  offerEndDate: string;
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
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-6">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <View className="flex-row items-center mb-4">
          <Pressable onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </Pressable>
          <Text className="text-2xl font-bold text-gray-800">
            Company Offers
          </Text>
        </View>
        <Text className="text-gray-600 ml-9">
          {offers.length} {offers.length === 1 ? "offer" : "offers"} available
        </Text>
      </View>

      {/* Offers List */}
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white mx-4 my-2 p-4 rounded-xl shadow-sm">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              {item.productOfferName}
            </Text>
            <View className="flex-row items-center mb-2">
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-700 font-semibold">
                  {item.discountSize}
                </Text>
              </View>
            </View>
            <Text className="text-gray-600 text-sm">
              Valid until: {new Date(item.offerEndDate).toLocaleDateString()}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-8">
            <Text className="text-gray-500 text-center">
              No offers available for this company
            </Text>
          </View>
        }
      />
    </View>
  );
}
