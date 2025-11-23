import { FlatList } from "react-native";
import { router } from "expo-router";
import { useAuthContext } from "../../contexts/AuthContext";
import CompanyCard from "./CompanyCard";
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
    router.push(`/company/${companyId}` as any);
  };

  return (
    <FlatList
      data={offers}
      renderItem={({ item, index }) => (
        <CompanyCard
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
