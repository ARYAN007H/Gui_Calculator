
import React from 'react';

interface ModeButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const ModeButton: React.FC<ModeButtonProps> = ({ label, isActive, onClick }) => {
  const baseClasses = "w-full py-2 px-1 sm:px-2 text-xs sm:text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105";
  const activeClasses = "bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg focus:ring-orange-400";
  const inactiveClasses = "bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white focus:ring-gray-600";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </button>
  );
};

export default ModeButton;