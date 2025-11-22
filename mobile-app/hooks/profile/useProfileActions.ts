import { Alert } from "react-native";
import { router } from "expo-router";

interface User {
  displayName?: string | null;
  email?: string | null;
}

export const useProfileActions = (logout: () => Promise<void>) => {
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/auth");
        },
      },
    ]);
  };

  const handleBackPress = (isAdmin: boolean = false) => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(isAdmin ? "/admin" : "/");
    }
  };

  return { handleLogout, handleBackPress };
};
