import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface AdminHeaderProps {
  userName?: string;
  userEmail?: string;
}

export const AdminHeader = ({ userName, userEmail }: AdminHeaderProps) => {
  const handleProfilePress = () => {
    router.push("/admin-profile");
  };

  return (
    <View
      className="flex-row items-center justify-between mb-6 p-5 rounded-2xl"
      style={{ backgroundColor: "#3A5A40" }}
    >
      <View className="flex-1">
        <Text className="text-3xl font-bold mb-2" style={{ color: "#DAD7CD" }}>
          {userName || userEmail?.split("@")[0] || "Admin"} Dashboard
        </Text>
        <Text style={{ color: "#A3B18A" }}>Company Analytics</Text>
      </View>
      <TouchableOpacity
        onPress={handleProfilePress}
        className="rounded-full p-2"
        style={{ backgroundColor: "#588157" }}
        activeOpacity={0.7}
      >
        <Ionicons name="person-outline" size={24} color="#DAD7CD" />
      </TouchableOpacity>
    </View>
  );
};
