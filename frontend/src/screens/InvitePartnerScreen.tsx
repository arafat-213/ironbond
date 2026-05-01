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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Share2, UserPlus, Settings } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const MOCK_USER_ID = 'f0340356-9be8-4444-972f-5322797e0344';

const InvitePartnerScreen = ({ navigation }: any) => {
  const [partnerCode, setPartnerCode] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleConnectPartner = async () => {
    if (!partnerCode) {
      Alert.alert('Error', 'Please enter a partner invite code');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/duo/accept`, {
        userId: MOCK_USER_ID,
        inviteCode: partnerCode,
      });
      Alert.alert('Success', 'Partner connected! Welcome to your new Duo.', [
        { text: 'Go to Dashboard', onPress: () => navigation.navigate('Dashboard') }
      ]);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to connect partner. Please check the code.';
      Alert.alert('Connection Failed', errorMessage);
    } finally {
      setLoading(false);
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
          <Settings size={24} color={Colors.textDim} />
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
              <Share2 size={20} color="#000" />
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
              placeholderTextColor={Colors.textDim}
              value={partnerCode}
              onChangeText={setPartnerCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity 
              style={styles.connectButton} 
              onPress={handleConnectPartner}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.electricLime} />
              ) : (
                <>
                  <UserPlus size={20} color={Colors.electricLime} />
                  <Text style={styles.connectButtonText}>CONNECT PARTNER</Text>
                </>
              )}
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
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  profilePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.glassSurface,
    borderColor: Colors.glassBorder,
    borderWidth: 1,
  },
  brandTitle: {
    ...Typography.headlineMd,
    color: Colors.electricLime,
    letterSpacing: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    ...Typography.headlineLg,
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    ...Typography.bodyMd,
    color: Colors.textDim,
    textAlign: 'center',
    maxWidth: 280,
  },
  glassCard: {
    backgroundColor: Colors.glassSurface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    marginBottom: 24,
  },
  cardLabel: {
    ...Typography.labelBold,
    color: Colors.textDim,
    marginBottom: 20,
  },
  inviteCode: {
    ...Typography.displayXl,
    color: Colors.electricLime,
    letterSpacing: 8,
    marginBottom: 32,
    fontSize: 40,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: Colors.electricLime,
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: Colors.electricLime,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  shareButtonText: {
    color: '#000',
    ...Typography.labelBold,
    fontSize: 16,
  },
  separatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.glassBorder,
  },
  separatorText: {
    ...Typography.labelBold,
    color: Colors.textDim,
    opacity: 0.5,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: 12,
    padding: 16,
    color: Colors.text,
    ...Typography.headlineMd,
    textAlign: 'center',
    marginBottom: 20,
  },
  connectButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  connectButtonText: {
    color: Colors.text,
    ...Typography.labelBold,
    fontSize: 16,
  },
});

export default InvitePartnerScreen;
