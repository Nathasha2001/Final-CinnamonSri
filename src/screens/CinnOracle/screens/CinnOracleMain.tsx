import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../index';
import { checkHealth } from '../src/api/client';
import AppBottomNav from '../components/AppBottomNav';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CinnOracleMain() {
  const navigation = useNavigation<NavigationProp>();
  const [backendHealthy, setBackendHealthy] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Check backend health
      const isHealthy = await checkHealth();
      setBackendHealthy(isHealthy);
      if (!isHealthy) {
        console.warn('Backend API is not responding');
      }
    };

    init();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={26} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>CinnOracle</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Check New Batch Button */}
      <TouchableOpacity
        style={styles.predictButton}
        onPress={() => navigation.navigate('NewAnalysis')}
        activeOpacity={0.85}
      >
        <View style={styles.predictTextWrap}>
          <Text style={styles.predictTitle}>Check New Batch</Text>
          <Text style={styles.predictSubtitle}>Predict Quality & Get Price</Text>
        </View>
        <View style={styles.predictIconWrap}>
            <MaterialIcons name="description" size={24} color="#D47024" />
        </View>
      </TouchableOpacity>

        {/* History */}
        <TouchableOpacity 
          style={styles.history} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('HistoricalTrends')}
        >
          <Text style={styles.historyText}>History</Text>
          <View style={styles.historyIconWrap}>
            <Ionicons name="refresh" size={18} color="#D47024" />
          </View>
        </TouchableOpacity>

        {/* Cinnamon Grade Guide Card */}
        <TouchableOpacity 
          style={styles.history} 
          activeOpacity={0.8}
        onPress={() => navigation.navigate('GradeGuide')}
        >
          <Text style={styles.historyText}>Cinnamon Grade Guide</Text>
          <View style={styles.historyIconWrap}>
            <MaterialIcons name="map" size={18} color="#D47024" />
          </View>
        </TouchableOpacity>

        {/* Quality Levels */}
        <Text style={styles.sectionTitle}>Cinnamon Grades</Text>

        <View style={styles.qualityContainer}>
          <View style={styles.qualityRow}>
            <View style={styles.qualityInfo}>
              <Text style={styles.qualityTitle}>High Quality</Text>
              <Text style={styles.desc}>Alba, C5 Special, C5</Text>
            </View>
          </View>

          <View style={styles.qualityRow}>
            <View style={styles.qualityInfo}>
              <Text style={styles.qualityTitle}>Medium Quality</Text>
              <Text style={styles.desc}>C4, H1</Text>
            </View>
          </View>

          <View style={[styles.qualityRow, styles.qualityRowLast]}>
            <View style={styles.qualityInfo}>
              <Text style={styles.qualityTitle}>Low Quality</Text>
              <Text style={styles.desc}>H2, Heen, Gorosu</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <AppBottomNav active="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40, // Move the screen down
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#D47024',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 24,
  },
  priceCard: {
    backgroundColor: '#D47024',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  priceTitle: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  price: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  priceChange: {
    alignSelf: 'flex-start',
    backgroundColor: '#D47024',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  priceChangeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  predictButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F4EAE4',
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  predictTextWrap: {
    flex: 1,
  },
  predictTitle: {
    color: '#2B1D16',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  predictSubtitle: {
    color: '#8D7B70',
    fontSize: 13,
    opacity: 0.9,
  },
  predictIconWrap: {
    backgroundColor: '#FFFFFF',
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F4EAE4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  historyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  historyIconWrap: {
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  qualityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F4EAE4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  qualityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  qualityRowLast: {
    borderBottomWidth: 0,
  },
  qualityInfo: {
    marginLeft: 12,
    flex: 1,
  },
  qualityTitle: {
    color: '#2c3e50',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  badgePremium: {
    backgroundColor: '#FFF3E0',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  badgeTextPremium: {
    color: '#E65100',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  badgeA: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  badgeTextA: {
    color: '#D47024',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  badgeB: {
    backgroundColor: '#FFF9C4',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  badgeTextB: {
    color: '#F57C00',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    marginTop: 2,
  },
  navItemActive: {
    backgroundColor: '#D47024',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navLabelActive: {
    color: '#FFFFFF',
  },
});
