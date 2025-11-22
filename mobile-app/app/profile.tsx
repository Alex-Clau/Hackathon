import { View, ScrollView } from "react-native";
import { useAuthContext } from "../contexts/AuthContext";
import { useProfileActions } from "../hooks/profile/useProfileActions";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { QRCodeDisplay } from "../components/profile/QRCodeDisplay";
import { AccountInfo } from "../components/profile/AccountInfo";
import { SettingsSection } from "../components/profile/SettingsSection";
import { LogoutButton } from "../components/profile/LogoutButton";

export default function ProfileScreen() {
  const { user, logout } = useAuthContext();
  const { handleLogout, handleBackPress } = useProfileActions(logout);

  const settingsItems = [
    { icon: "notifications-outline", label: "Notifications" },
    { icon: "settings-outline", label: "Preferences" },
    { icon: "help-circle-outline", label: "Help & Support" },
  ];

  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : undefined;

  return (
    <View className="flex-1 bg-gray-50">
      <ProfileHeader
        title="My Profile"
        userName={user?.displayName}
        userEmail={user?.email}
        onBackPress={() => handleBackPress(false)}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <QRCodeDisplay userId={user?.uid} />

        <AccountInfo
          email={user?.email}
          displayName={user?.displayName}
          memberSince={memberSince}
        />

        <SettingsSection items={settingsItems} />
      </ScrollView>

      <LogoutButton onLogout={handleLogout} />
    </View>
  );
}
