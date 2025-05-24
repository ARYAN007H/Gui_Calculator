import React from 'react';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';
import { SwapIcon } from '../../constants';
import { AppMode } from '../../types';
import ModeButton from '../ModeButton';

interface CurrencyConverterProps {
  activeMode: AppMode;
  setActiveMode: (mode: AppMode) => void;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = (props) => {
  const {
    fromCurrency, setFromCurrency,
    toCurrency, setToCurrency,
    inputValue, setInputValue,
    outputValue,
    availableCurrencies,
    isLoading, error,
    handleSwapCurrencies,
    aiQuery, handleAiQueryChange,
    aiResult, submitAiQuery,
    isAiLoading,
  } = useCurrencyConverter();

  const commonSelectClasses = "w-full p-3 bg-neutral-800 border border-neutral-700 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-100 text-sm sm:text-base";
  const commonInputClasses = "w-full p-3 bg-neutral-800 border border-neutral-700 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-100 text-lg sm:text-xl";

  return (
    <div className="p-2 sm:p-4 space-y-4 sm:space-y-6 text-gray-200">
      {isLoading && <div role="status" aria-live="polite" className="text-center text-orange-400 animate-pulse">Loading exchange rates...</div>}
      {error && <div role="alert" className="text-center text-red-400 bg-red-900/60 p-2 rounded-md">{error}</div>}
      
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 sm:gap-4 items-end">
            <div className="sm:col-span-5">
              <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-300 mb-1">From Currency</label>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className={commonSelectClasses}
                aria-label="Select currency to convert from"
              >
                {availableCurrencies.map(curr => (
                  <option key={curr.code} value={curr.code} className="bg-neutral-800 text-gray-100">{curr.name} ({curr.code})</option>
                ))}
              </select>
              <input
                type="number"
                inputMode="decimal"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`${commonInputClasses} mt-2`}
                placeholder="Enter amount"
                aria-label="Amount to convert"
              />
            </div>

            <div className="sm:col-span-1 flex justify-center items-center pt-5 sm:pt-0">
              <button 
                onClick={handleSwapCurrencies}
                title="Swap currencies"
                aria-label="Swap currencies"
                className="p-3 bg-orange-600 hover:bg-orange-500 rounded-full text-white transition-transform duration-150 active:scale-90"
              >
                <SwapIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-300 mb-1">To Currency</label>
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className={commonSelectClasses}
                aria-label="Select currency to convert to"
              >
                {availableCurrencies.map(curr => (
                  <option key={curr.code} value={curr.code} className="bg-neutral-800 text-gray-100">{curr.name} ({curr.code})</option>
                ))}
              </select>
              <input
                type="text" 
                value={outputValue}
                readOnly
                className={`${commonInputClasses} mt-2 bg-neutral-850 cursor-not-allowed opacity-80`}
                placeholder="Converted amount"
                aria-label="Converted amount"
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

          <div className="border-t border-neutral-700 pt-4 mt-2"> {/* Reduced mt from mt-4 to mt-2 as nav adds some spacing */}
            <h3 className="text-lg font-semibold text-orange-400 mb-2">AI Assisted Conversion (Gemini)</h3>
            <p className="text-xs text-gray-400 mb-2">
              Type your conversion query, e.g., "Convert 100 USD to JPY". (Requires API_KEY)
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => handleAiQueryChange(e.target.value)}
                placeholder="Ask Gemini for conversion..."
                className={`${commonInputClasses} flex-grow`}
                disabled={isAiLoading}
                aria-label="AI conversion query input"
              />
              <button
                onClick={submitAiQuery}
                disabled={isAiLoading || !aiQuery.trim()}
                className="p-3 bg-orange-600 hover:bg-orange-500 rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Submit AI conversion query"
              >
                {isAiLoading ? 'Asking...' : 'Ask AI'}
              </button>
            </div>
            {aiResult && (
              <div className="mt-3 p-3 bg-neutral-800 rounded-md" role="status" aria-live="polite">
                <p className="text-sm text-gray-300">AI Response:</p>
                <p className="text-md text-orange-300 whitespace-pre-wrap">{aiResult}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencyConverter;