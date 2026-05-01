import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface SharedStreakProps {
  streakCount: number;
  partnerName: string;
  partnerFinished: boolean;
}

export const SharedStreak: React.FC<SharedStreakProps> = ({
  streakCount,
  partnerName,
  partnerFinished,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.streakInfo}>
        <Text style={styles.emoji}>🔥</Text>
        <View>
          <Text style={styles.streakNumber}># {streakCount}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          <Text style={styles.boldText}>{partnerName}</Text>{' '}
          {partnerFinished ? 'finished their workout!' : 'is working out!'} Your turn.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface.container,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
    marginRight: 16,
  },
  streakNumber: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes.statsNumber,
    fontWeight: typography.weights.statsNumber as any,
    color: colors.primary.container,
    lineHeight: typography.sizes.statsNumber,
  },
  streakLabel: {
    fontFamily: typography.fonts.body,
    fontSize: 14,
    color: colors.outline, // Using outline as on-surface-variant equivalent
  },
  statusContainer: {
    maxWidth: 140,
  },
  statusText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.bodyMedium,
    color: colors.primary.main,
    textAlign: 'right',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
