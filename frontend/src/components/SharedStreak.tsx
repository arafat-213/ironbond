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
    backgroundColor: Colors.glassSurface,
    borderColor: Colors.glassBorder,
    borderWidth: 1,
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
    fontSize: 40,
    marginRight: 16,
    textShadowColor: Colors.radiumPink,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  streakNumber: {
    ...Typography.statsNumber,
    color: Colors.radiumPink,
  },
  streakLabel: {
    ...Typography.labelBold,
    color: Colors.textDim,
  },
  statusContainer: {
    maxWidth: 160,
  },
  statusText: {
    ...Typography.bodyMd,
    color: Colors.text,
    textAlign: 'right',
  },
  boldText: {
    fontWeight: 'bold',
    color: Colors.neonPurple,
  },
});
