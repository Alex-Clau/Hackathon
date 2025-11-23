import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

interface QRScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onBarcodeScanned: (data: { data: string }) => void;
}

export const QRScannerModal = ({
  visible,
  onClose,
  onBarcodeScanned,
}: QRScannerModalProps) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.scannerContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={onBarcodeScanned}
        >
          <View style={styles.overlay}>
            <Text style={styles.scannerText}>Scan User QR Code</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scannerContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    padding: 20,
  },
  scannerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 30,
    padding: 10,
    marginBottom: 40,
  },
});

