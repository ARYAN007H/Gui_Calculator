
import React from 'react';

export const PI = Math.PI;
export const E = Math.E;

export const BackspaceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0L12 14.25m2.25-2.25L14.25 12M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75L12 12m0 0L14.25 14.25m-2.25-2.25L9.75 14.25" />
  </svg>
);

export const PlusMinusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0V4.5m0 15-3.75-3.75M12 19.5l3.75-3.75M4.5 12h15" />
    </svg>
);

export const RadianDegIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 .001L12 15m0 0l-2.25 1.313m2.25-1.313l2.25 1.313" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75h.008v.008H12V6.75zm3.75 0h.008v.008H15.75V6.75zm-7.5 0h.008v.008H8.25V6.75zM12 17.25h.008v.008H12v-.008zm3.75 0h.008v.008H15.75v-.008zm-7.5 0h.008v.008H8.25v-.008z" />
  </svg>
);

export const SwapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18M16.5 3L21 7.5m0 0L16.5 12M21 7.5H3" />
  </svg>
);

export const UNIT_CATEGORIES_DATA: import('./types').UnitCategory[] = [
  {
    id: 'length', name: 'Length', baseUnitId: 'meter',
    units: [
      { id: 'meter', name: 'Meter (m)', factor: 1, baseUnit: true },
      { id: 'kilometer', name: 'Kilometer (km)', factor: 1000 },
      { id: 'centimeter', name: 'Centimeter (cm)', factor: 0.01 },
      { id: 'millimeter', name: 'Millimeter (mm)', factor: 0.001 },
      { id: 'mile', name: 'Mile (mi)', factor: 1609.34 },
      { id: 'yard', name: 'Yard (yd)', factor: 0.9144 },
      { id: 'foot', name: 'Foot (ft)', factor: 0.3048 },
      { id: 'inch', name: 'Inch (in)', factor: 0.0254 },
    ],
  },
  {
    id: 'mass', name: 'Mass', baseUnitId: 'kilogram',
    units: [
      { id: 'kilogram', name: 'Kilogram (kg)', factor: 1, baseUnit: true },
      { id: 'gram', name: 'Gram (g)', factor: 0.001 },
      { id: 'milligram', name: 'Milligram (mg)', factor: 0.000001 },
      { id: 'pound', name: 'Pound (lb)', factor: 0.453592 },
      { id: 'ounce', name: 'Ounce (oz)', factor: 0.0283495 },
    ],
  },
  {
    id: 'temperature', name: 'Temperature', baseUnitId: 'celsius',
    units: [
      // Note: Temperature conversions are not simple factors, handled specially in logic
      { id: 'celsius', name: 'Celsius (°C)', factor: 1, baseUnit: true, offset: 0 },
      { id: 'fahrenheit', name: 'Fahrenheit (°F)', factor: 1.8, offset: 32 }, // C = (F-32)/1.8 => F = C*1.8+32
      { id: 'kelvin', name: 'Kelvin (K)', factor: 1, offset: 273.15 }, // C = K-273.15 => K = C+273.15
    ],
  },
  {
    id: 'volume', name: 'Volume', baseUnitId: 'liter',
    units: [
      { id: 'liter', name: 'Liter (L)', factor: 1, baseUnit: true },
      { id: 'milliliter', name: 'Milliliter (mL)', factor: 0.001 },
      { id: 'cubicmeter', name: 'Cubic Meter (m³)', factor: 1000 },
      { id: 'gallon', name: 'Gallon (US gal)', factor: 3.78541 },
      { id: 'quart', name: 'Quart (US qt)', factor: 0.946353 },
    ],
  },
];

export const INITIAL_CURRENCIES: import('./types').Currency[] = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
    { code: "BRL", name: "Brazilian Real" },
];
