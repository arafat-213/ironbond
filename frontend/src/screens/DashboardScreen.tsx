import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { SharedStreak } from '../components/SharedStreak';
import { DuoHeatmap } from '../components/DuoHeatmap';
import { Settings, Trophy, Footprints } from 'lucide-react-native';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const MOCK_USER_ID = 'f0340356-9be8-4444-972f-5322797e0344';

interface DuoStatus {
  streakCount: number;
  partnerName: string;
  partnerFinished: boolean;
  weeklyMVP: {
    name: string;
    stat: string;
  };
  heatmaps: {
    me: number;
    partner: number;
  };
  steps: {
    me: number;
    partner: number;
  };
}

export default function DashboardScreen() {
  const [status, setStatus] = useState<DuoStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/duo/status/${MOCK_USER_ID}`);
        setStatus(response.data);
      } catch (error) {
        console.error('Error fetching duo status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.electricLime} />
        </View>
      </SafeAreaView>
    );
  }

  if (!status) return null;

  const meStepWidth = (status.steps.me / Math.max(status.steps.me, status.steps.partner, 1)) * 100;
  const partnerStepWidth = (status.steps.partner / Math.max(status.steps.me, status.steps.partner, 1)) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKpg17O-t9XpkWT7Y5CqqXKBI2MT7ushLUJD5cF4Z26cFM9bxjXpHkw_h9R4ilyB43y8tuFVzUKEqlnV7F8z1tos0sawsjDZaWdp8ejvldNK_jPhH0Wt4V_fCzF1HhYAD1kdqE-4oUxCGcXdnL2mJKN8EddLhRbNP5atnCsbzNUjFe6Dj-siNWgG2CjQzmgygCfAjTYApIB-SO4_TNcfTci63fVC-EnWEzoWA-_AqzBfskwTR3ec11qtviPqphSZUq4FpO-MBIf7E' }}
              style={styles.profileImage}
            />
            <Text style={styles.appName}>IRONBOND</Text>
          </View>
          <TouchableOpacity>
            <Settings color={Colors.textDim} size={24} />
          </TouchableOpacity>
        </View>

        {/* Streak Card */}
        <SharedStreak
          streakCount={status.streakCount}
          partnerName={status.partnerName}
          partnerFinished={status.partnerFinished}
        />

        {/* Weekly MVP - Glassmorphic */}
        <View style={styles.mvpCard}>
          <Trophy size={80} color={Colors.electricLime} style={styles.mvpIcon} />
          <Text style={styles.mvpLabel}>WEEKLY MVP</Text>
          <Text style={styles.mvpName}>{status.weeklyMVP.name}</Text>
          <Text style={styles.mvpStat}>{status.weeklyMVP.stat}</Text>
        </View>

        {/* Heatmap */}
        <DuoHeatmap
          meHeatScore={status.heatmaps.me}
          partnerHeatScore={status.heatmaps.partner}
          partnerName={status.partnerName}
        />

        {/* Step Rivalry - Glassmorphic */}
        <View style={styles.rivalryCard}>
          <Text style={styles.rivalryTitle}>Step Rivalry</Text>
          
          <View style={styles.rivalryItem}>
            <View style={styles.rivalryInfo}>
              <View style={styles.rivalryLabelGroup}>
                <Footprints size={20} color={Colors.electricLime} />
                <Text style={styles.rivalryLabel}>Me</Text>
              </View>
              <Text style={styles.rivalryValue}>{status.steps.me.toLocaleString()}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${meStepWidth}%`, backgroundColor: Colors.electricLime }]} />
            </View>
          </View>

          <View style={styles.rivalryItem}>
            <View style={styles.rivalryInfo}>
              <View style={styles.rivalryLabelGroup}>
                <Footprints size={20} color={Colors.neonPurple} />
                <Text style={styles.rivalryLabel}>{status.partnerName}</Text>
              </View>
              <Text style={styles.rivalryValue}>{status.steps.partner.toLocaleString()}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${partnerStepWidth}%`, backgroundColor: Colors.neonPurple }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  appName: {
    ...Typography.headlineMd,
    color: Colors.electricLime,
    letterSpacing: 2,
  },
  mvpCard: {
    backgroundColor: Colors.glassSurface,
    borderColor: Colors.glassBorder,
    borderWidth: 1,
    borderRadius: 24,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  mvpIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
    opacity: 0.15,
  },
  mvpLabel: {
    ...Typography.labelBold,
    color: Colors.textDim,
    marginBottom: 4,
  },
  mvpName: {
    ...Typography.statsNumber,
    color: Colors.electricLime,
    marginVertical: 4,
  },
  mvpStat: {
    ...Typography.bodyLg,
    color: Colors.text,
    fontWeight: '700',
  },
  rivalryCard: {
    backgroundColor: Colors.glassSurface,
    borderColor: Colors.glassBorder,
    borderWidth: 1,
    borderRadius: 24,
    padding: 24,
    gap: 16,
  },
  rivalryTitle: {
    ...Typography.headlineMd,
    color: Colors.text,
  },
  rivalryItem: {
    gap: 8,
  },
  rivalryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rivalryLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rivalryLabel: {
    ...Typography.bodyMd,
    color: Colors.textDim,
  },
  rivalryValue: {
    ...Typography.headlineMd,
    color: Colors.text,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
