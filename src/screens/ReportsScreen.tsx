import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { mockMeters } from '../data/mockMeters';
import {
  getTodayReadings,
  getTotalSaleKg,
  getTotalAmount,
  getMeterReadings,
  formatCurrency,
  formatDate,
} from '../utils/calculations';
import { Card } from '../components/Card';

export function ReportsScreen() {
  const { readings } = useContext(AppContext);
  const todayReadings = getTodayReadings(readings);
  const todayTotalKg = getTotalSaleKg(todayReadings);
  const todayTotalAmount = getTotalAmount(todayReadings);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Reports</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Daily Sales Summary</Text>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>
                {formatDate(new Date().toISOString().split('T')[0])}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Sale:</Text>
              <Text style={styles.summaryValue}>{todayTotalKg.toFixed(2)} Kg</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount:</Text>
              <Text style={[styles.summaryValue, styles.amountText]}>
                {formatCurrency(todayTotalAmount)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Readings:</Text>
              <Text style={styles.summaryValue}>{todayReadings.length}</Text>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Meter-wise Sales</Text>
          {mockMeters.map((meter) => {
            const meterTodayReadings = todayReadings.filter(
              (r) => r.meterId === meter.id
            );
            const meterTotalKg = getTotalSaleKg(meterTodayReadings);
            const meterTotalAmount = getTotalAmount(meterTodayReadings);
            const allMeterReadings = getMeterReadings(readings, meter.id);
            const lastReading = allMeterReadings.length > 0 ? allMeterReadings[0] : null;

            return (
              <Card key={meter.id} style={styles.meterCard}>
                <Text style={styles.meterName}>{meter.name}</Text>
                <View style={styles.meterDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Today's Sale:</Text>
                    <Text style={styles.detailValue}>{meterTotalKg.toFixed(2)} Kg</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Amount:</Text>
                    <Text style={styles.detailValue}>
                      {formatCurrency(meterTotalAmount)}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Readings:</Text>
                    <Text style={styles.detailValue}>{meterTodayReadings.length}</Text>
                  </View>
                  {lastReading && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Last Reading:</Text>
                      <Text style={styles.detailValue}>
                        {lastReading.currentReading.toFixed(2)} Kg
                      </Text>
                    </View>
                  )}
                </View>
              </Card>
            );
          })}

          <Text style={styles.sectionTitle}>All-Time Statistics</Text>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Readings:</Text>
              <Text style={styles.summaryValue}>{readings.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Sale:</Text>
              <Text style={styles.summaryValue}>
                {getTotalSaleKg(readings).toFixed(2)} Kg
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount:</Text>
              <Text style={[styles.summaryValue, styles.amountText]}>
                {formatCurrency(getTotalAmount(readings))}
              </Text>
            </View>
          </Card>
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
    padding: 20,
    backgroundColor: '#2563eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 8,
    marginBottom: 12,
  },
  summaryCard: {
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  amountText: {
    color: '#047857',
    fontSize: 16,
  },
  meterCard: {
    marginBottom: 12,
  },
  meterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 12,
  },
  meterDetails: {},
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});
