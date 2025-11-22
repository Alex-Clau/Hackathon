import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddOfferSectionProps {
  onAddOffer: () => void;
}

export const AddOfferSection = ({ onAddOffer }: AddOfferSectionProps) => {
  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <View className="flex-row items-center mb-4">
        <Ionicons name="add-circle-outline" size={28} color="#1A4D2E" />
        <Text className="text-xl font-bold text-gray-800 ml-3">Add Offer</Text>
      </View>
      <Text className="text-gray-600 mb-4">
        Add an offer to the scanned user's account
      </Text>

      <TouchableOpacity
        className="bg-[#1A4D2E] py-3 px-4 rounded-lg"
        onPress={onAddOffer}
      >
        <Text className="text-white text-center font-semibold text-base">
          Add Offer to User
        </Text>
      </TouchableOpacity>
    </View>
  );
};
