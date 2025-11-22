import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Alert } from "react-native";

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

  const handleActivate = async () => {
    if (!offerId || !onActivate) return;
    
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
      Alert.alert("Error", "Failed to activate offer. Please try again.");
    }
  };

  const showActivateButton = offerId && onActivate;

  return (
    <View
      className={`rounded-xl p-5 mb-4 ${showActivateButton ? "mx-4" : ""}`}
      style={{
        backgroundColor: "#FFFFFF",
        borderLeftWidth: 4,
        borderLeftColor: isActive ? "#588157" : "#A3B18A",
      }}
    >
      <Text className="text-xl font-bold mb-2" style={{ color: "#344E41" }}>
        {productOfferName}
      </Text>
      <View className="flex-row items-center justify-between mb-2">
        <View className="px-3 py-1 rounded-full" style={{ backgroundColor: "#A3B18A" }}>
          <Text className="font-semibold" style={{ color: "#344E41" }}>
            {discountSize}
          </Text>
        </View>
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: isActive ? "#A3B18A" : "#DAD7CD" }}
        >
          <Text
            className="text-xs font-semibold"
            style={{ color: isActive ? "#344E41" : "#588157" }}
          >
            {isActive ? "Active" : "Expired"}
          </Text>
        </View>
      </View>
      {description && (
        <Text style={{ color: "#588157", fontSize: 13 }} className="mb-2 italic">
          {description}
        </Text>
      )}
      <Text style={{ color: "#3A5A40", fontSize: 14 }} className={showActivateButton ? "mb-3" : ""}>
        Valid until: {formatDate(offerEndDate)}
      </Text>
      {showActivateButton && (
        <Pressable
          onPress={handleActivate}
          disabled={loading || isActivated}
          className={`px-4 py-2 rounded-xl ${
            isActivated ? "bg-gray-400" : "bg-[#588157]"
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-white font-semibold text-sm text-center">
              {isActivated ? "Activated" : "Activate"}
            </Text>
          )}
        </Pressable>
      )}
    </View>
  );
};
