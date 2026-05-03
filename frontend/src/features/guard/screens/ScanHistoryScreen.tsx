import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { C, FONTS, SHADOWS } from '../../drying/src/components/theme';

const API_BASE = "http://172.28.29.127:8000";
const API_URL = `${API_BASE}/scan-history`;

export default function ScanHistoryScreen() {
  const navigation = useNavigation<any>();

  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setHistory(data.history || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const SERVER = "http://172.28.29.127:8000";

  const onRefresh = () => {
    setRefreshing(true);
    loadHistory();
  };

  const formatConfidence = (confidence: number) => {
    if (!confidence) return "0.0%";
    return `${(confidence * 100).toFixed(1)}%`;
  };

  const getSeverityStyle = (severity: string) => {
    const value = severity?.toLowerCase();

    if (value === "high") return styles.highSeverity;
    if (value === "medium") return styles.mediumSeverity;
    if (value === "low") return styles.lowSeverity;

    return styles.noneSeverity;
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={C.spice} />
        <Text style={styles.loaderText}>Loading scan history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={C.spice} />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Scan History</Text>
          <Text style={styles.subtitle}>{history.length} saved results</Text>
        </View>

        <TouchableOpacity style={styles.iconButton} onPress={loadHistory}>
          <Ionicons name="refresh" size={22} color={C.spice} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item, index) => `${item.image_name || "scan"}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="leaf-outline" size={48} color={C.spice} />
            <Text style={styles.emptyTitle}>No scan history yet</Text>
            <Text style={styles.emptyText}>
              Scan or upload a cinnamon leaf image to see your previous results here.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                       uri: item.image_path
                       ? `${SERVER}${item.image_path}?t=${Date.now()}`
                       : undefined
                      }}
              style={styles.image}
            />

            <View style={styles.cardContent}>
              <View style={styles.cardTop}>
                <Text style={styles.disease} numberOfLines={1}>
                  {item.disease || "Unknown Disease"}
                </Text>

                <View style={[styles.severityBadge, getSeverityStyle(item.severity)]}>
                  <Text style={styles.severityText}>
                    {item.severity || "None"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="analytics-outline" size={16} color={C.spice} />
                <Text style={styles.infoText}>
                  Confidence: {formatConfidence(item.confidence)}
                </Text>
              </View>

              {item.delay_time && item.delay_time !== "N/A" && (
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={16} color={C.spiceDim} />
                  <Text style={styles.infoText}>Delay Time: {item.delay_time}</Text>
                </View>
              )}

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${item.confidence ? item.confidence * 100 : 0}%`,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        )}
      />
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

  loader: {
    flex: 1,
    backgroundColor: C.bgMid,
    justifyContent: "center",
    alignItems: "center",
  },

  loaderText: {
    marginTop: 10,
    fontSize: 14,
    color: C.muted,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: C.surface,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: C.spice,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "600",
    color: C.muted,
    textAlign: "center",
  },

  listContent: {
    paddingBottom: 30,
  },

  card: {
    flexDirection: "row",
    backgroundColor: C.surface,
    borderRadius: 24,
    padding: 12,
    marginBottom: 14,
    elevation: 4,
  },

  image: {
    width: 92,
    height: 92,
    borderRadius: 18,
    backgroundColor: "#E5E7EB",
  },

  cardContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },

  disease: {
    flex: 1,
    fontSize: 15,
    fontWeight: "900",
    color: C.spice,
  },

  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  severityText: {
    fontSize: 11,
    fontWeight: "900",
    color: C.surface,
  },

  highSeverity: {
    backgroundColor: "#C0392B",
  },

  mediumSeverity: {
    backgroundColor: "#F39C12",
  },

  lowSeverity: {
    backgroundColor: C.spice,
  },

  noneSeverity: {
    backgroundColor: C.muted,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },

  infoText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
  },

  progressBackground: {
    marginTop: 10,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: C.spice,
    borderRadius: 999,
  },

  emptyCard: {
    marginTop: 80,
    backgroundColor: C.surface,
    borderRadius: 28,
    padding: 30,
    alignItems: "center",
    elevation: 4,
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "900",
    color: C.spice,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: C.muted,
    textAlign: "center",
  },
});