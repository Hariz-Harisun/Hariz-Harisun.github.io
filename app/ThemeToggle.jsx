'use client';

import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const THEME_KEY = 'portfolio-theme';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    const light = storedTheme === 'light';
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    // The stored preference is external state read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLight(light);
  }, []);

  function toggleTheme() {
    const nextIsLight = !isLight;
    document.documentElement.dataset.theme = nextIsLight ? 'light' : 'dark';
    window.localStorage.setItem(THEME_KEY, nextIsLight ? 'light' : 'dark');
    setIsLight(nextIsLight);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      aria-pressed={isLight}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {isLight ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
      <span>{isLight ? 'Dark' : 'Light'}</span>
    </button>
  );
}
