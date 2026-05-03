import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { C, FONTS } from '../../drying/src/components/theme';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const handleUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission required to access gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate('Detection', {
          imageUri: result.assets[0].uri,
        });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.topBadge}>
          <Ionicons name="leaf-outline" size={16} color={C.surface} />
          <Text style={styles.topBadgeText}>AI Cinnamon Care</Text>
        </View>

        <Image
          source={require("../assets/images/cinnamon.png")}
          style={styles.heroImage}
          resizeMode="contain"
        />

        <Text style={styles.heroTitle}>Protect Your Cinnamon</Text>
        <Text style={styles.heroSubtitle}>
          Detect cinnamon leaf diseases quickly using AI-based image analysis.
        </Text>
      </View>

      {/* Main Action Cards */}
      <View style={styles.cardRow}>
        <TouchableOpacity
          style={styles.primaryCard}
          activeOpacity={0.85}
          onPress={handleUpload}
        >
          <View style={styles.cardIconBox}>
            <Ionicons name="cloud-upload-outline" size={30} color={C.spice} />
          </View>
          <Text style={styles.cardTitle}>Upload Image</Text>
          <Text style={styles.cardDescription}>Choose leaf photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Guide')}
        >
          <View style={styles.cardIconBox}>
            <Ionicons name="scan-outline" size={30} color={C.spice} />
          </View>
          <Text style={styles.cardTitle}>Scan Guide</Text>
          <Text style={styles.cardDescription}>How to scan</Text>
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <View style={styles.infoIcon}>
            <Ionicons name="sparkles-outline" size={22} color={C.spiceDim} />
          </View>
          <View>
            <Text style={styles.infoTitle}>Smart Disease Detection</Text>
            <Text style={styles.infoSubtitle}>Fast, simple and farmer friendly</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <Ionicons name="camera-outline" size={18} color={C.spice} />
            <Text style={styles.featureText}>Image-based scan</Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="analytics-outline" size={18} color={C.spice} />
            <Text style={styles.featureText}>Confidence score</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <Ionicons name="medkit-outline" size={18} color={C.spice} />
            <Text style={styles.featureText}>Treatment tips</Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="time-outline" size={18} color={C.spice} />
            <Text style={styles.featureText}>Scan history</Text>
          </View>
        </View>
      </View>

      {/* Scan History Button */}
      <TouchableOpacity
        style={styles.historyButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ScanHistory')}
      >
        <Ionicons name="time-outline" size={20} color={C.surface} />
        <Text style={styles.historyText}>View Scan History</Text>
        <Ionicons name="chevron-forward" size={18} color={C.surface} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bgMid,
  },

  scrollContent: {
    paddingBottom: 34,
  },

  hero: {
    backgroundColor: C.spice,
    alignItems: "center",
    paddingTop: 54,
    paddingBottom: 58,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },

  topBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 16,
  },

  topBadgeText: {
    color: C.surface,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  heroImage: {
    width: 210,
    height: 210,
    marginBottom: 8,
  },

  heroTitle: {
    color: C.surface,
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },

  heroSubtitle: {
    marginTop: 8,
    color: C.borderLight,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    maxWidth: 310,
  },

  cardRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: -34,
    paddingHorizontal: 20,
  },

  primaryCard: {
    flex: 1,
    backgroundColor: C.surface,
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: C.text,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },

  cardIconBox: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: C.honeyLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: C.spice,
  },

  cardDescription: {
    marginTop: 4,
    fontSize: 12,
    color: C.muted,
  },

  infoCard: {
    marginTop: 22,
    marginHorizontal: 20,
    backgroundColor: C.surface,
    borderRadius: 26,
    padding: 20,
    shadowColor: C.text,
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },

  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: C.honeyLight,
    alignItems: "center",
    justifyContent: "center",
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: C.spice,
  },

  infoSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: C.muted,
  },

  featureRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  featureItem: {
    flex: 1,
    backgroundColor: C.bgMid,
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  featureText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: C.spice,
  },

  historyButton: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: C.spice,
    paddingVertical: 16,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: C.spice,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },

  historyText: {
    color: C.surface,
    fontSize: 15,
    fontWeight: "800",
  },
});