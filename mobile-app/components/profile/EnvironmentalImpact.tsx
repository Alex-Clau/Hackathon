import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { calculateEnvironmentalImpact } from "../../lib/badgeSystem";

interface EnvironmentalImpactProps {
  totalKg: number;
}

export const EnvironmentalImpact = ({ totalKg }: EnvironmentalImpactProps) => {
  const impact = calculateEnvironmentalImpact(totalKg);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toFixed(2);
  };

  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <View className="flex-row items-center mb-4">
        <Ionicons name="earth" size={28} color="#3A5A40" />
        <Text className="text-xl font-bold text-gray-800 ml-3">
          Your Environmental Impact
        </Text>
      </View>
      <Text className="text-gray-600 mb-6 text-center">
        By donating {totalKg.toFixed(1)}kg of clothing, you've made a real
        difference!
      </Text>
      <View className="space-y-4">
        {/* CO2 Saved */}
        <View className="bg-green-50 p-4 rounded-lg">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View
                className="rounded-full p-2 mr-3"
                style={{ backgroundColor: "#588157" }}
              >
                <Ionicons name="cloud-outline" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-sm" style={{ color: "#3A5A40" }}>
                  CO₂ Emissions Avoided
                </Text>
                <Text
                  className="text-2xl font-bold"
                  style={{ color: "#344E41" }}
                >
                  {formatNumber(impact.co2Saved)} kg
                </Text>
              </View>
            </View>
          </View>
          <Text className="text-xs mt-2" style={{ color: "#588157" }}>
            ≈ {impact.treesEquivalent.toFixed(1)} trees planted for a year
          </Text>
        </View>
        {/* Water Saved */}
        <View className="bg-blue-50 p-4 rounded-lg">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View
                className="rounded-full p-2 mr-3"
                style={{ backgroundColor: "#4A90E2" }}
              >
                <Ionicons name="water-outline" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-sm" style={{ color: "#2C5F8D" }}>
                  Water Saved
                </Text>
                <Text
                  className="text-2xl font-bold"
                  style={{ color: "#1E4D6B" }}
                >
                  {formatNumber(impact.waterSaved)} L
                </Text>
              </View>
            </View>
          </View>
          <Text className="text-xs mt-2" style={{ color: "#4A90E2" }}>
            Enough for {(impact.waterSaved / 150).toFixed(0)} showers
          </Text>
        </View>
        {/* Landfill Space Saved */}
        <View className="bg-amber-50 p-4 rounded-lg">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View
                className="rounded-full p-2 mr-3"
                style={{ backgroundColor: "#F59E0B" }}
              >
                <Ionicons name="trash-outline" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-sm" style={{ color: "#92400E" }}>
                  Landfill Space Saved
                </Text>
                <Text
                  className="text-2xl font-bold"
                  style={{ color: "#78350F" }}
                >
                  {impact.landfillSpaceSaved.toFixed(2)} m³
                </Text>
              </View>
            </View>
          </View>
          <Text className="text-xs mt-2" style={{ color: "#F59E0B" }}>
            Reduced methane & pollution
          </Text>
        </View>
        {/* Raw Materials Saved */}
        <View className="bg-purple-50 p-4 rounded-lg">
          <View className="flex-row items-center">
            <View
              className="rounded-full p-2 mr-3"
              style={{ backgroundColor: "#8B5CF6" }}
            >
              <Ionicons name="shirt-outline" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text
                className="text-sm font-semibold"
                style={{ color: "#6B21A8" }}
              >
                Resources Preserved
              </Text>
              <Text className="text-xs mt-1" style={{ color: "#7C3AED" }}>
                • No cotton farming needed
              </Text>
              <Text className="text-xs" style={{ color: "#7C3AED" }}>
                • No synthetic fiber production
              </Text>
              <Text className="text-xs" style={{ color: "#7C3AED" }}>
                • No chemicals & dyes used
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

