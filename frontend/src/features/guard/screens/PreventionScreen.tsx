import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { C, FONTS } from '../../drying/src/components/theme';

export default function PreventionScreen() {
  const navigation = useNavigation<any>();

  const { imageUri, disease, prevention, treatment } = useLocalSearchParams<{
    imageUri?: string;
    disease?: string;
    prevention?: string;
    treatment?: string;
  }>();

  const [activeTab, setActiveTab] = useState<"prevention" | "treatment">(
    "prevention"
  );

  const preventionText =
    prevention || "Inspect plants regularly, avoid excess moisture, remove infected parts early, and maintain good field hygiene.";

  const treatmentText =
    treatment || "Remove infected parts safely and apply recommended fungicide or treatment under agricultural guidance.";

  const content =
    activeTab === "prevention"
      ? [
          {
            icon: "shield-checkmark-outline",
            title: "Prevention Advice",
            text: preventionText,
          },
          {
            icon: "eye-outline",
            title: "Regular Monitoring",
            text: "Check cinnamon leaves, bark, and stems weekly for early symptoms.",
          },
          {
            icon: "water-outline",
            title: "Moisture Control",
            text: "Avoid overwatering and reduce wet conditions around the plant.",
          },
        ]
      : [
          {
            icon: "medkit-outline",
            title: "Treatment Advice",
            text: treatmentText,
          },
          {
            icon: "cut-outline",
            title: "Remove Infected Parts",
            text: "Remove diseased leaves or bark and dispose of them safely.",
          },
          {
            icon: "person-outline",
            title: "Expert Support",
            text: "Contact an agriculture officer before applying strong chemicals.",
          },
        ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={C.spice} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Care Guide</Text>

        <TouchableOpacity style={styles.iconButton} onPress={() => router.replace("/")}>
          <Ionicons name="close" size={22} color={C.spice} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name="leaf-outline" size={34} color={C.surface} />
          </View>

          <Text style={styles.heroLabel}>Detected Disease</Text>
          <Text style={styles.disease}>{disease || "Cinnamon Disease"}</Text>

          <Text style={styles.heroText}>
            Follow the recommended prevention and treatment steps below.
          </Text>
        </View>

        {imageUri && (
          <View style={styles.imageCard}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        )}

        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "prevention" && styles.activeTab]}
            onPress={() => setActiveTab("prevention")}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={17}
              color={activeTab === "prevention" ? C.surface : C.spice}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "prevention" && styles.activeTabText,
              ]}
            >
              Prevention
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "treatment" && styles.activeTab]}
            onPress={() => setActiveTab("treatment")}
          >
            <Ionicons
              name="medkit-outline"
              size={17}
              color={activeTab === "treatment" ? C.surface : C.spice}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "treatment" && styles.activeTabText,
              ]}
            >
              Treatment
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          {activeTab === "prevention" ? "Prevention Tips" : "Treatment Tips"}
        </Text>

        {content.map((item, index) => (
          <View style={styles.tipCard} key={index}>
            <View style={styles.tipIconBox}>
              <Ionicons name={item.icon as any} size={22} color={C.spice} />
            </View>

            <View style={styles.tipTextWrap}>
              <Text style={styles.tipTitle}>{item.title}</Text>
              <Text style={styles.tipText}>{item.text}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => router.replace("/camera")}
        >
          <Ionicons name="camera-outline" size={20} color={C.surface} />
          <Text style={styles.scanButtonText}>Scan Another Leaf</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bgMid,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: C.surface,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: C.spice,
  },

  content: {
    paddingBottom: 34,
  },

  heroCard: {
    backgroundColor: C.spice,
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
    elevation: 6,
  },

  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 26,
    backgroundColor: C.spice,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  heroLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: C.borderLight,
  },

  disease: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: "900",
    color: C.surface,
    textAlign: "center",
  },

  heroText: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: C.borderLight,
    textAlign: "center",
  },

  imageCard: {
    marginTop: 18,
    backgroundColor: C.surface,
    padding: 10,
    borderRadius: 24,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 190,
    borderRadius: 18,
  },

  tabWrapper: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: C.honeyLight,
    borderRadius: 22,
    padding: 5,
  },

  tab: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  activeTab: {
    backgroundColor: C.spice,
  },

  tabText: {
    fontSize: 13,
    color: C.spice,
    fontWeight: "900",
  },

  activeTabText: {
    color: C.surface,
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "900",
    color: C.spice,
  },

  tipCard: {
    flexDirection: "row",
    backgroundColor: C.surface,
    padding: 16,
    borderRadius: 22,
    marginBottom: 12,
    elevation: 3,
  },

  tipIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: C.honeyLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  tipTextWrap: {
    flex: 1,
  },

  tipTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: C.spice,
  },

  tipText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
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

  scanButtonText: {
    color: C.surface,
    fontSize: 15,
    fontWeight: "900",
  },
});