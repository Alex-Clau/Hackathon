import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QRScannerSectionProps {
  scannedUserId: string | null;
  onScanQR: () => void;
}

export const QRScannerSection = ({
  scannedUserId,
  onScanQR,
}: QRScannerSectionProps) => {
  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <View className="flex-row items-center mb-4">
        <Ionicons name="qr-code-outline" size={28} color="#3A5A40" />
        <Text className="text-xl font-bold text-gray-800 ml-3">
          Scan User QR
        </Text>
      </View>
      <Text className="text-gray-600 mb-4">
        Scan a user's QR code to verify their account and add offers
      </Text>
      <TouchableOpacity
        className="bg-[#588157] py-3 px-4 rounded-lg mb-3"
        onPress={onScanQR}
      >
        <Text className="text-white text-center font-semibold text-base">
          Scan QR Code
        </Text>
      </TouchableOpacity>
      {scannedUserId && (
        <View className="bg-green-50 p-3 rounded-lg">
          <Text className="text-green-700 font-semibold">
            ✓ User verified: {scannedUserId}
          </Text>
        </View>
      )}
    </View>
  );
};

