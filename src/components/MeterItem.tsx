import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MeterReading } from '../data/mockReadings';
import { formatDate } from '../utils/calculations';
import { Card } from './Card';

interface MeterItemProps {
  reading: MeterReading;
}

export function MeterItem({ reading }: MeterItemProps) {
  return (
    <Card style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{formatDate(reading.date)} {reading.time}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Previous Reading:</Text>
        <Text style={styles.value}>{reading.previousReading.toFixed(2)} Kg</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Current Reading:</Text>
        <Text style={styles.value}>{reading.currentReading.toFixed(2)} Kg</Text>
      </View>
      <View style={[styles.row, styles.saleRow]}>
        <Text style={styles.saleLabel}>Sale (Kg):</Text>
        <Text style={styles.saleValue}>{reading.saleKg.toFixed(2)} Kg</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  saleRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom: 0,
  },
  saleLabel: {
    fontSize: 15,
    color: '#2563eb',
    fontWeight: '600',
  },
  saleValue: {
    fontSize: 15,
    color: '#2563eb',
    fontWeight: 'bold',
  },
});
