
import React from 'react';

interface CalculatorKeyProps {
  onClick: (value: string) => void;
  label: string | React.ReactNode;
  value?: string;
  className?: string;
  span?: number; // For grid span
}

const CalculatorKey: React.FC<CalculatorKeyProps> = ({ onClick, label, value, className = '', span = 1 }) => {
  const baseStyles = "rounded-lg text-xl sm:text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out transform active:scale-95";
  
  const handleClick = () => {
    onClick(value !== undefined ? value : (typeof label === 'string' ? label : ''));
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${className} ${span === 2 ? 'col-span-2' : ''}`}
      aria-label={typeof label === 'string' ? label : value}
    >
      {label}
    </button>
  );
};

export default CalculatorKey;
