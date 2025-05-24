
export enum AppMode {
  STANDARD_CALCULATOR = 'Calculator',
  SCIENTIFIC_CALCULATOR = 'Scientific',
  UNIT_CONVERTER = 'Unit Converter',
  CURRENCY_CONVERTER = 'Currency Converter',
}

export interface Unit {
  id: string;
  name: string;
  factor: number; // Factor relative to a base unit within the category
  baseUnit?: boolean; // Is this the base unit for the category?
  offset?: number; // For units like Celsius/Fahrenheit
}

export interface UnitCategory {
  id: string;
  name: string;
  units: Unit[];
  baseUnitId: string; // ID of the base unit for this category
}

export interface ExchangeRates {
  [key: string]: number;
}

export interface Currency {
  code: string;
  name: string; // Optional: for display
}
