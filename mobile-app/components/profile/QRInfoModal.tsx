import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InfoItem {
  icon: string;
  title: string;
  description: string;
}

interface QRInfoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  items: InfoItem[];
}

export const QRInfoModal = ({ visible, onClose, title, items }: QRInfoModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold" style={{ color: "#3A5A40" }}>
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#3A5A40" />
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {items.map((item, index) => (
              <View 
                key={index} 
                className="flex-row items-start" 
                style={index > 0 ? { marginTop: 16 } : undefined}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color="#588157"
                  style={{ marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold mb-1"
                    style={{ color: "#344E41" }}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-sm" style={{ color: "#588157" }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            className="mt-6 py-3 px-4 rounded-lg"
            style={{ backgroundColor: "#3A5A40" }}
            onPress={onClose}
          >
            <Text className="text-white text-center font-semibold">Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
