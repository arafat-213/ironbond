import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export default function WorkoutHistoryScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/workouts/history/f0340356-9be8-4444-972f-5322797e0344`);
      setWorkouts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.workoutType}>{item.type}</Text>
        <Text style={styles.date}>{new Date(item.timestamp).toLocaleDateString()}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.volume}>{item.volume} kg</Text>
        <Text style={styles.label}>Total Volume</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
      {loading ? (
        <ActivityIndicator color={Colors.primary as string} size="large" />
      ) : (
        <FlatList
          data={workouts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  title: { ...Typography.h1, color: Colors.text, marginBottom: 30, marginTop: 40 },
  card: {
    backgroundColor: Colors.surface,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  workoutType: { ...Typography.h3, color: Colors.text },
  date: { ...Typography.caption, color: Colors.textSecondary },
  volume: { color: Colors.primary as string, fontWeight: 'bold', fontSize: 18 },
  label: { fontSize: 10, color: Colors.textSecondary, textTransform: 'uppercase' }
});
