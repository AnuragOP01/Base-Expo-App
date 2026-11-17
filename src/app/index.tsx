import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeModes, useTheme } from '@/theme/ThemeContext';
import type { ThemeMode } from '@/theme/ThemeContext';

const modeLabels: Record<ThemeMode, string> = {
  light: 'Light',
  neon: 'Neon',
  glow: 'Glow',
};

export default function LoginScreen() {
  const { mode, setMode, theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSignIn = () => {
    if (!email.trim() || !password) {
      setFeedback('Enter an email and password to try the demo.');
      return;
    }

    setFeedback('Demo login only — connect this button to your authentication service.');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View
              style={[
                styles.brandCard,
                { shadowColor: theme.glow },
              ]}>
              <Image
                source={require('@/assets/branding/logo.png')}
                style={styles.logo}
                resizeMode="contain"
                accessibilityLabel="StarterLogo"
              />
            </View>

            <View
              style={[
                styles.themePicker,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}>
              {ThemeModes.map((themeMode) => {
                const selected = mode === themeMode;

                return (
                  <Pressable
                    key={themeMode}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => setMode(themeMode)}
                    style={[
                      styles.themeOption,
                      selected && {
                        backgroundColor: theme.primaryLight,
                        borderColor: theme.primary,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.themeOptionText,
                        { color: selected ? theme.primary : theme.textMuted },
                      ]}>
                      {modeLabels[themeMode]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.intro}>
              <Text style={[styles.eyebrow, { color: theme.primary }]}>SECURE ACCESS</Text>
              <Text style={[styles.title, { color: theme.text }]}>Welcome back</Text>
              <Text style={[styles.subtitle, { color: theme.textMuted }]}>
                Sign in to continue to your account.
              </Text>
            </View>

            <View
              style={[
                styles.formCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  shadowColor: theme.shadow,
                },
              ]}>
              <Text style={[styles.label, { color: theme.text }]}>Email address</Text>
              <TextInput
                accessibilityLabel="Email address"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                onChangeText={(value) => {
                  setEmail(value);
                  setFeedback('');
                }}
                placeholder="you@example.com"
                placeholderTextColor={theme.textMuted}
                returnKeyType="next"
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.input,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                textContentType="emailAddress"
                value={email}
              />

              <View style={styles.passwordLabelRow}>
                <Text style={[styles.label, { color: theme.text }]}>Password</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                  onPress={() => setPasswordVisible((visible) => !visible)}
                  hitSlop={8}>
                  <Text style={[styles.showPassword, { color: theme.primary }]}>
                    {passwordVisible ? 'Hide' : 'Show'}
                  </Text>
                </Pressable>
              </View>
              <TextInput
                accessibilityLabel="Password"
                autoCapitalize="none"
                autoComplete="current-password"
                onChangeText={(value) => {
                  setPassword(value);
                  setFeedback('');
                }}
                onSubmitEditing={handleSignIn}
                placeholder="Enter your password"
                placeholderTextColor={theme.textMuted}
                returnKeyType="done"
                secureTextEntry={!passwordVisible}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.input,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                textContentType="password"
                value={password}
              />

              <Pressable
                accessibilityRole="button"
                onPress={handleSignIn}
                style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}>
                <LinearGradient
                  colors={[theme.primary, theme.primaryBold]}
                  end={{ x: 1, y: 0 }}
                  start={{ x: 0, y: 0 }}
                  style={styles.submitGradient}>
                  <Text style={[styles.submitText, { color: theme.buttonText }]}>Sign in</Text>
                </LinearGradient>
              </Pressable>

              {feedback ? (
                <Text
                  accessibilityLiveRegion="polite"
                  style={[styles.feedback, { color: theme.primary }]}>
                  {feedback}
                </Text>
              ) : null}
            </View>

            <Text style={[styles.footer, { color: theme.textMuted }]}>
              Starter login screen · ready to connect to your auth API
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 460,
  },
  brandCard: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 204,
    height: 72,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  themePicker: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
    marginBottom: 34,
    padding: 5,
    borderWidth: 1,
    borderRadius: 18,
  },
  themeOption: {
    minWidth: 74,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  themeOptionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  intro: {
    alignItems: 'center',
    marginBottom: 26,
  },
  eyebrow: {
    marginBottom: 10,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    marginTop: 9,
    fontSize: 15,
    textAlign: 'center',
  },
  formCard: {
    borderWidth: 1,
    borderRadius: 26,
    padding: 22,
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  label: {
    marginBottom: 9,
    fontSize: 13,
    fontWeight: '700',
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  showPassword: {
    marginBottom: 9,
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  submitButton: {
    overflow: 'hidden',
    marginTop: 24,
    borderRadius: 16,
  },
  submitGradient: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.82,
  },
  feedback: {
    marginTop: 16,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  footer: {
    marginTop: 22,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});
