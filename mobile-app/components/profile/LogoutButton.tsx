import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <View className="bg-white border-t border-gray-200 px-4 py-4">
      <TouchableOpacity
        className="bg-red-600 py-3 px-4 rounded-lg"
        onPress={onLogout}
      >
        <View className="flex-row items-center justify-center">
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white text-center font-semibold text-base ml-2">
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

