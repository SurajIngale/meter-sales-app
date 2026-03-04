import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AppContext } from '../context/AppContext';
import { mockMeters } from '../data/mockMeters';
import { getLastReading, calculateSaleKg, calculateAmount, formatCurrency } from '../utils/calculations';
import { Card } from '../components/Card';

type AddReadingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddReading'>;
};

export function AddReadingScreen({ navigation }: AddReadingScreenProps) {
  const { readings, addReading } = useContext(AppContext);
  const [selectedMeter, setSelectedMeter] = useState('');
  const [currentReading, setCurrentReading] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const [showMeterPicker, setShowMeterPicker] = useState(false);

  const lastReading = selectedMeter ? getLastReading(readings, selectedMeter) : null;
  const previousReading = lastReading ? lastReading.currentReading : 0;

  const handleSubmit = () => {
    if (!selectedMeter) {
      Alert.alert('Error', 'Please select a meter');
      return;
    }

    if (!currentReading) {
      Alert.alert('Error', 'Please enter current reading');
      return;
    }

    const current = parseFloat(currentReading);
    if (isNaN(current)) {
      Alert.alert('Error', 'Please enter a valid number');
      return;
    }

    if (current < previousReading) {
      Alert.alert('Error', 'Current reading must be greater than or equal to previous reading');
      return;
    }

    const saleKg = calculateSaleKg(current, previousReading);
    const amount = calculateAmount(saleKg);

    Alert.alert(
      'Reading Added Successfully',
      `Sale: ${saleKg.toFixed(2)} Kg\nAmount: ${formatCurrency(amount)}`,
      [
        {
          text: 'OK',
          onPress: () => {
            addReading({
              id: `r${Date.now()}`,
              meterId: selectedMeter,
              previousReading,
              currentReading: current,
              saleKg,
              date,
              time,
            });
            setSelectedMeter('');
            setCurrentReading('');
            setDate(new Date().toISOString().split('T')[0]);
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
            navigation.goBack();
          },
        },
      ]
    );
  };

  const selectedMeterName = mockMeters.find(m => m.id === selectedMeter)?.name || 'Select Meter';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Add New Reading</Text>

          <Card style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Meter</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowMeterPicker(!showMeterPicker)}>
                <Text style={styles.pickerButtonText}>{selectedMeterName}</Text>
              </TouchableOpacity>

              {showMeterPicker && (
                <View style={styles.pickerContainer}>
                  {mockMeters.map((meter) => (
                    <TouchableOpacity
                      key={meter.id}
                      style={styles.pickerItem}
                      onPress={() => {
                        setSelectedMeter(meter.id);
                        setShowMeterPicker(false);
                      }}>
                      <Text style={styles.pickerItemText}>{meter.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {selectedMeter && (
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Previous Reading:</Text>
                <Text style={styles.infoValue}>{previousReading.toFixed(2)} Kg</Text>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Reading (Kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter current reading"
                value={currentReading}
                onChangeText={setCurrentReading}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.input}
                value={time}
                onChangeText={setTime}
                placeholder="HH:MM"
              />
            </View>

            {selectedMeter && currentReading && parseFloat(currentReading) >= previousReading && (
              <View style={styles.calculationBox}>
                <Text style={styles.calculationLabel}>Calculated Sale:</Text>
                <Text style={styles.calculationValue}>
                  {calculateSaleKg(parseFloat(currentReading), previousReading).toFixed(2)} Kg
                </Text>
                <Text style={styles.calculationAmount}>
                  {formatCurrency(calculateAmount(calculateSaleKg(parseFloat(currentReading), previousReading)))}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Add Reading</Text>
            </TouchableOpacity>
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
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  formCard: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pickerButton: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  pickerContainer: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  pickerItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  infoBox: {
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  calculationBox: {
    backgroundColor: '#d1fae5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  calculationLabel: {
    fontSize: 14,
    color: '#065f46',
    fontWeight: '600',
    marginBottom: 8,
  },
  calculationValue: {
    fontSize: 24,
    color: '#047857',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calculationAmount: {
    fontSize: 18,
    color: '#047857',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
