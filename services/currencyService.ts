
import { ExchangeRates, Currency } from '../types';
import { INITIAL_CURRENCIES } from '../constants';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<{rates: ExchangeRates, currencies: Currency[]}> => {
  try {
    const response = await fetch(`${API_URL}${baseCurrency}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error_type || `Failed to fetch exchange rates: ${response.status}`);
    }
    const data = await response.json();
    
    const fetchedRates: ExchangeRates = data.rates;
    const currencyList: Currency[] = Object.keys(fetchedRates).map(code => {
        const found = INITIAL_CURRENCIES.find(c => c.code === code);
        return { code, name: found ? found.name : code };
    }).sort((a,b) => a.code.localeCompare(b.code));


    return { rates: fetchedRates, currencies: currencyList };
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    // Fallback to initial currencies if API fails, with USD base rate of 1
    const fallbackRates: ExchangeRates = { USD: 1 };
    INITIAL_CURRENCIES.forEach(c => {
        if (c.code !== 'USD') fallbackRates[c.code] = 0; // Indicate data is missing
    });
    return { rates: fallbackRates, currencies: INITIAL_CURRENCIES };
  }
};
