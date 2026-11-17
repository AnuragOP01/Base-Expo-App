import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SplashVideoOverlay } from '@/components/SplashVideoOverlay';
import { ThemeProvider, useTheme } from '@/theme/ThemeContext';

void SplashScreen.preventAutoHideAsync();

function AppNavigator() {
  const { theme } = useTheme();
  const [splashFinished, setSplashFinished] = useState(false);
  const finishSplash = useCallback(() => setSplashFinished(true), []);

  useEffect(() => {
    SplashScreen.setOptions({ duration: 350, fade: true });
  }, []);

  return (
    <>
      <StatusBar style={theme.statusBar} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}>
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
      </Stack>
      {!splashFinished && <SplashVideoOverlay onFinished={finishSplash} />}
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
