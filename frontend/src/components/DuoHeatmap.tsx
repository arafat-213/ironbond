import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

interface DuoHeatmapProps {
  meHeatScore: number; // 0 to 1
  partnerHeatScore: number; // 0 to 1
  partnerName: string;
}

const Silhouette = ({ color }: { color: string }) => (
  <Svg height="80" width="40" viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M12,2C10.9,2,10,2.9,10,4s0.9,2,2,2s2-0.9,2-2S13.1,2,12,2z M12,7c-2.7,0-5,2.2-5,5v6c0,0.6,0.4,1,1,1h1v4c0,0.6,0.4,1,1,1s1-0.4,1-1v-4h2v4c0,0.6,0.4,1,1,1s1-0.4,1-1v-4h1c0.6,0,1-0.4,1-1v-6C17,9.2,14.7,7,12,7z"
    />
  </Svg>
);

const getHeatColor = (score: number) => {
  // Interpolate between surface-container-highest (#353437) and Intensity Red (#ff0000)
  // For simplicity, if score > 0.8 use red, else use a dimmed version
  if (score === 0) return Colors.surface;
  
  // Basic interpolation logic (just a simple approximation)
  const r = Math.floor(53 + (255 - 53) * score);
  const g = Math.floor(52 + (0 - 52) * score);
  const b = Math.floor(55 + (0 - 55) * score);
  return `rgb(${r}, ${g}, ${b})`;
};

export const DuoHeatmap: React.FC<DuoHeatmapProps> = ({
  meHeatScore,
  partnerHeatScore,
  partnerName,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Strain Heatmap</Text>
        <Text style={styles.subtitle}>Last 7 Days</Text>
      </View>
      <View style={styles.heatmapsRow}>
        <View style={styles.heatmapItem}>
          <Text style={styles.label}>Me</Text>
          <View style={styles.silhouetteContainer}>
            <Silhouette color={getHeatColor(meHeatScore)} />
          </View>
        </View>
        <View style={styles.heatmapItem}>
          <Text style={styles.label}>{partnerName}</Text>
          <View style={[styles.silhouetteContainer, { backgroundColor: partnerHeatScore > 0.5 ? Colors.secondary : Colors.surface }]}>
             <Silhouette color={getHeatColor(partnerHeatScore)} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: Typography.h3.fontSize,
    fontWeight: Typography.h3.fontWeight,
    color: Colors.primary,
  },
  subtitle: {
    fontSize: Typography.caption.fontSize,
    color: Colors.outline,
  },
  heatmapsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  heatmapItem: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  silhouetteContainer: {
    height: 96,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
