# Meter Sales Tracking System

A simple mobile application for tracking meter readings and sales at petrol/LPG pumps, built with React Native and Expo.

## Features

### 1. Login Screen
- Simple authentication with mock credentials
- Email: `admin@test.com`
- Password: `123456`

### 2. Dashboard
- Daily sales summary with:
  - Total Sale (Kg)
  - Total Amount (₹)
  - Active meters count
  - Number of readings today
- Quick action buttons for all features

### 3. Add Reading
- Select meter from dropdown
- Shows previous reading automatically
- Enter current reading with validation
- Real-time calculation of sale and amount
- Date and time tracking

### 4. Meter History
- View reading history for each meter
- Filter by meter selection
- Displays chronological list of readings
- Shows previous reading, current reading, and calculated sale

### 5. Reports
- Daily sales summary
- Meter-wise sales breakdown
- All-time statistics
- Amount calculations at ₹2.2 per Kg

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.tsx        # Card container component
│   └── MeterItem.tsx   # Meter reading list item
├── context/            # App state management
│   └── AppContext.tsx  # Global state for readings
├── data/               # Mock data
│   ├── mockMeters.ts   # Meter definitions
│   └── mockReadings.ts # Initial readings data
├── navigation/         # Navigation setup
│   └── AppNavigator.tsx # Stack navigation config
├── screens/            # App screens
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── AddReadingScreen.tsx
│   ├── MeterHistoryScreen.tsx
│   └── ReportsScreen.tsx
└── utils/              # Helper functions
    └── calculations.ts # Sale and amount calculations
```

## Mock Data

### Meters
- Meter 1
- Meter 2
- Meter 3
- Meter 4

### Rate Configuration
- Rate per Kg: ₹2.2

### Calculations
- Sale (Kg) = Current Reading - Previous Reading
- Amount = Sale × Rate per Kg

## Validation Rules

1. Current reading must be greater than or equal to previous reading
2. All fields are required when adding a reading
3. Only numeric values allowed for readings

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npx expo start
   ```

3. Login with demo credentials:
   - Email: admin@test.com
   - Password: 123456

## Design Features

- Clean, minimal interface
- Blue color theme (#2563eb)
- Card-based layout
- Responsive design
- User-friendly forms
- Real-time calculations

## Future Enhancements

This app is ready to be extended with:
- Backend API integration
- Real authentication system
- Database persistence
- Export reports to PDF/Excel
- Multi-user support
- Date range filtering
- Charts and analytics

## Technologies Used

- React Native
- Expo
- React Navigation
- TypeScript
- Context API for state management
