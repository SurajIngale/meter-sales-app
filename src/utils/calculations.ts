import { MeterReading } from '../data/mockReadings';
import { ratePerKg } from '../data/mockMeters';

export const calculateSaleKg = (currentReading: number, previousReading: number): number => {
  return currentReading - previousReading;
};

export const calculateAmount = (saleKg: number): number => {
  return saleKg * ratePerKg;
};

export const getTodayReadings = (readings: MeterReading[]): MeterReading[] => {
  const today = new Date().toISOString().split('T')[0];
  return readings.filter((reading) => reading.date === today);
};

export const getTotalSaleKg = (readings: MeterReading[]): number => {
  return readings.reduce((sum, reading) => sum + reading.saleKg, 0);
};

export const getTotalAmount = (readings: MeterReading[]): number => {
  const totalKg = getTotalSaleKg(readings);
  return calculateAmount(totalKg);
};

export const getUniqueMeterCount = (readings: MeterReading[]): number => {
  const uniqueMeters = new Set(readings.map((reading) => reading.meterId));
  return uniqueMeters.size;
};

export const getMeterReadings = (readings: MeterReading[], meterId: string): MeterReading[] => {
  return readings.filter((reading) => reading.meterId === meterId).sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`).getTime();
    const dateTimeB = new Date(`${b.date} ${b.time}`).getTime();
    return dateTimeB - dateTimeA;
  });
};

export const getLastReading = (readings: MeterReading[], meterId: string): MeterReading | null => {
  const meterReadings = getMeterReadings(readings, meterId);
  return meterReadings.length > 0 ? meterReadings[0] : null;
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
