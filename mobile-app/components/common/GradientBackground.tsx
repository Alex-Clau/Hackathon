import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: "default" | "light" | "dark";
}

export const GradientBackground = ({ children, variant = "default" }: GradientBackgroundProps) => {
  const getColors = () => {
    switch (variant) {
      case "light":
        return ["#F5EFE6", "#E8DFCA", "#F5EFE6"];
      case "dark":
        return ["#1A4D2E", "#4F6F52", "#1A4D2E"];
      default:
        return ["#E8DFCA", "#F5EFE6", "#E8DFCA"];
    }
  };

  return (
    <LinearGradient
      colors={getColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

