import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

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
    backgroundColor: Colors.surface,
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
    fontSize: Typography.h1.fontSize,
    fontWeight: Typography.h1.fontWeight,
    color: Colors.primary,
    lineHeight: Typography.h1.fontSize,
  },
  streakLabel: {
    fontSize: 14,
    color: Colors.outline, // Using outline as on-surface-variant equivalent
  },
  statusContainer: {
    maxWidth: 140,
  },
  statusText: {
    fontSize: Typography.body.fontSize,
    color: Colors.primary,
    textAlign: 'right',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
