import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { palette } from "../theme";

type BottomTabKey = "tools" | "tips" | "history";

interface BottomNavProps {
  activeTab: BottomTabKey;
  onHomePress: () => void;
  onTipsPress: () => void;
  onHistoryPress: () => void;
}

function NavButton({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        active && styles.activeButton,
        pressed && styles.pressed,
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={active ? palette.primary : "#9CA3AF"}
      />
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

export function BottomNav({
  activeTab,
  onHomePress,
  onTipsPress,
  onHistoryPress,
}: BottomNavProps) {
  return (
    <View style={styles.container}>
      <NavButton
        label="Home"
        icon="home-outline"
        active={activeTab === "tools"}
        onPress={onHomePress}
      />
      <NavButton
        label="Tips"
        icon="lightbulb-outline"
        active={activeTab === "tips"}
        onPress={onTipsPress}
      />
      <NavButton
        label="History"
        icon="history"
        active={activeTab === "history"}
        onPress={onHistoryPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    backgroundColor: palette.surface,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 8,
    gap: 2,
  },
  activeButton: {
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  activeLabel: {
    color: palette.primary,
  },
});
