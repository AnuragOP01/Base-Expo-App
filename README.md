# Starter Appp Base

A reusable Expo Router starter with a branded video splash, a demo login screen, and light, neon, and glow themes.

## Run

```bash
npm install
npx expo start
```

The app opens with the splash video and then displays `src/app/index.tsx`. The login is UI-only; connect its submit handler to your authentication service.

## Theme

Use `useTheme()` from `src/theme/ThemeContext.tsx` to read the current `mode` and `theme` colors, or call `setMode('light' | 'neon' | 'glow')`.

## Native development

Native dependencies are installed for the development build. Expo Go can run the starter while native-only modules are not imported or used. Rebuild the development client when adding or changing native modules or native app configuration.
