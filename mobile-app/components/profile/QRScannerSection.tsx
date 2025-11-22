import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface QRScannerSectionProps {
  scannedUserId: string | null;
  onScanQR: () => void;
}

export const QRScannerSection = ({
  scannedUserId,
  onScanQR,
}: QRScannerSectionProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <View className="bg-white m-4 p-6 rounded-xl shadow-sm">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Ionicons name="qr-code-outline" size={28} color="#3A5A40" />
          <Text className="text-xl font-bold text-gray-800 ml-3">
            Scan User QR
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
                How to Scan QR Codes
              </Text>
              <TouchableOpacity onPress={() => setShowInfo(false)}>
                <Ionicons name="close" size={24} color="#3A5A40" />
              </TouchableOpacity>
            </View>

            <View className="space-y-4">
              <View className="flex-row items-start">
                <Ionicons
                  name="camera"
                  size={24}
                  color="#588157"
                  style={{ marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold mb-1"
                    style={{ color: "#344E41" }}
                  >
                    Verify User Identity
                  </Text>
                  <Text className="text-sm" style={{ color: "#588157" }}>
                    Ask users to show their QR code from the app, then tap "Scan
                    QR Code" to verify them.
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start mt-4">
                <Ionicons
                  name="checkmark-done"
                  size={24}
                  color="#588157"
                  style={{ marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold mb-1"
                    style={{ color: "#344E41" }}
                  >
                    Add Offers Instantly
                  </Text>
                  <Text className="text-sm" style={{ color: "#588157" }}>
                    Once verified, you can instantly add available offers to the
                    user's account.
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
                    Secure Process
                  </Text>
                  <Text className="text-sm" style={{ color: "#588157" }}>
                    Each QR code is unique and securely linked to the user's
                    account for safe transactions.
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
