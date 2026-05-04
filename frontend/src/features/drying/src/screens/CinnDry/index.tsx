import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CinnDryTabParamList } from "../../types/index";
import { C, FONTS } from "../../components/theme";
import Dashboard from "./Dashboard";
import Controls  from "./Controls";
import Gallery   from "./Gallery";
import History   from "./History";
import Insights  from "./Insights";

const Tab = createBottomTabNavigator<CinnDryTabParamList>();

type TabName = keyof CinnDryTabParamList;

const TAB_META: Record<TabName, { icon: any; label: string }> = {
  Dashboard: { icon: "home-outline", label: "Home" },
  Controls:  { icon: "tune", label: "Controls" },
  Gallery:   { icon: "camera-outline", label: "Gallery" },
  History:   { icon: "format-list-bulleted", label: "Logs" },
  Insights:  { icon: "chart-box-outline", label: "Insights" },
};

export default function CinnDryNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons 
            name={TAB_META[route.name as TabName].icon as any} 
            size={size} 
            color={color} 
          />
        ),
        tabBarActiveTintColor: C.spice,
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: C.surface,
          borderTopColor:  C.border,
          borderTopWidth:  1,
          height: 60,
        },
        headerStyle: {
          backgroundColor:   C.surface,
          borderBottomColor: C.border,
          borderBottomWidth: 1,
          elevation: 0, shadowOpacity: 0,
        },
        headerTitle: () => (
          <View style={styles.headerTitle}>
            <Text style={styles.headerEmoji}>🌿</Text>
            <View>
              <Text style={styles.headerMain}>CinnDry</Text>
              <Text style={styles.headerSub}>Bark Drying Monitor</Text>
            </View>
          </View>
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Controls"  component={Controls}  />
      <Tab.Screen name="Gallery"   component={Gallery}   />
      <Tab.Screen name="History"   component={History}   />
      <Tab.Screen name="Insights"  component={Insights}  />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: { alignItems: "center", justifyContent: "center" },
  iconActive:  {},
  emoji:       { fontSize: 18 },
  dot:         { display: "none" }, 
  label:       { fontSize: 11, fontWeight: "600" },
  headerTitle: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerEmoji: { fontSize: 24 },
  headerMain:  { color: C.text, fontSize: 16, fontFamily: FONTS.display, fontWeight: "700" },
  headerSub:   { color: C.muted, fontSize: 9, fontFamily: FONTS.mono, letterSpacing: 1 },
});
