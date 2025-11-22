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
<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
=======
>>>>>>> e722fa428efa4a6e7229b347540e6b4b2982d1b4

interface CompanyOffer {
  id: string;
  companyId: string;
  productOfferName: string;
  discountSize: string;
<<<<<<< HEAD
  offerEndDate: string;
=======
  offerEndDate: any;
>>>>>>> e722fa428efa4a6e7229b347540e6b4b2982d1b4
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
<<<<<<< HEAD
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
=======
      <View 
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "#DAD7CD" }}
      >
        <ActivityIndicator size="large" color="#588157" />
>>>>>>> e722fa428efa4a6e7229b347540e6b4b2982d1b4
      </View>
    );
  }

  if (error) {
    return (
<<<<<<< HEAD
      <View className="flex-1 bg-white justify-center items-center px-6">
        <Text className="text-red-500 text-center">{error}</Text>
=======
      <View 
        className="flex-1 justify-center items-center px-6"
        style={{ backgroundColor: "#DAD7CD" }}
      >
        <Text style={{ color: "#DC2626" }} className="text-center">{error}</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 px-6 py-3 rounded-xl"
          style={{ backgroundColor: "#588157" }}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
>>>>>>> e722fa428efa4a6e7229b347540e6b4b2982d1b4
      </View>
    );
  }

<<<<<<< HEAD
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
=======
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
      <View 
        className="px-6 pt-16 pb-6"
        style={{ backgroundColor: "#3A5A40" }}
      >
        <Pressable
          onPress={() => router.back()}
          className="mb-4 self-start"
        >
          <Text style={{ color: "#DAD7CD", fontSize: 16 }}>← Back</Text>
        </Pressable>
        <Text 
          className="text-3xl font-bold mb-2"
          style={{ color: "#DAD7CD" }}
        >
          Company Offers
        </Text>
        <Text style={{ color: "#A3B18A" }}>
>>>>>>> e722fa428efa4a6e7229b347540e6b4b2982d1b4
          {offers.length} {offers.length === 1 ? "offer" : "offers"} available
        </Text>
      </View>

      {/* Offers List */}
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
<<<<<<< HEAD
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
=======
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
                  <Text
                    className="font-semibold"
                    style={{ color: "#344E41" }}
                  >
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
>>>>>>> e722fa428efa4a6e7229b347540e6b4b2982d1b4
              No offers available for this company
            </Text>
          </View>
        }
      />
    </View>
  );
}
<<<<<<< HEAD
=======

>>>>>>> e722fa428efa4a6e7229b347540e6b4b2982d1b4
