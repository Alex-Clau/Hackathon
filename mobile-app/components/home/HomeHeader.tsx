import { View, Text, TouchableOpacity } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface HomeHeaderProps {
  offersCount: number;
}

export const HomeHeader = ({ offersCount }: HomeHeaderProps) => {
  const { user } = useAuthContext();

  const handleProfilePress = () => {
    console.log("Profile button pressed, navigating to /profile");
    try {
      router.push("/profile");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <View className="px-6 pt-16 pb-6" style={{ backgroundColor: "#3A5A40" }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: "#DAD7CD" }}
          >
            Discover Offers
          </Text>
          <Text className="text-base" style={{ color: "#A3B18A" }}>
            {offersCount} {offersCount === 1 ? "active partner" : "active partners"}
          </Text>
        </View>
        {user && (
          <TouchableOpacity
            className="rounded-full p-2"
            style={{ backgroundColor: "#588157" }}
            onPress={handleProfilePress}
          >
            <Ionicons name="person-outline" size={24} color="#DAD7CD" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
