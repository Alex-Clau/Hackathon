import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AccountInfoProps {
  email?: string | null;
  displayName?: string | null;
  memberSince?: string;
}

export const AccountInfo = ({
  email,
  displayName,
  memberSince,
}: AccountInfoProps) => {
  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Account Information
      </Text>

      <View className="space-y-3">
        <View className="flex-row items-center py-2">
          <Ionicons name="mail-outline" size={20} color="#3A5A40" />
          <View className="ml-3 flex-1">
            <Text className="text-gray-500 text-xs">Email</Text>
            <Text className="text-gray-800 text-base">
              {email || "Not available"}
            </Text>
          </View>
        </View>

        <View className="border-t border-gray-200" />

        <View className="flex-row items-center py-2">
          <Ionicons name="person-outline" size={20} color="#3A5A40" />
          <View className="ml-3 flex-1">
            <Text className="text-gray-500 text-xs">Display Name</Text>
            <Text className="text-gray-800 text-base">
              {displayName || "Not set"}
            </Text>
          </View>
        </View>

        <View className="border-t border-gray-200" />

        <View className="flex-row items-center py-2">
          <Ionicons name="calendar-outline" size={20} color="#3A5A40" />
          <View className="ml-3 flex-1">
            <Text className="text-gray-500 text-xs">Member Since</Text>
            <Text className="text-gray-800 text-base">
              {memberSince || "Unknown"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
