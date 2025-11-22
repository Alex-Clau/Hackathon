import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useState } from "react";

interface QRCodeDisplayProps {
  userId?: string;
}

export const QRCodeDisplay = ({ userId }: QRCodeDisplayProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Ionicons name="qr-code" size={28} color="#3A5A40" />
          <Text className="text-xl font-bold text-gray-800 ml-3">
            Your QR Code
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowInfo(true)}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#588157"
          />
        </TouchableOpacity>
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

      <Modal
        visible={showInfo}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInfo(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold" style={{ color: "#3A5A40" }}>
                How to Use Your QR Code
              </Text>
              <TouchableOpacity onPress={() => setShowInfo(false)}>
                <Ionicons name="close" size={24} color="#3A5A40" />
              </TouchableOpacity>
            </View>

            <View className="space-y-4">
              <View className="flex-row items-start">
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="#588157"
                  style={{ marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold mb-1"
                    style={{ color: "#344E41" }}
                  >
                    Show to Redeem Offers
                  </Text>
                  <Text className="text-sm" style={{ color: "#588157" }}>
                    Present this QR code to participating stores to redeem your
                    available offers.
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start mt-4">
                <Ionicons
                  name="shield-checkmark"
                  size={24}
                  color="#588157"
                  style={{ marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold mb-1"
                    style={{ color: "#344E41" }}
                  >
                    Secure & Unique
                  </Text>
                  <Text className="text-sm" style={{ color: "#588157" }}>
                    Your QR code is unique to your account and securely linked
                    to your offers.
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start mt-4">
                <Ionicons
                  name="scan"
                  size={24}
                  color="#588157"
                  style={{ marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold mb-1"
                    style={{ color: "#344E41" }}
                  >
                    Quick Verification
                  </Text>
                  <Text className="text-sm" style={{ color: "#588157" }}>
                    Store staff will scan your code to instantly verify and
                    apply your offers.
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              className="mt-6 py-3 px-4 rounded-lg"
              style={{ backgroundColor: "#3A5A40" }}
              onPress={() => setShowInfo(false)}
            >
              <Text className="text-white text-center font-semibold">
                Got it!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
});
