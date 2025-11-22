import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { QRInfoModal } from "./QRInfoModal";

interface QRScannerSectionProps {
  scannedUserId: string | null;
  onScanQR: () => void;
}

export const QRScannerSection = ({
  scannedUserId,
  onScanQR,
}: QRScannerSectionProps) => {
  const [showInfo, setShowInfo] = useState(false);

  const infoItems = [
    {
      icon: "camera",
      title: "Verify User Identity",
      description: 'Ask users to show their QR code from the app, then tap "Scan QR Code" to verify them.',
    },
    {
      icon: "checkmark-done",
      title: "Add Offers Instantly",
      description: "Once verified, you can instantly add available offers to the user's account.",
    },
    {
      icon: "shield-checkmark",
      title: "Secure Process",
      description: "Each QR code is unique and securely linked to the user's account for safe transactions.",
    },
  ];

  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Ionicons name="qr-code-outline" size={28} color="#1A4D2E" />
          <Text className="text-xl font-bold text-gray-800 ml-3">
            Scan User QR
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowInfo(true)}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#1A4D2E"
          />
        </TouchableOpacity>
      </View>
      <Text className="text-gray-600 mb-4">
        Scan a user's QR code to verify their account and add offers
      </Text>
      <TouchableOpacity
        className="bg-[#1A4D2E] py-3 px-4 rounded-lg mb-3"
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

      <QRInfoModal
        visible={showInfo}
        onClose={() => setShowInfo(false)}
        title="How to Scan QR Codes"
        items={infoItems}
      />
    </View>
  );
};
