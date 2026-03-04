import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { mockMeters } from '../data/mockMeters';
import { getMeterReadings } from '../utils/calculations';
import { MeterItem } from '../components/MeterItem';
import { MeterReading } from '../data/mockReadings';

export function MeterHistoryScreen() {
  const { readings } = useContext(AppContext);
  const [selectedMeter, setSelectedMeter] = useState('m1');

  const meterReadings = getMeterReadings(readings, selectedMeter);
  const selectedMeterName = mockMeters.find(m => m.id === selectedMeter)?.name || 'Meter';

  const renderItem = ({ item }: { item: MeterReading }) => (
    <MeterItem reading={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meter History</Text>
      </View>

      <View style={styles.meterSelector}>
        <Text style={styles.selectorLabel}>Select Meter:</Text>
        <View style={styles.meterButtons}>
          {mockMeters.map((meter) => (
            <TouchableOpacity
              key={meter.id}
              style={[
                styles.meterButton,
                selectedMeter === meter.id && styles.meterButtonActive,
              ]}
              onPress={() => setSelectedMeter(meter.id)}>
              <Text
                style={[
                  styles.meterButtonText,
                  selectedMeter === meter.id && styles.meterButtonTextActive,
                ]}>
                {meter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Showing history for {selectedMeterName}
        </Text>
        {meterReadings.length > 0 ? (
          <FlatList
            data={meterReadings}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No readings found for this meter</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  meterSelector: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  meterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  meterButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  meterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  meterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  meterButtonTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
