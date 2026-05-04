import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  CinnDry: undefined;
  CinnOracle: undefined;
  CinnHarvest: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const MODULES = [
  {
    id: 'CinnDry',
    title: 'CinnamonDry',
    description: 'Drying parameters & monitoring',
    icon: 'weather-sunny',
  },
  {
    id: 'CinnOracle',
    title: 'CinnOracle',
    description: 'AI-driven yield predictions',
    icon: 'creation',
  },
  {
    id: 'CinnHarvest',
    title: 'CinnHarvest',
    description: 'Harvesting optimization & timing',
    icon: 'leaf',
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
              <View style={styles.card}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name={mod.icon as any} size={36} color="#D47024" />
                </View>
                <Text style={styles.cardTitle}>{mod.title}</Text>
                <Text style={styles.cardDesc}>{mod.description}</Text>
              </View>
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
    backgroundColor: '#FFFFFF', // Clean White Home
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 100, // Moved down to center better
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
    color: '#D47024', // Caramel Title
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8D7B70', // Coffee Muted Subtitle
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
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    height: 170, // Fixed rigid height
    alignItems: 'center', // Centered icons and text
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // White cards
    borderWidth: 1,
    borderColor: '#F4EAE4', // Soft beige border
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FDF5EC', // Very soft caramel background
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2B1D16', // Coffee Dark
    marginBottom: 6,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 13,
    color: '#8D7B70', // Coffee Muted
    lineHeight: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
