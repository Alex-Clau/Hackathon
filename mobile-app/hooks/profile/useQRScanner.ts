import { useState } from "react";
import { Alert } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const useQRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedUserId, setScannedUserId] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const handleScanQR = async () => {
    if (!permission) return;

    if (!permission.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert(
          "Permission Required",
          "Camera permission is required to scan QR codes"
        );
        return;
      }
    }

    setScanning(true);
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanning(false);
    await verifyUser(data);
  };

  const verifyUser = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setScannedUserId(userId);
        const userData = userDoc.data();
        Alert.alert(
          "User Verified",
          `User: ${userData?.email || userId}\n\nYou can now manage their offers.`
        );
      } else {
        Alert.alert("Error", "User not found");
        setScannedUserId(null);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      Alert.alert("Error", "Failed to verify user");
      setScannedUserId(null);
    }
  };

  const closeScanner = () => {
    setScanning(false);
  };

  const clearScannedUser = () => {
    setScannedUserId(null);
  };

  return {
    scanning,
    scannedUserId,
    handleScanQR,
    handleBarCodeScanned,
    closeScanner,
    clearScannedUser,
  };
};

