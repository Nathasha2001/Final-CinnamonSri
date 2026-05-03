import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { C, FONTS, SHADOWS } from '../../drying/src/components/theme';

const API_URL = "http://172.28.29.127:8000/detect";
const SERVER = "http://172.28.29.127:8000";

export default function DetectionScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = route.params || {};

  const imageUri =
    typeof params.imageUri === "string"
      ? params.imageUri
      : params.imageUri?.[0];

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    sendImage();
  }, []);

  const sendImage = async () => {
    try {
      const formData = new FormData();

      formData.append("file", {
        uri: imageUri,
        name: "leaf.jpg",
        type: "image/jpeg",
      } as any);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const confidencePercent = result?.confidence
    ? (result.confidence * 100).toFixed(1)
    : "0.0";

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={C.spice} />
        <Text style={styles.loaderText}>Analyzing cinnamon leaf...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={C.spice} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Detection Result</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="close" size={22} color={C.spice} />
          </TouchableOpacity>
        </View>

        {/* Image */}
        <View style={styles.imageCard}>
          <Image
            source={
              result?.image_result
                ? { uri: `${SERVER}${result.image_result}` }
                : imageUri
                  ? { uri: imageUri }
                  : undefined
            }
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Result Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Detected Disease</Text>
          <Text style={styles.disease}>{result?.disease || "Unknown"}</Text>

          {/* Severity */}
          <View style={styles.row}>
            <Ionicons name="warning-outline" size={18} color="#f39c12" />
            <Text style={styles.rowText}>Severity: {result?.severity}</Text>
          </View>

          {/* Confidence */}
          <View style={styles.row}>
            <Ionicons name="analytics-outline" size={18} color={C.spice} />
            <Text style={styles.rowText}>Confidence: {confidencePercent}%</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Number(confidencePercent)}%` },
              ]}
            />
          </View>
        </View>

        {/* Action Button */}
        {result?.disease !== "Healthy" ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Prevention', {
                  disease: result?.disease,
                  treatment: result?.treatment,
                  prevention: result?.prevention,
                })
            }
          >
            <Ionicons name="medkit-outline" size={20} color={C.surface} />
            <Text style={styles.buttonText}>View Prevention & Treatment</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.healthyCard}>
            <Ionicons name="checkmark-circle" size={24} color={C.spice} />
            <Text style={styles.healthyText}>
              This cinnamon leaf appears healthy. No treatment is required.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bgMid,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loaderText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: C.spice,
  },

  imageCard: {
    backgroundColor: C.surface,
    borderRadius: 20,
    padding: 10,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 230,
    borderRadius: 16,
  },

  card: {
    marginTop: 20,
    backgroundColor: C.surface,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },

  label: {
    fontSize: 13,
    color: "#777",
  },

  disease: {
    fontSize: 22,
    fontWeight: "bold",
    color: C.spice,
    marginVertical: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  rowText: {
    marginLeft: 6,
    fontSize: 14,
  },

  progressBar: {
    marginTop: 12,
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: C.spice,
  },

  button: {
    marginTop: 20,
    backgroundColor: C.spice,
    paddingVertical: 15,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  healthyCard: {
    marginTop: 20,
    backgroundColor: C.honeyLight,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  healthyText: {
    flex: 1,
    color: C.spice,
    fontSize: 14,
    fontWeight: "700",
  },

  buttonText: {
    color: C.surface,
    fontWeight: "bold",
  },
});
