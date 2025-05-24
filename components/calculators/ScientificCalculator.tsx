import React from 'react';
import CalculatorDisplay from '../CalculatorDisplay';
import CalculatorKey from '../CalculatorKey';
import { useCalculatorLogic } from '../../hooks/useCalculatorLogic';
import { BackspaceIcon, PlusMinusIcon } from '../../constants';
import { AppMode } from '../../types';
import ModeButton from '../ModeButton';

interface ScientificCalculatorProps {
  activeMode: AppMode;
  setActiveMode: (mode: AppMode) => void;
}

const ScientificCalculator: React.FC<ScientificCalculatorProps> = (props) => {
  const { state, inputActions } = useCalculatorLogic(true);

  const baseRoundKeyClasses = "aspect-square rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out transform active:scale-95";

  const numKeyClass = `${baseRoundKeyClasses} bg-neutral-700 hover:bg-neutral-600 text-gray-100 focus:ring-gray-500`;
  const opKeyClass = `${baseRoundKeyClasses} bg-orange-600 hover:bg-orange-500 text-white focus:ring-orange-400`;
  // Scientific functions (sin, cos, log, etc.) and other functions (Rad/Deg, x^y)
  const sciFuncKeyClass = `${baseRoundKeyClasses} bg-neutral-500 hover:bg-neutral-400 text-black focus:ring-gray-400`; 
  const equalsKeyClass = `${baseRoundKeyClasses} bg-orange-700 hover:bg-orange-600 text-white focus:ring-orange-500`;
  const acKeyClass = `${baseRoundKeyClasses} bg-neutral-500 hover:bg-neutral-400 text-black focus:ring-gray-400`; // AC light grey

  return (
    <div className="p-1 sm:p-2 space-y-2">
      <CalculatorDisplay value={state.displayValue} expression={state.expression} error={state.error}/>

      <nav className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2 sm:my-3 px-1">
        {(Object.values(AppMode) as AppMode[]).map((mode) => (
          <ModeButton
            key={mode}
            label={mode}
            isActive={props.activeMode === mode}
            onClick={() => props.setActiveMode(mode)}
          />
        ))}
      </nav>

      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {/* Row 1 */}
        <CalculatorKey label={state.isRadians ? 'Rad' : 'Deg'} onClick={inputActions.toggleAngleMode} className={sciFuncKeyClass} />
        <CalculatorKey label="sin" onClick={() => inputActions.scientific('sin')} className={sciFuncKeyClass} />
        <CalculatorKey label="cos" onClick={() => inputActions.scientific('cos')} className={sciFuncKeyClass} />
        <CalculatorKey label="tan" onClick={() => inputActions.scientific('tan')} className={sciFuncKeyClass} />
        <CalculatorKey label="AC" onClick={inputActions.clearAll} className={acKeyClass} />

        {/* Row 2 */}
        <CalculatorKey label="xʸ" value="^" onClick={inputActions.operator} className={sciFuncKeyClass} />
        <CalculatorKey label="asin" onClick={() => inputActions.scientific('asin')} className={sciFuncKeyClass} />
        <CalculatorKey label="acos" onClick={() => inputActions.scientific('acos')} className={sciFuncKeyClass} />
        <CalculatorKey label="atan" onClick={() => inputActions.scientific('atan')} className={sciFuncKeyClass} />
        <CalculatorKey label={<BackspaceIcon className="w-5 h-5 mx-auto"/>} value="BS" onClick={inputActions.backspace} className={sciFuncKeyClass} />

        {/* Row 3 */}
        <CalculatorKey label="ln" onClick={() => inputActions.scientific('ln')} className={sciFuncKeyClass} />
        <CalculatorKey label="7" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="8" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="9" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="÷" value="÷" onClick={inputActions.operator} className={opKeyClass} />

        {/* Row 4 */}
        <CalculatorKey label="log" onClick={() => inputActions.scientific('log')} className={sciFuncKeyClass} />
        <CalculatorKey label="4" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="5" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="6" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="×" value="×" onClick={inputActions.operator} className={opKeyClass} />

        {/* Row 5 */}
        <CalculatorKey label="√" onClick={() => inputActions.scientific('√')} className={sciFuncKeyClass} />
        <CalculatorKey label="1" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="2" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="3" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="-" value="-" onClick={inputActions.operator} className={opKeyClass} />

        {/* Row 6 */}
        <CalculatorKey label="x²" onClick={() => inputActions.scientific('x²')} className={sciFuncKeyClass} />
        <CalculatorKey label="x!" onClick={() => inputActions.scientific('!')} className={sciFuncKeyClass} />
        <CalculatorKey label="0" onClick={inputActions.number} className={numKeyClass} />
        <CalculatorKey label="." onClick={inputActions.decimal} className={numKeyClass} />
        <CalculatorKey label="+" value="+" onClick={inputActions.operator} className={opKeyClass} />
        
        {/* Row 7 */}
        <CalculatorKey label="π" onClick={() => inputActions.scientific('π')} className={sciFuncKeyClass} />
        <CalculatorKey label="e" onClick={() => inputActions.scientific('e')} className={sciFuncKeyClass} />
        <CalculatorKey label="1/x" onClick={() => inputActions.scientific('1/x')} className={sciFuncKeyClass} />
        <CalculatorKey label={<PlusMinusIcon className="w-5 h-5 mx-auto"/>} value="+/-" onClick={inputActions.signChange} className={sciFuncKeyClass} />
        <CalculatorKey label="=" onClick={inputActions.equals} className={equalsKeyClass} />
      </div>
    </div>
  );
};

export default ScientificCalculator;