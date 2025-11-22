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
        borderLeftColor: isActive ? "#588157" : "#A3B18A",
      }}
    >
      <Text className="text-lg font-semibold mb-1" style={{ color: "#344E41" }}>
        {productOfferName}
      </Text>
      <Text className="mb-2" style={{ color: "#588157" }}>
        {discountSize}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text style={{ color: "#3A5A40", fontSize: 12 }}>{formattedDate}</Text>
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
    </View>
  );
};
