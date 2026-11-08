import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const ThemeContext = createContext(null);

const SCALE_MAP = {
  default: '1',
  large: '1.08',
  xl: '1.16'
};

function readStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ?? fallback;
  } catch {
    return fallback;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = readStorage('earl-theme', 'light');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [textSize, setTextSizeState] = useState(() => {
    const saved = readStorage('earl-text-size', 'default');
    return SCALE_MAP[saved] ? saved : 'default';
  });

  const [reduceMotion, setReduceMotionState] = useState(() => {
    return readStorage('earl-reduce-motion', 'false') === 'true';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const bar = document.querySelector('meta[name="theme-color"]');
    if (bar) {
      bar.setAttribute('content', theme === 'dark' ? '#070B14' : '#F4F4ED');
    }
    try {
      localStorage.setItem('earl-theme', theme);
    } catch {
      // Ignore storage errors in private browsing.
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', SCALE_MAP[textSize] || '1');
    try {
      localStorage.setItem('earl-text-size', textSize);
    } catch {
      // Ignore storage errors.
    }
  }, [textSize]);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.dataset.motion = 'reduced';
    } else {
      delete document.documentElement.dataset.motion;
    }
    try {
      localStorage.setItem('earl-reduce-motion', String(reduceMotion));
    } catch {
      // Ignore storage errors.
    }
  }, [reduceMotion]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next === 'dark' ? 'dark' : 'light');
  }, []);

  const setTextSize = useCallback((next) => {
    if (SCALE_MAP[next]) setTextSizeState(next);
  }, []);

  const setReduceMotion = useCallback((next) => {
    setReduceMotionState(Boolean(next));
  }, []);

  const resetPrefs = useCallback(() => {
    setThemeState('light');
    setTextSizeState('default');
    setReduceMotionState(false);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      textSize,
      setTextSize,
      reduceMotion,
      setReduceMotion,
      resetPrefs
    }),
    [theme, setTheme, toggleTheme, textSize, setTextSize, reduceMotion, setReduceMotion, resetPrefs]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
