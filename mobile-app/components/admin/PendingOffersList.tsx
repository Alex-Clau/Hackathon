import { View, Text, Pressable, ScrollView } from "react-native";
import { UserOffer } from "../../hooks/admin/usePendingOffers";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps {
  onPress: () => void;
  className: string;
  text: string;
}

const AnimatedButton = ({ onPress, className, text }: AnimatedButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  // Extract background color from className with vibrant, colorful options
  const getBackgroundColor = () => {
    if (!className) return '#10B981'; // default vibrant green
    if (className.includes('Activate')) return '#10B981'; // Vibrant emerald green for activate
    if (className.includes('Redeem')) return '#059669'; // Deep emerald green for redeem
    if (className.includes('bg-[#588157]')) return '#10B981';
    if (className.includes('bg-[#10B981]')) return '#059669';
    if (className.includes('bg-[#1A4D2E]')) return '#1A4D2E';
    return '#10B981'; // default vibrant green
  };
  
  // Get text color (white for all buttons)
  const getTextColor = () => {
    return '#FFFFFF';
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={className}
      style={[
        animatedStyle,
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 12,
          minHeight: 48,
          shadowColor: getBackgroundColor(),
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
        },
      ]}
    >
      <Text 
        style={{ 
          color: getTextColor(),
          fontSize: 15,
          fontWeight: '700',
          textAlign: 'center',
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Text>
    </AnimatedPressable>
  );
};

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
                <AnimatedButton
                  onPress={() => onActivate(userOffer.id)}
                  className="Activate py-2 px-4 rounded-lg mt-2 mb-2"
                  text="Activate Offer"
                />
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
                <AnimatedButton
                  onPress={() => onRedeem(userOffer.id)}
                  className="Redeem py-2 px-4 rounded-lg mt-2 mb-2"
                  text="Redeem Offer"
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

