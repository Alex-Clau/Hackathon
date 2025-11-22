import { View, ScrollView } from "react-native";
import { useAuthContext } from "../contexts/AuthContext";
import { useProfileActions } from "../hooks/profile/useProfileActions";
import { useQRScanner } from "../hooks/profile/useQRScanner";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { QRScannerSection } from "../components/profile/QRScannerSection";
import { AddOfferSection } from "../components/profile/AddOfferSection";
import { SettingsSection } from "../components/profile/SettingsSection";
import { LogoutButton } from "../components/profile/LogoutButton";
import { QRScannerModal } from "../components/profile/QRScannerModal";

export default function AdminProfileScreen() {
  const { user, logout } = useAuthContext();
  const { handleLogout, handleBackPress } = useProfileActions(logout);
  const {
    scanning,
    scannedUserId,
    handleScanQR,
    handleBarCodeScanned,
    handleAddOffer,
    closeScanner,
  } = useQRScanner();

  const settingsItems = [{ icon: "settings-outline", label: "Settings" }];

  return (
    <View className="flex-1 bg-gray-50">
      <ProfileHeader
        title="Admin Profile"
        userName={user?.displayName}
        userEmail={user?.email}
        onBackPress={() => handleBackPress(true)}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <QRScannerSection
          scannedUserId={scannedUserId}
          onScanQR={handleScanQR}
        />

        {scannedUserId && <AddOfferSection onAddOffer={handleAddOffer} />}

        <SettingsSection items={settingsItems} />
      </ScrollView>

      <LogoutButton onLogout={handleLogout} />

      <QRScannerModal
        visible={scanning}
        onClose={closeScanner}
        onBarcodeScanned={handleBarCodeScanned}
      />
    </View>
  );
}
