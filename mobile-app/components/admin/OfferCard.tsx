import { View, Text } from "react-native";

interface OfferCardProps {
  productOfferName: string;
  discountSize: string;
  offerEndDate: any;
  isActive: boolean;
}

export const OfferCard = ({
  productOfferName,
  discountSize,
  offerEndDate,
  isActive,
}: OfferCardProps) => {
  const formattedDate = offerEndDate?.toDate
    ? offerEndDate.toDate().toLocaleDateString()
    : new Date(offerEndDate).toLocaleDateString();

  return (
    <View
      className="rounded-xl p-4 mb-3"
      style={{
        backgroundColor: "#FFFFFF",
        borderLeftWidth: 4,
        borderLeftColor: isActive ? "#4F6F52" : "#E8DFCA",
      }}
    >
      <Text className="text-lg font-semibold mb-1" style={{ color: "#1A4D2E" }}>
        {productOfferName}
      </Text>
      <Text className="mb-2" style={{ color: "#4F6F52" }}>
        {discountSize}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text style={{ color: "#1A4D2E", fontSize: 12 }}>{formattedDate}</Text>
        <View
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor: isActive ? "#E8DFCA" : "#F5EFE6",
          }}
        >
          <Text
            className="text-xs font-semibold"
            style={{
              color: isActive ? "#1A4D2E" : "#4F6F52",
            }}
          >
            {isActive ? "Active" : "Expired"}
          </Text>
        </View>
      </View>
    </View>
  );
};
