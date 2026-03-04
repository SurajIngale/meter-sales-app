export interface Meter {
  id: string;
  name: string;
}

export const mockMeters: Meter[] = [
  { id: 'm1', name: 'Meter 1' },
  { id: 'm2', name: 'Meter 2' },
  { id: 'm3', name: 'Meter 3' },
  { id: 'm4', name: 'Meter 4' },
];

export const ratePerKg = 2.2;
