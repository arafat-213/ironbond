import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { SharedStreak } from '../components/SharedStreak';
import { DuoHeatmap } from '../components/DuoHeatmap';
import { Settings, Trophy, Footprints } from 'lucide-react-native';
import axios from 'axios';

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

export const DashboardScreen = () => {
  const [status, setStatus] = useState<DuoStatus | null>(null);

  useEffect(() => {
    // Mocking the API call for now as requested in Step 4
    const fetchData = async () => {
      try {
        // const response = await axios.get('/api/duo/status');
        // setStatus(response.data);
        
        // Mock data matching the design
        setStatus({
          streakCount: 12,
          partnerName: 'Sarah',
          partnerFinished: true,
          weeklyMVP: {
            name: 'Sarah',
            stat: '+15% Volume Total',
          },
          heatmaps: {
            me: 0.4,
            partner: 0.8,
          },
          steps: {
            me: 8432,
            partner: 10214,
          },
        });
      } catch (error) {
        console.error('Error fetching duo status:', error);
      }
    };

    fetchData();
  }, []);

  if (!status) return null;

  const totalSteps = status.steps.me + status.steps.partner;
  const meStepWidth = (status.steps.me / Math.max(status.steps.me, status.steps.partner)) * 100;
  const partnerStepWidth = (status.steps.partner / Math.max(status.steps.me, status.steps.partner)) * 100;

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
            <Text style={styles.appName}>GYM BUDDY</Text>
          </View>
          <TouchableOpacity>
            <Settings color={colors.outline} size={24} />
          </TouchableOpacity>
        </View>

        {/* Streak Card */}
        <SharedStreak
          streakCount={status.streakCount}
          partnerName={status.partnerName}
          partnerFinished={status.partnerFinished}
        />

        {/* Weekly MVP */}
        <View style={styles.mvpCard}>
          <Trophy size={80} color={colors.primary.onPrimary} style={styles.mvpIcon} />
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

        {/* Step Rivalry */}
        <View style={styles.rivalryCard}>
          <Text style={styles.rivalryTitle}>Step Rivalry</Text>
          
          <View style={styles.rivalryItem}>
            <View style={styles.rivalryInfo}>
              <View style={styles.rivalryLabelGroup}>
                <Footprints size={20} color={colors.primary.container} />
                <Text style={styles.rivalryLabel}>Me</Text>
              </View>
              <Text style={styles.rivalryValue}>{status.steps.me.toLocaleString()}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${meStepWidth}%`, backgroundColor: colors.primary.container }]} />
            </View>
          </View>

          <View style={styles.rivalryItem}>
            <View style={styles.rivalryInfo}>
              <View style={styles.rivalryLabelGroup}>
                <Footprints size={20} color={colors.secondary.main} />
                <Text style={styles.rivalryLabel}>{status.partnerName}</Text>
              </View>
              <Text style={styles.rivalryValue}>{status.steps.partner.toLocaleString()}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${partnerStepWidth}%`, backgroundColor: colors.secondary.main }]} />
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
    backgroundColor: colors.surface.background,
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
    fontFamily: typography.fonts.headline,
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary.main,
    letterSpacing: 1,
  },
  mvpCard: {
    backgroundColor: colors.primary.container,
    borderRadius: 24,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  mvpIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
    opacity: 0.1,
  },
  mvpLabel: {
    fontFamily: typography.fonts.headline,
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.onPrimary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  mvpName: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes.displayXL,
    fontWeight: '800',
    color: colors.primary.onPrimary,
    lineHeight: typography.sizes.displayXL,
  },
  mvpStat: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes.headlineLarge * 0.75,
    fontWeight: '700',
    color: colors.primary.onPrimary,
  },
  rivalryCard: {
    backgroundColor: colors.surface.container,
    borderRadius: 24,
    padding: 24,
    gap: 16,
  },
  rivalryTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes.headlineLarge * 0.75,
    fontWeight: '700',
    color: colors.primary.main,
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
    fontFamily: typography.fonts.body,
    fontSize: 18,
    color: colors.primary.main,
  },
  rivalryValue: {
    fontFamily: typography.fonts.headline,
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary.main,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.surface.variant,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
