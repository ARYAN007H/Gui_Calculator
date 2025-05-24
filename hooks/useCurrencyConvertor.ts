
import { useState, useEffect, useCallback } from 'react';
import { ExchangeRates, Currency } from '../types';
import { fetchExchangeRates } from '../services/currencyService';
import { askGeminiForCurrencyConversion } from '../services/geminiService';
import { INITIAL_CURRENCIES } from '../constants';


export const useCurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [inputValue, setInputValue] = useState<string>('1');
  const [outputValue, setOutputValue] = useState<string>('');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [aiQuery, setAiQuery] = useState<string>('');
  const [aiResult, setAiResult] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { rates: fetchedRates, currencies: fetchedCurrencies } = await fetchExchangeRates(fromCurrency);
        setRates(fetchedRates);
        setAvailableCurrencies(fetchedCurrencies);
        // Check if current toCurrency is still valid, otherwise pick first available
        if (!fetchedCurrencies.find(c => c.code === toCurrency) && fetchedCurrencies.length > 1) {
            setToCurrency(fetchedCurrencies.find(c => c.code !== fromCurrency)?.code || fetchedCurrencies[0].code);
        }

      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load exchange rates.');
        setRates({[fromCurrency]: 1}); // Minimal rates for functionality
      } finally {
        setIsLoading(false);
      }
    };
    loadRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency]); // Reload rates when base currency (fromCurrency) changes

  const convertCurrency = useCallback(() => {
    if (!rates || !inputValue) {
      setOutputValue('');
      return;
    }
    const amount = parseFloat(inputValue);
    if (isNaN(amount)) {
      setOutputValue('');
      return;
    }

    const rateFrom = rates[fromCurrency] || 1; // Should always be 1 if fromCurrency is the base
    const rateTo = rates[toCurrency];

    if (rateTo === undefined) {
      // This might happen if API data is incomplete or toCurrency is not in current base rates
      // Attempt to use USD as an intermediate if fromCurrency is not USD
      if (fromCurrency !== 'USD' && rates['USD'] && rates[toCurrency]) {
        // Convert amount to USD first, then to target currency
        // This assumes rates are relative to the 'fromCurrency' fetched by API
        // If API always returns rates relative to `fromCurrency`
        const valueInBase = amount; // amount is already in 'fromCurrency'
        const valueInTarget = valueInBase * rateTo;
        setOutputValue(valueInTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

      } else {
         setError(`Rate for ${toCurrency} not available with base ${fromCurrency}. Try another pair or use AI.`);
         setOutputValue('');
      }
      return;
    }
    
    // Standard conversion: (amount / rateFrom) * rateTo, but since API gives rates relative to `fromCurrency`, it's simpler:
    const convertedAmount = amount * rateTo;
    setOutputValue(convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    setError(null); // Clear previous errors on successful conversion
  }, [rates, fromCurrency, toCurrency, inputValue]);

  useEffect(() => {
    convertCurrency();
  }, [inputValue, fromCurrency, toCurrency, rates, convertCurrency]);

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    // Input value remains, output will recalculate
  };

  const handleAiQueryChange = (query: string) => {
    setAiQuery(query);
  };

  const submitAiQuery = async () => {
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    setAiResult('');
    try {
      const result = await askGeminiForCurrencyConversion(aiQuery);
      setAiResult(result);
    } catch (e) {
      setAiResult(e instanceof Error ? e.message : 'AI query failed.');
    } finally {
      setIsAiLoading(false);
    }
  };


  return {
    fromCurrency, setFromCurrency,
    toCurrency, setToCurrency,
    inputValue, setInputValue,
    outputValue,
    rates,
    availableCurrencies,
    isLoading,
    error,
    convertCurrency, // Expose for manual trigger if needed
    handleSwapCurrencies,
    aiQuery, handleAiQueryChange,
    aiResult, submitAiQuery,
    isAiLoading,
  };
};
