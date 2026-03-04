import React, { createContext, useState, ReactNode } from 'react';
import { MeterReading, initialReadings } from '../data/mockReadings';

interface AppContextType {
  readings: MeterReading[];
  addReading: (reading: MeterReading) => void;
}

export const AppContext = createContext<AppContextType>({
  readings: [],
  addReading: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [readings, setReadings] = useState<MeterReading[]>(initialReadings);

  const addReading = (reading: MeterReading) => {
    setReadings((prevReadings) => [reading, ...prevReadings]);
  };

  return (
    <AppContext.Provider value={{ readings, addReading }}>
      {children}
    </AppContext.Provider>
  );
}
