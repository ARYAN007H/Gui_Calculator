import React from 'react';
import CalculatorDisplay from '../CalculatorDisplay';
import CalculatorKey from '../CalculatorKey';
import { useCalculatorLogic } from '../../hooks/useCalculatorLogic';
import { BackspaceIcon, PlusMinusIcon } from '../../constants';
import { AppMode } from '../../types';
import ModeButton from '../ModeButton';

interface StandardCalculatorProps {
  activeMode: AppMode;
  setActiveMode: (mode: AppMode) => void;
}

const StandardCalculator: React.FC<StandardCalculatorProps> = (props) => {
  const { state, inputActions } = useCalculatorLogic();

  const baseRoundKeyClasses = "aspect-square rounded-full w-16 h-16 sm:w-[70px] sm:h-[70px] md:w-[76px] md:h-[76px] flex items-center justify-center text-xl sm:text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out transform active:scale-95";

  const numKeyClass = `${baseRoundKeyClasses} bg-neutral-700 hover:bg-neutral-600 text-gray-100 focus:ring-gray-500`;
  const opKeyClass = `${baseRoundKeyClasses} bg-orange-600 hover:bg-orange-500 text-white focus:ring-orange-400`;
  const funcKeyClass = `${baseRoundKeyClasses} bg-neutral-500 hover:bg-neutral-400 text-black focus:ring-gray-400`; // For AC, +/-, %, BS
  const equalsKeyClass = `${baseRoundKeyClasses} bg-orange-700 hover:bg-orange-600 text-white focus:ring-orange-500`;
  
  // AC key color changed to grey for iOS like theme, instead of red.
  const acKeyClass = funcKeyClass; 

  return (
    <div className="p-2 space-y-3">
      <CalculatorDisplay value={state.displayValue} expression={state.expression} error={state.error}/>
      
      <nav className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 sm:my-4 px-1">
        {(Object.values(AppMode) as AppMode[]).map((mode) => (
          <ModeButton
            key={mode}
            label={mode}
            isActive={props.activeMode === mode}
            onClick={() => props.setActiveMode(mode)}
          />
        ))}
      </nav>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <CalculatorKey label="AC" onClick={inputActions.clearAll} className={acKeyClass} />
        <CalculatorKey label={<PlusMinusIcon className="w-6 h-6 sm:w-7 sm:h-7"/>} value="+/-" onClick={inputActions.signChange} className={funcKeyClass} />
        <CalculatorKey label="%" value="%" onClick={() => inputActions.operator('%')} className={funcKeyClass} />
        <CalculatorKey label="÷" value="÷" onClick={inputActions.operator} className={opKeyClass} />

        <CalculatorKey label="7" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="8" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="9" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="×" value="×" onClick={inputActions.operator} className={opKeyClass} />

        <CalculatorKey label="4" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="5" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="6" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="-" value="-" onClick={inputActions.operator} className={opKeyClass} />

        <CalculatorKey label="1" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="2" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="3" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="+" value="+" onClick={inputActions.operator} className={opKeyClass} />
        
        <CalculatorKey label={<BackspaceIcon className="w-6 h-6 sm:w-7 sm:h-7"/>} value="BS" onClick={inputActions.backspace} className={funcKeyClass} />
        <CalculatorKey label="0" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="." onClick={inputActions.decimal} className={numKeyClass} />
        <CalculatorKey label="=" onClick={inputActions.equals} className={equalsKeyClass} />
      </div>
    </div>
  );
};

export default StandardCalculator;