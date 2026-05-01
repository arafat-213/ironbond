import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { StatusBar } from 'expo-status-bar';

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop' }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={styles.title}>IRONBOND</Text>
              <Text style={styles.subtitle}>
                Dominate the iron together. Built for couples who compete to grow.
              </Text>
            </View>

            <View style={styles.features}>
              <View style={styles.glassPanel}>
                <Text style={styles.featureTitle}>Shared Streaks</Text>
                <Text style={styles.featureDesc}>Sync your grind and keep the flame alive.</Text>
              </View>
              <View style={styles.glassPanel}>
                <Text style={styles.featureTitle}>Competitive Heatmaps</Text>
                <Text style={styles.featureDesc}>Visualize strain and out-train your partner.</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => navigation.navigate('InvitePartner')}
              >
                <Text style={styles.primaryButtonText}>Create Duo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.navigate('InvitePartner')}
              >
                <Text style={styles.secondaryButtonText}>Join Duo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.skipButton}>
                <Text style={styles.skipText}>I'm flying solo (Skip)</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(19, 19, 21, 0.75)',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    ...Typography.displayXl,
    color: Colors.electricLime,
    textShadowColor: 'rgba(204, 255, 0, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    ...Typography.bodyLg,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.9,
    maxWidth: 300,
  },
  features: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  glassPanel: {
    backgroundColor: Colors.glassSurface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  featureTitle: {
    ...Typography.headlineMd,
    color: Colors.electricLime,
    marginBottom: 4,
  },
  featureDesc: {
    ...Typography.bodyMd,
    color: Colors.textDim,
  },
  actions: {
    width: '100%',
    gap: 16,
    paddingBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.electricLime,
    shadowColor: Colors.electricLime,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#000',
    ...Typography.labelBold,
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  secondaryButtonText: {
    color: Colors.text,
    ...Typography.labelBold,
    fontSize: 16,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  skipText: {
    ...Typography.bodyMd,
    color: Colors.textDim,
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;
