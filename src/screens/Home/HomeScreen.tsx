import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Sparkles, Sprout, ShieldCheck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  CinnDry: undefined;
  CinnOracle: undefined;
  CinnHarvest: undefined;
  CinnGuard: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const MODULES = [
  {
    id: 'CinnDry',
    title: 'CinnamonDry',
    description: 'Drying parameters & monitoring',
    icon: Sun,
    colors: ['#F59E0B', '#D97706'], // Warm Amber/Orange
  },
  {
    id: 'CinnOracle',
    title: 'CinnOracle',
    description: 'AI-driven yield predictions',
    icon: Sparkles,
    colors: ['#8B5CF6', '#6D28D9'], // Purple/Mystic
  },
  {
    id: 'CinnHarvest',
    title: 'CinnHarvest',
    description: 'Harvesting optimization & timing',
    icon: Sprout,
    colors: ['#10B981', '#059669'], // Green/Nature
  },
  {
    id: 'CinnGuard',
    title: 'CinnGuard',
    description: 'Disease detection & protection',
    icon: ShieldCheck,
    colors: ['#3B82F6', '#2563EB'], // Blue/Protection
  },
] as const;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleModulePress = (moduleId: keyof RootStackParamList) => {
    navigation.navigate(moduleId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {/* Try to load logo, or fail gracefully if not yet added by user */}
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>CinnamonSri</Text>
          <Text style={styles.subtitle}>Select a module to continue</Text>
        </View>

        {/* Modules Grid */}
        <View style={styles.gridContainer}>
          {MODULES.map((mod) => (
            <TouchableOpacity
              key={mod.id}
              style={styles.cardWrapper}
              activeOpacity={0.8}
              onPress={() => handleModulePress(mod.id)}
            >
              <LinearGradient
                colors={mod.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <View style={styles.iconContainer}>
                  <mod.icon size={32} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text style={styles.cardTitle}>{mod.title}</Text>
                <Text style={styles.cardDesc}>{mod.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Sleek light background
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  logoContainer: {
    width: 140,
    height: 140,
    marginBottom: 16,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
    fontWeight: '500',
  },
});
