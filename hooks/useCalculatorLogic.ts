
import { useState, useCallback } from 'react';
import { PI, E } from '../constants';

export type AngleMode = 'deg' | 'rad';

export interface CalculatorState {
  displayValue: string;
  previousValue: string | null;
  operator: string | null;
  expression: string;
  error: string | null;
  isRadians: boolean; // For scientific mode
}

const initialState: CalculatorState = {
  displayValue: '0',
  previousValue: null,
  operator: null,
  expression: '',
  error: null,
  isRadians: true,
};

// Helper for precision
const toPrecision = (num: number, precision: number = 10): number => {
  return parseFloat(num.toPrecision(precision));
};


export const useCalculatorLogic = (isScientific: boolean = false) => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const clearEntry = useCallback(() => {
    setState(prev => ({ ...prev, displayValue: '0', error: null }));
  }, []);

  const calculate = useCallback(() => {
    const prev = parseFloat(state.previousValue || '0');
    const current = parseFloat(state.displayValue);
    let result: number = current;

    if (state.operator && state.previousValue !== null) {
      switch (state.operator) {
        case '+': result = toPrecision(prev + current); break;
        case '-': result = toPrecision(prev - current); break;
        case '×': result = toPrecision(prev * current); break;
        case '÷':
          if (current === 0) {
            setState(prevSt => ({ ...prevSt, error: "Div by Zero", displayValue: 'Error' }));
            return;
          }
          result = toPrecision(prev / current);
          break;
        case '^': result = toPrecision(Math.pow(prev, current)); break;
        default: break;
      }
    }
    
    setState(prevSt => ({
      ...prevSt,
      displayValue: String(result),
      previousValue: null,
      operator: null,
      expression: prevSt.expression + prevSt.displayValue + " = " + String(result),
      error: null,
    }));
  }, [state.operator, state.previousValue, state.displayValue]);

  const handleNumber = useCallback((numStr: string) => {
    setState(prev => {
      if (prev.error) return { ...prev, displayValue: numStr, error: null, expression: numStr };
      const newDisplayValue = prev.displayValue === '0' || prev.operator && prev.previousValue === prev.displayValue ? numStr : prev.displayValue + numStr;
      return {
        ...prev,
        displayValue: newDisplayValue.slice(0,15), // Limit input length
        expression: prev.operator && prev.previousValue !== null ? prev.expression : newDisplayValue,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState(prev => {
      if (prev.error) return prev;
      if (prev.displayValue.includes('.')) return prev;
      return { ...prev, displayValue: prev.displayValue + '.', expression: prev.displayValue + '.' };
    });
  }, []);

  const handleOperator = useCallback((op: string) => {
    setState(prev => {
      if (prev.error) return prev;
      let newExpression = prev.expression;
      let newPreviousValue = prev.previousValue;

      if (prev.previousValue !== null && prev.operator && prev.displayValue !== prev.previousValue) {
        // A calculation is pending, perform it first
        const prevNum = parseFloat(prev.previousValue);
        const currentNum = parseFloat(prev.displayValue);
        let intermediateResult = currentNum;
        switch (prev.operator) {
          case '+': intermediateResult = toPrecision(prevNum + currentNum); break;
          case '-': intermediateResult = toPrecision(prevNum - currentNum); break;
          case '×': intermediateResult = toPrecision(prevNum * currentNum); break;
          case '÷': 
            if (currentNum === 0) return {...prev, error: "Div by Zero", displayValue: 'Error'};
            intermediateResult = toPrecision(prevNum / currentNum); 
            break;
          case '^': intermediateResult = toPrecision(Math.pow(prevNum, currentNum)); break;
        }
        newExpression = prev.expression + prev.displayValue + ` ${op} `;
        newPreviousValue = String(intermediateResult);
        return {
          ...prev,
          displayValue: String(intermediateResult),
          previousValue: String(intermediateResult),
          operator: op,
          expression: newExpression,
        };
      } else {
         newExpression = prev.displayValue + ` ${op} `;
         newPreviousValue = prev.displayValue;
      }
      
      return {
        ...prev,
        previousValue: newPreviousValue,
        operator: op,
        expression: newExpression,
        displayValue: newPreviousValue, // Show previousValue in display after operator
      };
    });
  }, [calculate]);

  const handleEquals = useCallback(() => {
    if (state.operator && state.previousValue !== null) {
      calculate();
    }
  }, [state.operator, state.previousValue, calculate]);

  const handleSignChange = useCallback(() => {
    setState(prev => {
      if (prev.error) return prev;
      const newDisplayValue = String(parseFloat(prev.displayValue) * -1);
      return { ...prev, displayValue: newDisplayValue, expression: newDisplayValue };
    });
  }, []);

  const handleBackspace = useCallback(() => {
    setState(prev => {
      if (prev.error) return prev;
      if (prev.displayValue.length === 1 || (prev.displayValue.startsWith('-') && prev.displayValue.length === 2)) {
        return { ...prev, displayValue: '0', expression: '0' };
      }
      const newDisplayValue = prev.displayValue.slice(0, -1);
      return { ...prev, displayValue: newDisplayValue, expression: newDisplayValue };
    });
  }, []);

  const handleScientificFunction = useCallback((func: string) => {
    setState(prev => {
      if (prev.error) return prev;
      let val = parseFloat(prev.displayValue);
      let result = val;
      let funcExpression = func + `(${val})`;

      const toAngle = (v: number) => prev.isRadians ? v : (v * PI / 180);
      const fromAngle = (v: number) => prev.isRadians ? v : (v * 180 / PI);

      switch (func) {
        case 'sin': result = toPrecision(Math.sin(toAngle(val))); break;
        case 'cos': result = toPrecision(Math.cos(toAngle(val))); break;
        case 'tan': result = toPrecision(Math.tan(toAngle(val))); break;
        case 'asin': result = toPrecision(fromAngle(Math.asin(val))); break;
        case 'acos': result = toPrecision(fromAngle(Math.acos(val))); break;
        case 'atan': result = toPrecision(fromAngle(Math.atan(val))); break;
        case 'ln': result = val > 0 ? toPrecision(Math.log(val)) : NaN; break;
        case 'log': result = val > 0 ? toPrecision(Math.log10(val)) : NaN; break;
        case '√': result = val >= 0 ? toPrecision(Math.sqrt(val)) : NaN; break;
        case 'x²': result = toPrecision(val * val); funcExpression = `sqr(${val})`; break;
        case 'x³': result = toPrecision(val * val * val); funcExpression = `cube(${val})`; break;
        case '1/x': result = val !== 0 ? toPrecision(1 / val) : NaN; funcExpression = `1/(${val})`; break;
        case 'π': result = PI; funcExpression = 'π'; break;
        case 'e': result = E; funcExpression = 'e'; break;
        case '!': // Factorial
          if (val < 0 || !Number.isInteger(val)) { result = NaN; }
          else {
            let fact = 1;
            for (let i = 2; i <= val; i++) fact *= i;
            result = fact > 1e+100 ? Infinity : fact; // Prevent excessively large numbers
          }
          funcExpression = `fact(${val})`;
          break;
        default: break;
      }

      if (isNaN(result) || !isFinite(result)) {
        return { ...prev, error: "Invalid Op", displayValue: 'Error', expression: prev.expression + " " + funcExpression + " = Error" };
      }

      return {
        ...prev,
        displayValue: String(result),
        expression: prev.expression + " " + funcExpression + " = " + String(result),
        previousValue: null, // Functions usually finalize current op
        operator: null,
      };
    });
  }, [state.isRadians]);

  const toggleAngleMode = useCallback(() => {
    if (isScientific) {
      setState(prev => ({ ...prev, isRadians: !prev.isRadians }));
    }
  }, [isScientific]);

  return {
    state,
    inputActions: {
      number: handleNumber,
      decimal: handleDecimal,
      operator: handleOperator,
      equals: handleEquals,
      clearAll: resetState,
      clearEntry: clearEntry,
      backspace: handleBackspace,
      signChange: handleSignChange,
      scientific: handleScientificFunction,
      toggleAngleMode: toggleAngleMode,
    }
  };
};
