
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { AppMode } from './types';
import StandardCalculator from './components/calculators/StandardCalculator';
import ScientificCalculator from './components/calculators/ScientificCalculator';
import UnitConverter from './components/unit_converter/UnitConverter';
import CurrencyConverter from './components/currency_converter/CurrencyConverter';
// ModeButton is now rendered by child components

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AppMode>(AppMode.STANDARD_CALCULATOR);
  const nodeRef = useRef(null); // Create a ref for the CSSTransition

  // Memoize setActiveMode to prevent unnecessary re-renders if passed down
  const handleSetActiveMode = useCallback((mode: AppMode) => {
    setActiveMode(mode);
  }, []);

  const renderActiveMode = useCallback(() => {
    const modeProps = { activeMode, setActiveMode: handleSetActiveMode };
    switch (activeMode) {
      case AppMode.STANDARD_CALCULATOR:
        return <StandardCalculator {...modeProps} />;
      case AppMode.SCIENTIFIC_CALCULATOR:
        return <ScientificCalculator {...modeProps} />;
      case AppMode.UNIT_CONVERTER:
        return <UnitConverter {...modeProps} />;
      case AppMode.CURRENCY_CONVERTER:
        return <CurrencyConverter {...modeProps} />;
      default:
        // Default to StandardCalculator with props
        return <StandardCalculator {...modeProps} />;
    }
  }, [activeMode, handleSetActiveMode]);

  // useMemo to get the component instance for CSSTransition
  const activeModeComponent = useMemo(() => renderActiveMode(), [renderActiveMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 selection:bg-orange-500 selection:text-black">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 animate-pulse">
          FluxCalc
        </h1>
        <p className="text-gray-400 mt-2">Your premium multi-function calculator</p>
      </header>

      <div className="bg-neutral-900 shadow-2xl shadow-orange-500/20 rounded-xl p-2 sm:p-3 md:p-4 w-full max-w-md md:max-w-lg lg:max-w-xl">
        {/* Mode buttons are now rendered within each mode component */}
        
        <main className="relative overflow-hidden"> {/* Added overflow-hidden for cleaner transitions */}
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={activeMode} // Key helps react-transition-group identify element changes
              nodeRef={nodeRef} // Pass the ref to CSSTransition
              timeout={{ enter: 300, exit: 200 }}
              classNames="mode-content"
            >
              {/* This div is the DOM element that CSSTransition will animate.
                  It receives the nodeRef. */}
              <div ref={nodeRef}>{activeModeComponent}</div>
            </CSSTransition>
          </SwitchTransition>
        </main>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} FluxCalc. Crafted with React & Tailwind CSS.</p>
         <p className="mt-1">API Key for Gemini (Currency AI) should be in process.env.API_KEY.</p>
      </footer>
    </div>
  );
};

export default App;
