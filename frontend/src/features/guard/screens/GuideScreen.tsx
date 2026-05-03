import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { C, FONTS } from '../../drying/src/components/theme';

const tips = [
  {
    icon: "leaf-outline",
    title: "Capture the infected area",
    text: "Take a clear photo of the leaf, bark, or stem where symptoms are visible.",
  },
  {
    icon: "sunny-outline",
    title: "Use good lighting",
    text: "Natural daylight gives better detection accuracy.",
  },
  {
    icon: "contrast-outline",
    title: "Avoid shadows",
    text: "Keep shadows away from the infected area.",
  },
  {
    icon: "hand-left-outline",
    title: "Keep camera steady",
    text: "Hold your phone still before capturing the image.",
  },
  {
    icon: "scan-outline",
    title: "Focus closely",
    text: "Make sure the symptom area is sharp and not blurred.",
  },
];

export default function GuideScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} color={C.spice} />
      </TouchableOpacity>

      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Ionicons name="camera-outline" size={38} color={C.surface} />
        </View>

        <Text style={styles.title}>Scan Guide</Text>
        <Text style={styles.subtitle}>
          Follow these simple steps to get a more accurate cinnamon disease
          detection result.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Before You Scan</Text>

      {tips.map((tip, index) => (
        <View style={styles.tipCard} key={index}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepText}>{index + 1}</Text>
          </View>

          <View style={styles.tipIconBox}>
            <Ionicons name={tip.icon as any} size={22} color={C.spice} />
          </View>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipText}>{tip.text}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.scanButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Camera')}
      >
        <Ionicons name="camera" size={20} color={C.surface} />
        <Text style={styles.scanText}>Start Scanning</Text>
        <Ionicons name="arrow-forward" size={18} color={C.surface} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bgMid,
  },

  content: {
    padding: 22,
    paddingBottom: 34,
  },

  closeButton: {
    alignSelf: "flex-end",
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: C.surface,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  heroCard: {
    marginTop: 18,
    backgroundColor: C.spice,
    borderRadius: 30,
    padding: 26,
    alignItems: "center",
    elevation: 6,
  },

  heroIcon: {
    width: 78,
    height: 78,
    borderRadius: 28,
    backgroundColor: C.spice,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: C.surface,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    color: C.borderLight,
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 14,
    fontSize: 18,
    fontWeight: "900",
    color: C.spice,
  },

  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surface,
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
  },

  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: C.spiceDim,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  stepText: {
    color: C.surface,
    fontSize: 12,
    fontWeight: "900",
  },

  tipIconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: C.honeyLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: C.spice,
  },

  tipText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 17,
    color: C.muted,
  },

  scanButton: {
    marginTop: 18,
    backgroundColor: C.spice,
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 6,
  },

  scanText: {
    color: C.surface,
    fontSize: 15,
    fontWeight: "900",
  },
});