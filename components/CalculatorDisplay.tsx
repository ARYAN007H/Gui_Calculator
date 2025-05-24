
import React from 'react';

interface CalculatorDisplayProps {
  value: string;
  expression?: string;
  error?: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value, expression, error }) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-4 mb-4 shadow-inner min-h-[100px] flex flex-col justify-end text-right overflow-hidden">
      {expression && (
        <div className="text-gray-500 text-sm h-6 truncate" title={expression}>
          {expression}
        </div>
      )}
      {error ? (
        <div className="text-red-500 text-3xl font-bold break-all" title={error}>
          {error.length > 15 ? 'Error' : error}
        </div>
      ) : (
        <div 
          className="text-orange-400 text-4xl sm:text-5xl font-bold break-all" 
          title={value}
          style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }} // Ensure long numbers wrap
        >
          {value.length > 20 ? parseFloat(value).toExponential(5) : value}
        </div>
      )}
    </div>
  );
};

export default CalculatorDisplay;