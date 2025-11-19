import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemedButton = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button 
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Désactiver le mode sombre' : 'Activer le mode sombre'}
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemedButton;