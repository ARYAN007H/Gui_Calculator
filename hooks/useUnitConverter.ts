// Fix: Add React import
import React, { useState, useCallback, useMemo, useEffect } from 'react';
// Fix: Import UnitCategory and Unit from '../types' instead of '../constants'
import { UnitCategory, Unit } from '../types';
import { UNIT_CATEGORIES_DATA } from '../constants';

export const useUnitConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>(UNIT_CATEGORIES_DATA[0]);
  const [fromUnit, setFromUnit] = useState<Unit>(selectedCategory.units[0]);
  const [toUnit, setToUnit] = useState<Unit>(selectedCategory.units[1] || selectedCategory.units[0]);
  const [inputValue, setInputValue] = useState<string>('1');
  const [outputValue, setOutputValue] = useState<string>('');

  const availableCategories = UNIT_CATEGORIES_DATA;

  const unitsForSelectedCategory = useMemo(() => {
    return selectedCategory.units;
  }, [selectedCategory]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    const newCategory = availableCategories.find(cat => cat.id === categoryId);
    if (newCategory) {
      setSelectedCategory(newCategory);
      setFromUnit(newCategory.units[0]);
      setToUnit(newCategory.units[1] || newCategory.units[0]);
      setInputValue('1'); // Reset input value
    }
  }, [availableCategories]);

  const handleFromUnitChange = useCallback((unitId: string) => {
    const newUnit = unitsForSelectedCategory.find(u => u.id === unitId);
    if (newUnit) setFromUnit(newUnit);
  }, [unitsForSelectedCategory]);

  const handleToUnitChange = useCallback((unitId: string) => {
    const newUnit = unitsForSelectedCategory.find(u => u.id === unitId);
    if (newUnit) setToUnit(newUnit);
  }, [unitsForSelectedCategory]);

  const handleInputChange = useCallback((value: string) => {
    if (/^-?\d*\.?\d*$/.test(value) || value === '' || value === '-') { // Allow valid numbers, empty or just minus
        setInputValue(value);
    }
  }, []);

  const convertUnits = useCallback(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || !fromUnit || !toUnit || !selectedCategory) {
      setOutputValue('');
      return;
    }

    let valueInBaseUnit: number;

    // Special handling for temperature
    if (selectedCategory.id === 'temperature') {
      if (fromUnit.id === 'celsius') {
        valueInBaseUnit = value; // Base is Celsius
      } else if (fromUnit.id === 'fahrenheit') {
        valueInBaseUnit = (value - (fromUnit.offset || 0)) / (fromUnit.factor || 1);
      } else if (fromUnit.id === 'kelvin') {
        valueInBaseUnit = value - (fromUnit.offset || 0);
      } else {
        valueInBaseUnit = value; // Should not happen
      }

      let finalValue: number;
      if (toUnit.id === 'celsius') {
        finalValue = valueInBaseUnit;
      } else if (toUnit.id === 'fahrenheit') {
        finalValue = valueInBaseUnit * (toUnit.factor || 1) + (toUnit.offset || 0);
      } else if (toUnit.id === 'kelvin') {
        finalValue = valueInBaseUnit + (toUnit.offset || 0);
      } else {
        finalValue = valueInBaseUnit; // Should not happen
      }
      setOutputValue(finalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 5 }));

    } else { // Standard factor-based conversion
      const baseUnitDefinition = selectedCategory.units.find(u => u.id === selectedCategory.baseUnitId);
      if (!baseUnitDefinition) {
        setOutputValue('Error: Base unit not found');
        return;
      }
      
      // Convert input value to base unit of the category
      valueInBaseUnit = value * fromUnit.factor;
      
      // Convert from base unit to target unit
      const finalValue = valueInBaseUnit / toUnit.factor;
      setOutputValue(finalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 5 }));
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory]);
  
  const swapUnits = useCallback(() => {
    const currentFrom = fromUnit;
    const currentTo = toUnit;
    const currentInput = inputValue;
    const currentOutput = outputValue;

    setFromUnit(currentTo);
    setToUnit(currentFrom);
    setInputValue(currentOutput); // If output was calculated, use it as new input
    setOutputValue(currentInput); // Old input becomes new output (for display consistency)

  }, [fromUnit, toUnit, inputValue, outputValue]);

  // Use specific dependencies for re-calculation
  // Fix: Use useEffect instead of React.useEffect as React is now directly imported.
useEffect(() => {
    convertUnits();
  }, [inputValue, fromUnit, toUnit, selectedCategory, convertUnits]);


  return {
    selectedCategory,
    fromUnit,
    toUnit,
    inputValue,
    outputValue,
    availableCategories,
    unitsForSelectedCategory,
    handleCategoryChange,
    handleFromUnitChange,
    handleToUnitChange,
    handleInputChange,
    swapUnits,
  };
};