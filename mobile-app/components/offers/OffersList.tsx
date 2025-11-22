import { FlatList } from "react-native";
import { router } from "expo-router";
import { useAuthContext } from "../../contexts/AuthContext";
import OfferCard from "./OfferCard";
import { Offer } from "../../hooks/useOffers";

interface OffersListProps {
  offers: Offer[];
}

export const OffersList = ({ offers }: OffersListProps) => {
  const { user } = useAuthContext();

  const handleOfferPress = (companyId: string) => {
    if (!user) {
      router.push("/auth");
      return;
    }
    // Navigate to company offers page
    router.push(`/company/${companyId}` as any);
  };

  return (
    <FlatList
      data={offers}
      renderItem={({ item, index }) => (
        <OfferCard
          image={item.imageUrl}
          companyName={item.companyName}
          offersCount={item.offersCount}
          onPress={() => handleOfferPress(item.id)}
          index={index}
          key={item.id}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={1}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
};
