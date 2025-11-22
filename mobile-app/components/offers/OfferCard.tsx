import { View, Text, Image, Pressable } from "react-native";
import React from "react";

interface OfferCardProps {
  image: string;
  title: string;
  companyName: string;
  offersCount: number;
  onPress: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({
  image,
  title,
  companyName,
  offersCount,
  onPress,
}) => {
  return (
    <View className="bg-white rounded-xl shadow-md m-4 overflow-hidden">
      {/* Company Logo */}
      <View className="bg-gray-50 p-6 items-center justify-center min-h-[180px]">
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-32 h-32 rounded-lg"
            resizeMode="contain"
            onError={(error) => {
              console.error("Image load error:", error.nativeEvent.error);
            }}
          />
        ) : (
          <View className="w-32 h-32 bg-gray-300 rounded-lg items-center justify-center">
            <Text className="text-gray-500 text-lg">No Logo</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Title */}
        <Text className="text-xl font-bold text-gray-800 mb-2">{title}</Text>

        {/* Offers Count */}
        <Text className="text-sm text-gray-600 mb-4">
          {offersCount} {offersCount === 1 ? "offer" : "offers"} available
        </Text>

        {/* Button */}
        <Pressable
          onPress={onPress}
          className="bg-blue-600 py-3 px-4 rounded-lg active:bg-blue-700"
        >
          <Text className="text-white text-center font-semibold">
            View {companyName} Offers
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OfferCard;
