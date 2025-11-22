import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuthContext } from "../contexts/AuthContext";

function RootLayoutNav() {
  const { user, userData, loading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";
    const inAdminGroup = segments[0] === "admin";
    const inProfilePage = segments[0] === "profile";
    const inAdminProfilePage = segments[0] === "admin-profile";

    if (!user) {
      if (!inAuthGroup) {
        router.replace("/auth");
      }
    } else if (user && userData) {
      if (userData.role === "admin") {
        if (!inAdminGroup && !inProfilePage && !inAdminProfilePage) {
          router.replace("/admin");
        }
      } else {
        if (inAuthGroup || inAdminGroup) {
          router.replace("/");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userData, loading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="admin" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="admin-profile" />
      <Stack.Screen name="company/[id]" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
