import React from 'react';
import { useUnitConverter } from '../../hooks/useUnitConverter';
import { SwapIcon } from '../../constants';
import { AppMode } from '../../types';
import ModeButton from '../ModeButton';

interface UnitConverterProps {
  activeMode: AppMode;
  setActiveMode: (mode: AppMode) => void;
}

const UnitConverter: React.FC<UnitConverterProps> = (props) => {
  const {
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
  } = useUnitConverter();

  const commonSelectClasses = "w-full p-3 bg-neutral-800 border border-neutral-700 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-100 text-sm sm:text-base";
  const commonInputClasses = "w-full p-3 bg-neutral-800 border border-neutral-700 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-100 text-lg sm:text-xl";

  return (
    <div className="p-2 sm:p-4 space-y-4 sm:space-y-6 text-gray-200">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
        <select
          id="category"
          value={selectedCategory.id}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className={commonSelectClasses}
          aria-label="Select unit category"
        >
          {availableCategories.map(cat => (
            <option key={cat.id} value={cat.id} className="bg-neutral-800 text-gray-100">{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 sm:gap-4 items-end">
        <div className="sm:col-span-5">
          <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-300 mb-1">From</label>
          <select
            id="fromUnit"
            value={fromUnit.id}
            onChange={(e) => handleFromUnitChange(e.target.value)}
            className={commonSelectClasses}
            aria-label="Select unit to convert from"
          >
            {unitsForSelectedCategory.map(unit => (
              <option key={unit.id} value={unit.id} className="bg-neutral-800 text-gray-100">{unit.name}</option>
            ))}
          </select>
          <input
            type="text" // Changed to text to allow more flexible input, validation in hook
            inputMode="decimal" // Hint for mobile keyboards
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className={`${commonInputClasses} mt-2`}
            placeholder="Enter value"
            aria-label="Input value to convert"
          />
        </div>

        <div className="sm:col-span-1 flex justify-center items-center pt-5 sm:pt-0">
          <button 
            onClick={swapUnits}
            title="Swap units"
            aria-label="Swap units"
            className="p-3 bg-orange-600 hover:bg-orange-500 rounded-full text-white transition-transform duration-150 active:scale-90"
          >
            <SwapIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="sm:col-span-5">
          <label htmlFor="toUnit" className="block text-sm font-medium text-gray-300 mb-1">To</label>
          <select
            id="toUnit"
            value={toUnit.id}
            onChange={(e) => handleToUnitChange(e.target.value)}
            className={commonSelectClasses}
            aria-label="Select unit to convert to"
          >
            {unitsForSelectedCategory.map(unit => (
              <option key={unit.id} value={unit.id} className="bg-neutral-800 text-gray-100">{unit.name}</option>
            ))}
          </select>
           <input
            type="text"
            value={outputValue}
            readOnly
            className={`${commonInputClasses} mt-2 bg-neutral-850 cursor-not-allowed opacity-80`}
            placeholder="Result"
            aria-label="Conversion result"
          />
        </div>
      </div>
      
      <nav className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 sm:py-4 px-1 border-t border-neutral-700/50 mt-4">
        {(Object.values(AppMode) as AppMode[]).map((mode) => (
          <ModeButton
            key={mode}
            label={mode}
            isActive={props.activeMode === mode}
            onClick={() => props.setActiveMode(mode)}
          />
        ))}
      </nav>
    </div>
  );
};

export default UnitConverter;