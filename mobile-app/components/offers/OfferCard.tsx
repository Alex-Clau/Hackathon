import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";

interface OfferCardProps {
  productOfferName: string;
  discountSize: string;
  description?: string;
  offerEndDate: any;
  isActive: boolean;
  // Optional activate button props
  offerId?: string;
  onActivate?: (offerId: string) => Promise<boolean>;
  isActivated?: boolean;
}

const formatDate = (date: any) => {
  if (!date) return "N/A";

  let dateObj: Date | null = null;

  // 1. Handle Firestore Timestamp object (Client SDK)
  if (date && typeof date.toDate === 'function') {
    dateObj = date.toDate();
  }
  // 2. Handle serialized Firestore Timestamp (Server SDK / JSON)
  else if (date && date._seconds !== undefined) {
    dateObj = new Date(date._seconds * 1000 + (date._nanoseconds || 0) / 1000000);
  }
  // 3. Handle ISO string or standard Date object
  else {
    try {
      dateObj = new Date(date);
    } catch (e) {
      console.error("Invalid date format", e);
    }
  }

  // If valid date object, format it strictly as DD.MM.YYYY
  if (dateObj && !isNaN(dateObj.getTime())) {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = dateObj.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return "N/A";
};

export default formatDate;

export const OfferCard = ({
  productOfferName,
  discountSize,
  description,
  offerEndDate,
  isActive,
  offerId,
  onActivate,
  isActivated = false,
}: OfferCardProps) => {
  const [loading, setLoading] = useState(false);
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      shadowOpacity: shadowOpacity.value,
    };
  });

  const handleActivate = async () => {
    if (!offerId || !onActivate) return;

    if (!isActive) {
      Alert.alert("Expired Offer", "This offer has expired and cannot be activated.");
      return;
    }

    if (isActivated) {
      Alert.alert("Info", "This offer is already activated");
      return;
    }

    setLoading(true);
    const success = await onActivate(offerId);
    setLoading(false);

    if (success) {
      Alert.alert("Success", "Offer activated! Show your QR code to redeem.");
    } else {
      Alert.alert("Error", "Failed to activate offer. The offer may have expired or there was an error.");
    }
  };

  const showActivateButton = offerId && onActivate;

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
    shadowOpacity.value = withTiming(0.2);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    shadowOpacity.value = withTiming(0.1);
  };

  return (
    <Animated.View
      className={`rounded-xl p-5 mb-4 ${showActivateButton ? "mx-4" : ""}`}
      style={[
        {
          backgroundColor: "#FFFFFF",
          borderLeftWidth: 4,
          borderLeftColor: isActive ? "#4F6F52" : "#4F6F52",
          shadowColor: "#1A4D2E",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 3,
        },
        animatedStyle,
      ]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
    >
      <Text className="text-xl font-bold mb-2" style={{ color: "#1A4D2E" }}>
        {productOfferName}
      </Text>
      <View className="flex-row items-center justify-between mb-2">
        <View className="px-3 py-1 rounded-full" style={{ backgroundColor: "#E8DFCA" }}>
          <Text className="font-semibold" style={{ color: "#1A4D2E" }}>
            {discountSize}
          </Text>
        </View>
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: isActive ? "#E8DFCA" : "#F5EFE6" }}
        >
          <Text
            className="text-xs font-semibold"
            style={{ color: isActive ? "#1A4D2E" : "#4F6F52" }}
          >
            {isActive ? "Active" : "Expired"}
          </Text>
        </View>
      </View>
      {description && (
        <Text style={{ color: "#4F6F52", fontSize: 13 }} className="mb-2 italic">
          {description}
        </Text>
      )}
      <Text style={{ color: "#1A4D2E", fontSize: 14 }} className={showActivateButton ? "mb-3" : ""}>
        Valid until: {formatDate(offerEndDate)}
      </Text>
      {showActivateButton && (
        <Pressable
          onPress={handleActivate}
          disabled={loading || isActivated || !isActive}
          className={`px-4 py-2 rounded-xl ${
            !isActive ? "bg-gray-400" : isActivated ? "bg-gray-400" : "bg-[#1A4D2E]"
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-white font-semibold text-sm text-center">
              {!isActive ? "Expired" : isActivated ? "Activated" : "Activate"}
            </Text>
          )}
        </Pressable>
      )}
    </Animated.View>
  );
};
