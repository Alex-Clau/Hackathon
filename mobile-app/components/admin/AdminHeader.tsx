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
      style={{ backgroundColor: "#1A4D2E" }}
    >
      <View className="flex-1">
        <Text className="text-3xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
          {userName || userEmail?.split("@")[0] || "Admin"} Dashboard
        </Text>
        <Text style={{ color: "#E8DFCA" }}>Company Analytics</Text>
      </View>
      <TouchableOpacity
        onPress={handleProfilePress}
        className="rounded-full p-2"
        style={{ backgroundColor: "#4F6F52" }}
        activeOpacity={0.7}
      >
        <Ionicons name="person-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
