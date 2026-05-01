import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../index';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type NavKey = 'home' | 'predict' | 'history' | 'grade';

type Props = {
  active: NavKey;
};

export default function AppBottomNav({ active }: Props) {
  const navigation = useNavigation<NavigationProp>();

  const navItems: Array<{
    key: NavKey;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    route: Extract<keyof RootStackParamList, 'CinnOracleMain' | 'NewAnalysis' | 'HistoricalTrends' | 'GradeGuide'>;
  }> = [
    { key: 'home', label: 'Home', icon: 'home', route: 'CinnOracleMain' },
    { key: 'predict', label: 'Predict', icon: 'grass', route: 'NewAnalysis' },
    { key: 'history', label: 'History', icon: 'history', route: 'HistoricalTrends' },
    { key: 'grade', label: 'Grade Guide', icon: 'menu-book', route: 'GradeGuide' },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = item.key === active;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => navigation.navigate(item.route)}
            activeOpacity={0.85}
          >
            <MaterialIcons
              name={item.icon}
              size={24}
              color={isActive ? '#D47024' : '#9CA3AF'}
            />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 8,
    gap: 2,
  },
  navItemActive: {
    // Clean minimalist style: no background
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  navLabelActive: {
    color: '#D47024',
  },
});
