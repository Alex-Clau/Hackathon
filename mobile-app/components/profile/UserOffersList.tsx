import { View, Text, ScrollView } from "react-native";
import { UserOffer } from "../../hooks/offers/useUserOffers";
import { getStatusColor, getStatusText } from "../../lib/statusUtils";

interface UserOffersListProps {
  offers: UserOffer[];
}

export const UserOffersList = ({ offers }: UserOffersListProps) => {
  if (offers.length === 0) {
    return (
      <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
        <Text className="text-gray-600 text-center">
          You haven't activated any offers yet
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        My Offers ({offers.length})
      </Text>
      <ScrollView className="max-h-96">
        {offers.map((userOffer) => (
          <View
            key={userOffer.id}
            className="border-b border-gray-200 py-3 last:border-b-0"
          >
            <Text className="text-base font-semibold text-gray-800 mb-1">
              {userOffer.offer?.productOfferName || "Unknown Offer"}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              {userOffer.offer?.discountSize || ""}
            </Text>
            {userOffer.offer?.description && (
              <Text className="text-xs text-gray-500 mb-2 italic">
                {userOffer.offer.description}
              </Text>
            )}
            <View
              className="px-3 py-1 rounded-full self-start"
              style={{ backgroundColor: getStatusColor(userOffer.status) + "20" }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: getStatusColor(userOffer.status) }}
              >
                {getStatusText(userOffer.status)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

