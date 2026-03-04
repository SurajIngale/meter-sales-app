export interface MeterReading {
  id: string;
  meterId: string;
  previousReading: number;
  currentReading: number;
  saleKg: number;
  date: string;
  time: string;
}

export const initialReadings: MeterReading[] = [
  {
    id: 'r1',
    meterId: 'm1',
    previousReading: 10000,
    currentReading: 10250,
    saleKg: 250,
    date: '2026-03-04',
    time: '08:30',
  },
  {
    id: 'r2',
    meterId: 'm1',
    previousReading: 10250,
    currentReading: 10480,
    saleKg: 230,
    date: '2026-03-04',
    time: '14:20',
  },
  {
    id: 'r3',
    meterId: 'm2',
    previousReading: 8500,
    currentReading: 8720,
    saleKg: 220,
    date: '2026-03-04',
    time: '09:15',
  },
  {
    id: 'r4',
    meterId: 'm3',
    previousReading: 12000,
    currentReading: 12350,
    saleKg: 350,
    date: '2026-03-04',
    time: '10:00',
  },
  {
    id: 'r5',
    meterId: 'm4',
    previousReading: 9000,
    currentReading: 9180,
    saleKg: 180,
    date: '2026-03-04',
    time: '11:30',
  },
  {
    id: 'r6',
    meterId: 'm2',
    previousReading: 8720,
    currentReading: 8920,
    saleKg: 200,
    date: '2026-03-04',
    time: '15:45',
  },
];
