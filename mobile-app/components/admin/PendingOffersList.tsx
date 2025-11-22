import { View, Text, Pressable, ScrollView } from "react-native";
import { UserOffer } from "../../hooks/admin/usePendingOffers";

interface PendingOffersListProps {
  pendingOffers: UserOffer[];
  activeOffers: UserOffer[];
  onActivate: (userOfferId: string) => Promise<boolean>;
  onRedeem: (userOfferId: string) => Promise<boolean>;
}

export const PendingOffersList = ({
  pendingOffers,
  activeOffers,
  onActivate,
  onRedeem,
}: PendingOffersListProps) => {
  const hasOffers = pendingOffers.length > 0 || activeOffers.length > 0;

  if (!hasOffers) {
    return (
      <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
        <Text className="text-gray-600 text-center">
          No offers for this user
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      {pendingOffers.length > 0 && (
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Pending Offers ({pendingOffers.length})
          </Text>
          <ScrollView 
            style={{ maxHeight: 300 }}
            contentContainerStyle={{ paddingBottom: 8 }}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            {pendingOffers.map((userOffer) => (
              <View
                key={userOffer.id}
                className="border-b border-gray-200 last:border-b-0"
                style={{ paddingVertical: 12 }}
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
                <Pressable
                  onPress={() => onActivate(userOffer.id)}
                  className="bg-[#588157] py-2 px-4 rounded-lg mt-2 mb-2"
                >
                  <Text className="text-white text-center font-semibold text-sm">
                    Activate Offer
                  </Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {activeOffers.length > 0 && (
        <View>
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Active Offers ({activeOffers.length})
          </Text>
          <ScrollView 
            style={{ maxHeight: 300 }}
            contentContainerStyle={{ paddingBottom: 8 }}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            {activeOffers.map((userOffer) => (
              <View
                key={userOffer.id}
                className="border-b border-gray-200 last:border-b-0"
                style={{ paddingVertical: 12 }}
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
                <Pressable
                  onPress={() => onRedeem(userOffer.id)}
                  className="bg-[#10B981] py-2 px-4 rounded-lg mt-2 mb-2"
                >
                  <Text className="text-white text-center font-semibold text-sm">
                    Redeem Offer
                  </Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

