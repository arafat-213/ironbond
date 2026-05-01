import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop' }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.4 }}
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
                <Text style={styles.featureText}>Shared Streaks</Text>
              </View>
              <View style={styles.glassPanel}>
                <Text style={styles.featureText}>Weekly MVP</Text>
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
    backgroundColor: 'rgba(19, 19, 21, 0.7)',
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
    fontSize: Typography.h1.fontSize,
    fontWeight: Typography.h1.fontWeight,
    color: Colors.primary,
    fontStyle: 'italic',
    textShadowColor: 'rgba(195, 244, 0, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.8,
    maxWidth: 280,
  },
  features: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  glassPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureText: {
    color: Colors.primary,
    fontSize: Typography.body.fontSize,
    fontWeight: '600',
  },
  actions: {
    width: '100%',
    gap: 16,
    paddingBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  primaryButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.outline,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  skipText: {
    color: Colors.primary,
    opacity: 0.6,
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;
