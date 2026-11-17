import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { StatusBarStyle } from 'expo-status-bar';

export const ThemeModes = ['light', 'neon', 'glow'] as const;
export type ThemeMode = (typeof ThemeModes)[number];

export type AppTheme = {
  background: string;
  surface: string;
  input: string;
  primary: string;
  primaryBold: string;
  primaryLight: string;
  text: string;
  textMuted: string;
  border: string;
  shadow: string;
  glow: string;
  buttonText: string;
  statusBar: StatusBarStyle;
};

const themes: Record<ThemeMode, AppTheme> = {
  light: {
    background: '#F5F6FC',
    surface: '#FFFFFF',
    input: '#F7F8FC',
    primary: '#6857F5',
    primaryBold: '#4735D4',
    primaryLight: '#EEEBFF',
    text: '#17172B',
    textMuted: '#77788D',
    border: '#E4E5EF',
    shadow: '#8C81DF',
    glow: '#B9AEFF',
    buttonText: '#FFFFFF',
    statusBar: 'dark',
  },
  neon: {
    background: '#07120F',
    surface: '#0E201A',
    input: '#0A1914',
    primary: '#57F5AD',
    primaryBold: '#1DBF7A',
    primaryLight: '#153C2D',
    text: '#E7FFF3',
    textMuted: '#91B7A5',
    border: '#214C39',
    shadow: '#33E89A',
    glow: '#74FFC0',
    buttonText: '#062015',
    statusBar: 'light',
  },
  glow: {
    background: '#100C1C',
    surface: '#1B142B',
    input: '#151022',
    primary: '#C18AFF',
    primaryBold: '#864DCE',
    primaryLight: '#34204B',
    text: '#F7EFFF',
    textMuted: '#B5A5C8',
    border: '#44315A',
    shadow: '#A66AE8',
    glow: '#D5A9FF',
    buttonText: '#FFFFFF',
    statusBar: 'light',
  },
};

type ThemeContextValue = {
  mode: ThemeMode;
  theme: AppTheme;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = PropsWithChildren<{
  initialMode?: ThemeMode;
}>;

export function ThemeProvider({ children, initialMode = 'glow' }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const value = useMemo(() => ({ mode, theme: themes[mode], setMode }), [mode, setMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
