import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SummaryCard } from '../components/Card';
import { AppContext } from '../context/AppContext';
import {
  getTodayReadings,
  getTotalSaleKg,
  getTotalAmount,
  getUniqueMeterCount,
  formatCurrency,
} from '../utils/calculations';

type DashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { readings } = useContext(AppContext);
  const todayReadings = getTodayReadings(readings);
  const totalSaleKg = getTotalSaleKg(todayReadings);
  const totalAmount = getTotalAmount(todayReadings);
  const uniqueMeters = getUniqueMeterCount(todayReadings);
  const readingsCount = todayReadings.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Today's Summary</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</Text>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <SummaryCard
              title="Total Sale"
              value={`${totalSaleKg.toFixed(2)}`}
              subtitle="Kg"
            />
            <SummaryCard
              title="Total Amount"
              value={formatCurrency(totalAmount)}
            />
          </View>
          <View style={styles.summaryRow}>
            <SummaryCard
              title="Active Meters"
              value={uniqueMeters}
            />
            <SummaryCard
              title="Readings"
              value={readingsCount}
            />
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddReading')}>
            <Text style={styles.actionButtonText}>➕ Add Reading</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('MeterHistory')}>
            <Text style={styles.actionButtonText}>📊 Meter History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Reports')}>
            <Text style={styles.actionButtonText}>📈 Reports</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: '#2563eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#bfdbfe',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#dbeafe',
  },
  summaryContainer: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});
