import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

interface QRCodeDisplayProps {
  userId?: string;
}

export const QRCodeDisplay = ({ userId }: QRCodeDisplayProps) => {
  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <View className="flex-row items-center mb-4">
        <Ionicons name="qr-code" size={28} color="#3A5A40" />
        <Text className="text-xl font-bold text-gray-800 ml-3">
          Your QR Code
        </Text>
      </View>
      <Text className="text-gray-600 mb-6 text-center">
        Show this QR code to redeem your offers
      </Text>
      <View
        className="items-center justify-center bg-white p-6 rounded-xl"
        style={styles.qrContainer}
      >
        {userId ? (
          <QRCode
            value={userId}
            size={200}
            color="#3A5A40"
            backgroundColor="white"
          />
        ) : (
          <View
            className="items-center justify-center"
            style={{ width: 200, height: 200 }}
          >
            <Ionicons name="alert-circle" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 mt-2">No QR code available</Text>
          </View>
        )}
      </View>
      <Text className="text-gray-500 text-xs text-center mt-4">
        User ID: {userId?.substring(0, 8)}...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

