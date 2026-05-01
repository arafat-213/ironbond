import { TextStyle } from 'react-native';

export const Typography: Record<string, TextStyle> = {
  displayXl: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 48,
    lineHeight: 48 * 1.1,
    letterSpacing: 48 * -0.02,
  },
  headlineLg: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 32,
    lineHeight: 32 * 1.2,
    letterSpacing: 32 * -0.01,
  },
  headlineMd: {
    fontFamily: 'Lexend_700Bold',
    fontSize: 24,
    lineHeight: 24 * 1.2,
  },
  bodyLg: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    lineHeight: 18 * 1.6,
  },
  bodyMd: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  labelBold: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 14,
    lineHeight: 14 * 1.2,
    letterSpacing: 14 * 0.05,
    textTransform: 'uppercase',
  },
  statsNumber: {
    fontFamily: 'Lexend_800ExtraBold',
    fontSize: 40,
    lineHeight: 40,
  },
  
  // Compatibility mappings
  h1: { fontFamily: 'Lexend_800ExtraBold', fontSize: 32 },
  h2: { fontFamily: 'Lexend_700Bold', fontSize: 24 },
  h3: { fontFamily: 'Lexend_700Bold', fontSize: 18 },
  body: { fontFamily: 'Inter_400Regular', fontSize: 16 },
  caption: { fontFamily: 'Lexend_600SemiBold', fontSize: 12 },
};
