import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Share,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Share2, UserPlus, Settings } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const InvitePartnerScreen = ({ navigation }: any) => {
  const [partnerCode, setPartnerCode] = useState('');
  const myInviteCode = 'X7B9K2';

  const onShare = async () => {
    try {
      await Share.share({
        message: `Join me on IronBond! My invite code is: ${myInviteCode}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profilePlaceholder} />
        <Text style={styles.brandTitle}>IRONBOND</Text>
        <TouchableOpacity>
          <Settings size={24} color={Colors.primary} opacity={0.5} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Team Up</Text>
            <Text style={styles.subtitle}>
              Connect with your partner to start competing and tracking stats together.
            </Text>
          </View>

          {/* Invite Code Card */}
          <View style={styles.glassCard}>
            <Text style={styles.cardLabel}>YOUR INVITE CODE</Text>
            <Text style={styles.inviteCode}>{myInviteCode}</Text>
            <TouchableOpacity style={styles.shareButton} onPress={onShare}>
              <Share2 size={20} color={Colors.background} />
              <Text style={styles.shareButtonText}>SHARE CODE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separatorSection}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* Enter Code Card */}
          <View style={styles.glassCard}>
            <Text style={styles.cardLabel}>ENTER PARTNER'S CODE</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. A1B2C3"
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              value={partnerCode}
              onChangeText={setPartnerCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.connectButton}>
              <UserPlus size={20} color={Colors.primary} />
              <Text style={styles.connectButtonText}>CONNECT PARTNER</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  profilePlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.primary,
    fontStyle: 'italic',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: Typography.h1.fontSize,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    color: Colors.primary,
    textAlign: 'center',
    opacity: 0.6,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardLabel: {
    fontSize: 12,
    color: Colors.primary,
    opacity: 0.5,
    letterSpacing: 2,
    marginBottom: 16,
  },
  inviteCode: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 8,
    marginBottom: 24,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  separatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  separatorText: {
    color: Colors.primary,
    opacity: 0.3,
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: Colors.primary,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  connectButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  connectButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});

export default InvitePartnerScreen;
